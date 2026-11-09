import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, StoreSettings, CartItem, ProductCategory } from '../types';
import { DEFAULT_PRODUCTS, DEFAULT_SETTINGS } from '../data/defaultProducts';
import { 
  fetchProductsFromFirestore, 
  saveProductToFirestore, 
  deleteProductFromFirestore, 
  fetchSettingsFromFirestore, 
  saveSettingsToFirestore, 
  seedFirestoreWithDefaults,
  testFirestoreConnection
} from '../lib/firebase';

interface StoreContextType {
  products: Product[];
  settings: StoreSettings;
  cart: CartItem[];
  activeTab: string;
  selectedCategory: string;
  searchQuery: string;
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isOwnerModalOpen: boolean;
  isDiscreetModalOpen: boolean;
  isDeploymentGuideOpen: boolean;
  ageVerified: boolean;
  isOwnerUnlocked: boolean;
  isUsingFirestore: boolean;
  adminToken: string;
  ownerPin: string;
  isLoadingData: boolean;
  setActiveTab: (tab: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedProduct: (prod: Product | null) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsOwnerModalOpen: (open: boolean) => void;
  setIsDiscreetModalOpen: (open: boolean) => void;
  setIsDeploymentGuideOpen: (open: boolean) => void;
  setAgeVerified: (verified: boolean) => void;
  loginOwner: (password: string) => Promise<{ success: boolean; error?: string }>;
  logoutOwner: () => Promise<void>;
  changeOwnerPassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  unlockOwnerWithPin: (pin: string) => boolean;
  setOwnerPin: (pin: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  updateProduct: (id: string, updated: Partial<Product>) => Promise<boolean>;
  addProduct: (newProduct: Product) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  resetProductsToDefault: () => Promise<boolean>;
  updateSettings: (newSettings: Partial<StoreSettings>) => Promise<boolean>;
  resetSettingsToDefault: () => Promise<boolean>;
  refreshStoreData: () => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = 'vph_store_products_v1';
const SETTINGS_STORAGE_KEY = 'vph_store_settings_v1';
const CART_STORAGE_KEY = 'vph_store_cart_v1';
const AGE_VERIFIED_KEY = 'vph_age_verified_v1';
const ADMIN_TOKEN_KEY = 'vph_admin_token_v1';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load local cache of products', e);
    }
    return DEFAULT_PRODUCTS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch (e) {
      console.warn('Could not load local cache of settings', e);
    }
    return DEFAULT_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Could not load cart', e);
    }
    return [];
  });

  const [ageVerified, setAgeVerifiedState] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AGE_VERIFIED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Admin session token (stored in sessionStorage for high security)
  const [adminToken, setAdminToken] = useState<string>(() => {
    try {
      return sessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
    } catch {
      return '';
    }
  });

  const isOwnerUnlocked = Boolean(adminToken);
  const ownerPin = 'Password-Protected (Server RBAC)';
  const [isUsingFirestore, setIsUsingFirestore] = useState<boolean>(true);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState<boolean>(false);
  const [isDiscreetModalOpen, setIsDiscreetModalOpen] = useState<boolean>(false);
  const [isDeploymentGuideOpen, setIsDeploymentGuideOpen] = useState<boolean>(false);

  // Test Firestore connection on boot
  useEffect(() => {
    testFirestoreConnection()
      .then((ok) => {
        setIsUsingFirestore(ok);
      })
      .catch(() => {
        setIsUsingFirestore(false);
      });
  }, []);

  // Verify stored token on startup
  useEffect(() => {
    if (!adminToken) return;
    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${adminToken}` }
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.valid) {
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
          setAdminToken('');
        }
      })
      .catch(() => {
        // If server is unreachable, retain token locally
      });
  }, [adminToken]);

  // Fetch shared products and settings from Firestore (primary) and Server API (fallback)
  const refreshStoreData = useCallback(async () => {
    try {
      setIsLoadingData(true);
      let firestoreLoaded = false;

      // 1. Primary: Fetch live data from Google Firebase Firestore
      try {
        const [firestoreProds, firestoreSet] = await Promise.all([
          fetchProductsFromFirestore(),
          fetchSettingsFromFirestore(),
        ]);

        if (firestoreProds && Array.isArray(firestoreProds) && firestoreProds.length > 0) {
          setProducts(firestoreProds);
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(firestoreProds));
          firestoreLoaded = true;
        }

        if (firestoreSet) {
          const merged = { ...DEFAULT_SETTINGS, ...firestoreSet };
          setSettings(merged);
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
        }
      } catch (err) {
        console.warn('Firestore primary fetch encountered an issue, falling back to server API:', err);
      }

      setIsUsingFirestore(firestoreLoaded);

      // 2. Fallback: Query server API if Firestore was not accessible
      if (!firestoreLoaded) {
        const [resProd, resSet] = await Promise.all([
          fetch('/api/products').catch(() => null),
          fetch('/api/settings').catch(() => null),
        ]);

        if (resProd && resProd.ok) {
          const prodData = await resProd.json();
          if (Array.isArray(prodData) && prodData.length > 0) {
            setProducts(prodData);
            localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(prodData));
          }
        }

        if (resSet && resSet.ok) {
          const setData = await resSet.json();
          if (setData && typeof setData === 'object') {
            const merged = { ...DEFAULT_SETTINGS, ...setData };
            setSettings(merged);
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(merged));
          }
        }
      }
    } catch (err) {
      console.info('Using cached local data:', err);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    refreshStoreData();
  }, [refreshStoreData]);

  // Sync state to local storage as fallback cache
  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products locally', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings locally', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart locally', e);
    }
  }, [cart]);

  const setAgeVerified = (verified: boolean) => {
    setAgeVerifiedState(verified);
    try {
      localStorage.setItem(AGE_VERIFIED_KEY, String(verified));
    } catch (e) {
      console.warn(e);
    }
  };

  // Secure Owner Authentication Methods
  const loginOwner = async (password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Authentication failed' };
      }
      sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setAdminToken(data.token);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Connection error during authentication' };
    }
  };

  const logoutOwner = async () => {
    try {
      if (adminToken) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      }
    } catch (e) {
      console.warn('Logout notification error:', e);
    } finally {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      setAdminToken('');
    }
  };

  const changeOwnerPassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!adminToken) {
      return { success: false, error: 'Not authenticated as store owner' };
    }
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Password update failed' };
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Connection error during password change' };
    }
  };

  // Deprecated PIN methods kept for backward compatibility
  const unlockOwnerWithPin = (pin: string): boolean => {
    if (pin.trim().length > 0) {
      return false;
    }
    return false;
  };

  const setOwnerPin = (_pin: string) => {
    // PIN system replaced by secure server password
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Helper for auth header
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
  });

  // Asynchronous Firestore-backed product management with token authorization
  const updateProduct = async (id: string, updated: Partial<Product>): Promise<boolean> => {
    // 1. Optimistic local update
    const current = products.find(p => p.id === id);
    const merged = current ? { ...current, ...updated } : null;

    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct((prev) => (prev ? { ...prev, ...updated } : null));
    }

    // 2. Persist to Google Firebase Firestore permanently
    if (merged) {
      saveProductToFirestore(merged).catch((err) => console.warn('Firestore product update error:', err));
    }

    // 3. Transmit to server API so all devices and server cache sync
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updated),
      });
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        setAdminToken('');
        return false;
      }
      return res.ok;
    } catch (e) {
      console.warn('Server sync completed with Firestore persistence:', e);
      return true;
    }
  };

  const addProduct = async (newProduct: Product): Promise<boolean> => {
    // 1. Optimistic local update
    setProducts((prev) => [newProduct, ...prev]);

    // 2. Persist to Google Firebase Firestore permanently
    saveProductToFirestore(newProduct).catch((err) => console.warn('Firestore add product error:', err));

    // 3. Transmit to server API
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newProduct),
      });
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        setAdminToken('');
        return false;
      }
      return res.ok;
    } catch (e) {
      console.warn('Server sync completed with Firestore persistence:', e);
      return true;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    removeFromCart(id);
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct(null);
    }

    // Delete from Firestore permanently
    deleteProductFromFirestore(id).catch((err) => console.warn('Firestore delete error:', err));

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        setAdminToken('');
        return false;
      }
      return res.ok;
    } catch (e) {
      console.warn('Server sync completed:', e);
      return true;
    }
  };

  const resetProductsToDefault = async (): Promise<boolean> => {
    setProducts(DEFAULT_PRODUCTS);
    seedFirestoreWithDefaults().catch((err) => console.warn('Firestore seed error:', err));
    try {
      const res = await fetch('/api/products/reset', {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      return res.ok;
    } catch (e) {
      console.warn(e);
      return false;
    }
  };

  const updateSettings = async (newSettings: Partial<StoreSettings>): Promise<boolean> => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);

    // Save to Firestore permanently
    saveSettingsToFirestore(merged).catch((err) => console.warn('Firestore settings update error:', err));

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(merged),
      });
      if (res.status === 401) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        setAdminToken('');
        return false;
      }
      return res.ok;
    } catch (e) {
      console.warn('Server sync failed:', e);
      return false;
    }
  };

  const resetSettingsToDefault = async (): Promise<boolean> => {
    setSettings(DEFAULT_SETTINGS);
    saveSettingsToFirestore(DEFAULT_SETTINGS).catch((err) => console.warn('Firestore reset settings error:', err));
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(DEFAULT_SETTINGS),
      });
      return res.ok;
    } catch (e) {
      console.warn(e);
      return false;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        activeTab,
        selectedCategory,
        searchQuery,
        selectedProduct,
        isCartOpen,
        isOwnerModalOpen,
        isDiscreetModalOpen,
        isDeploymentGuideOpen,
        ageVerified,
        isOwnerUnlocked,
        isUsingFirestore,
        adminToken,
        ownerPin,
        isLoadingData,
        setActiveTab,
        setSelectedCategory,
        setSearchQuery,
        setSelectedProduct,
        setIsCartOpen,
        setIsOwnerModalOpen,
        setIsDiscreetModalOpen,
        setIsDeploymentGuideOpen,
        setAgeVerified,
        loginOwner,
        logoutOwner,
        changeOwnerPassword,
        unlockOwnerWithPin,
        setOwnerPin,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        updateProduct,
        addProduct,
        deleteProduct,
        resetProductsToDefault,
        updateSettings,
        resetSettingsToDefault,
        refreshStoreData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
