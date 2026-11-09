import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from './src/data/defaultProducts.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = isProd ? (Number(process.env.PORT) || 8080) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory active admin sessions: token -> expiration timestamp
  const activeSessions = new Map<string, number>();

  // Master password hash (default is set to 'VelvetOwner#2026!', can be changed by owner or via ADMIN_PASSWORD env var)
  let currentPasswordHash = crypto
    .createHash('sha256')
    .update(process.env.ADMIN_PASSWORD || 'VelvetOwner#2026!')
    .digest('hex');

  // Helper: verify admin session token
  function requireAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token || !activeSessions.has(token)) {
      return res.status(401).json({ 
        error: 'Unauthorized: Valid Store Owner authentication token required.' 
      });
    }

    const expiresAt = activeSessions.get(token)!;
    if (Date.now() > expiresAt) {
      activeSessions.delete(token);
      return res.status(401).json({ 
        error: 'Unauthorized: Session expired. Please log in again.' 
      });
    }

    // Refresh session on activity (extends for 4 hours)
    activeSessions.set(token, Date.now() + 4 * 60 * 60 * 1000);
    next();
  }

  // Data storage file path (server-side ephemeral file on Cloud Run)
  const DATA_DIR = path.resolve(__dirname, 'data');
  const DATA_FILE = path.resolve(DATA_DIR, 'store_data.json');

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  // Initialize data if not present
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      products: DEFAULT_PRODUCTS,
      settings: DEFAULT_SETTINGS,
      lastUpdated: new Date().toISOString(),
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }

  function getStoreData() {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      return { products: DEFAULT_PRODUCTS, settings: DEFAULT_SETTINGS };
    }
  }

  function saveStoreData(data: any) {
    try {
      fs.writeFileSync(
        DATA_FILE,
        JSON.stringify({ ...data, lastUpdated: new Date().toISOString() }, null, 2),
        'utf-8'
      );
    } catch (err) {
      console.error('Failed to write store data:', err);
    }
  }

  // ==========================================
  // AUTHENTICATION API ROUTES
  // ==========================================

  // Owner login endpoint
  app.post('/api/auth/login', (req, res) => {
    const { password } = req.body;
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password is required' });
    }

    const hashedInput = crypto.createHash('sha256').update(password).digest('hex');
    if (hashedInput !== currentPasswordHash) {
      return res.status(401).json({ error: 'Invalid Store Owner password' });
    }

    // Generate secure random session token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 4 * 60 * 60 * 1000; // 4 hours validity
    activeSessions.set(token, expiresAt);

    return res.json({ 
      success: true, 
      token, 
      expiresIn: 14400 
    });
  });

  // Verify active token validity
  app.get('/api/auth/verify', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (token && activeSessions.has(token) && Date.now() <= activeSessions.get(token)!) {
      return res.json({ valid: true });
    }
    return res.json({ valid: false });
  });

  // Change owner password endpoint
  app.post('/api/auth/change-password', requireAdminAuth, (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long.' });
    }

    const hashedCurrent = crypto.createHash('sha256').update(currentPassword).digest('hex');
    if (hashedCurrent !== currentPasswordHash) {
      return res.status(401).json({ error: 'Current password does not match.' });
    }

    currentPasswordHash = crypto.createHash('sha256').update(newPassword).digest('hex');
    return res.json({ success: true, message: 'Owner password successfully updated.' });
  });

  // Owner logout endpoint
  app.post('/api/auth/logout', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (token) {
      activeSessions.delete(token);
    }
    return res.json({ success: true });
  });

  // ==========================================
  // PUBLIC STOREFRONT ROUTES (READ-ONLY)
  // ==========================================

  // Anyone can view products
  app.get('/api/products', (_req, res) => {
    const data = getStoreData();
    res.json(data.products || DEFAULT_PRODUCTS);
  });

  // Anyone can view store settings
  app.get('/api/settings', (_req, res) => {
    const data = getStoreData();
    res.json(data.settings || DEFAULT_SETTINGS);
  });

  // ==========================================
  // SECURED OWNER MUTATION ROUTES (AUTHENTICATION MANDATORY)
  // ==========================================

  // Add product (Owner only)
  app.post('/api/products', requireAdminAuth, (req, res) => {
    const newProduct = req.body;
    const data = getStoreData();
    const products = [newProduct, ...(data.products || [])];
    saveStoreData({ ...data, products });
    res.json({ success: true, product: newProduct });
  });

  // Update product (Owner only)
  app.put('/api/products/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const updatedFields = req.body;
    const data = getStoreData();
    const products = (data.products || []).map((p: any) =>
      p.id === id ? { ...p, ...updatedFields } : p
    );
    saveStoreData({ ...data, products });
    res.json({ success: true, id });
  });

  // Delete product (Owner only)
  app.delete('/api/products/:id', requireAdminAuth, (req, res) => {
    const { id } = req.params;
    const data = getStoreData();
    const products = (data.products || []).filter((p: any) => p.id !== id);
    saveStoreData({ ...data, products });
    res.json({ success: true, id });
  });

  // Reset products (Owner only)
  app.post('/api/products/reset', requireAdminAuth, (_req, res) => {
    const data = getStoreData();
    saveStoreData({ ...data, products: DEFAULT_PRODUCTS });
    res.json({ success: true, products: DEFAULT_PRODUCTS });
  });

  // Update store settings (Owner only)
  app.put('/api/settings', requireAdminAuth, (req, res) => {
    const newSettings = req.body;
    const data = getStoreData();
    const settings = { ...(data.settings || DEFAULT_SETTINGS), ...newSettings };
    saveStoreData({ ...data, settings });
    res.json({ success: true, settings });
  });

  // ==========================================
  // SPA SERVING
  // ==========================================
  if (!isProd) {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true'
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Velvet Pleasure House server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
