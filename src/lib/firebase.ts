import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  deleteDoc, 
  writeBatch,
  query,
  orderBy,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import type { Product, StoreSettings } from '../types/index.ts';
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from '../data/defaultProducts.ts';

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID if configured
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection verification test as specified in Firebase integration guidelines
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    const testDoc = doc(db, 'test', 'connection');
    await getDocFromServer(testDoc);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline:', error.message);
      return false;
    }
    // Document might not exist yet, which is normal and still means server is reachable
    return true;
  }
}

// Fetch all products from Firestore
export async function fetchProductsFromFirestore(): Promise<Product[]> {
  try {
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);
    
    if (snapshot.empty) {
      console.info('Firestore products collection empty. Seeding defaults...');
      return await seedFirestoreWithDefaults();
    }

    const items: Product[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: data.id || docSnap.id,
        name: data.name || '',
        category: data.category || 'toys',
        price: Number(data.price) || 0,
        shortDescription: data.shortDescription || '',
        description: data.description || '',
        images: Array.isArray(data.images) && data.images.length > 0 
          ? data.images 
          : ['https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=900&q=80'],
        inStock: data.inStock ?? true,
        isFeatured: Boolean(data.isFeatured),
        materials: data.materials || 'Body-Safe Materials',
        safetyAndCare: data.safetyAndCare || 'Clean thoroughly with warm water and mild antibacterial cleanser.',
        specifications: data.specifications || {},
        badge: data.badge || '',
        isDemonstration: Boolean(data.isDemonstration)
      });
    });

    return items;
  } catch (err) {
    console.error('Error fetching products from Firestore:', err);
    throw err;
  }
}

// Save single product to Firestore
export async function saveProductToFirestore(product: Product): Promise<void> {
  const docRef = doc(db, 'products', product.id);
  await setDoc(docRef, {
    ...product,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

// Delete product from Firestore
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const docRef = doc(db, 'products', productId);
  await deleteDoc(docRef);
}

// Fetch store settings from Firestore
export async function fetchSettingsFromFirestore(): Promise<StoreSettings | null> {
  try {
    const docRef = doc(db, 'settings', 'general');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as StoreSettings;
    }
    // Seed initial settings if missing
    await saveSettingsToFirestore(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  } catch (err) {
    console.error('Error fetching settings from Firestore:', err);
    return null;
  }
}

// Save store settings to Firestore
export async function saveSettingsToFirestore(settings: StoreSettings): Promise<void> {
  const docRef = doc(db, 'settings', 'general');
  await setDoc(docRef, {
    ...settings,
    updatedAt: new Date().toISOString()
  }, { merge: true });
}

// Seed default products into Firestore
export async function seedFirestoreWithDefaults(): Promise<Product[]> {
  try {
    const batch = writeBatch(db);
    for (const prod of DEFAULT_PRODUCTS) {
      const docRef = doc(db, 'products', prod.id);
      batch.set(docRef, {
        ...prod,
        updatedAt: new Date().toISOString()
      });
    }
    await batch.commit();
    console.info(`Successfully seeded ${DEFAULT_PRODUCTS.length} products to Firestore.`);
    return DEFAULT_PRODUCTS;
  } catch (err) {
    console.error('Failed to seed default products into Firestore:', err);
    return DEFAULT_PRODUCTS;
  }
}
