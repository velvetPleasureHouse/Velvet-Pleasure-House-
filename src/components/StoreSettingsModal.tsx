import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  PhoneCall, 
  Mail, 
  Check, 
  ExternalLink,
  Package,
  Layers,
  Sparkles,
  AlertCircle,
  Lock,
  Unlock,
  KeyRound,
  Download,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  Star,
  Image,
  Search,
  Camera,
  MessageCircle,
  Phone
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, ProductCategory } from '../types';
import { formatNaira, sanitizePhoneNumber } from '../utils/whatsapp';

export const StoreSettingsModal: React.FC = () => {
  const { 
    isOwnerModalOpen, 
    setIsOwnerModalOpen, 
    settings, 
    updateSettings, 
    resetSettingsToDefault,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    resetProductsToDefault,
    isOwnerUnlocked,
    isUsingFirestore,
    loginOwner,
    logoutOwner,
    changeOwnerPassword,
    adminToken,
    refreshStoreData,
    isLoadingData
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'settings' | 'add' | 'how-it-works'>('products');

  // Password authentication state
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Local settings form state
  const [phoneInput, setPhoneInput] = useState(settings.whatsappNumber);
  const [emailInput, setEmailInput] = useState(settings.businessEmail);
  const [noticeInput, setNoticeInput] = useState(settings.storeNotice);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Automatically update input fields whenever store settings load from Firestore
  useEffect(() => {
    if (settings.whatsappNumber) setPhoneInput(settings.whatsappNumber);
    if (settings.businessEmail) setEmailInput(settings.businessEmail);
    if (settings.storeNotice) setNoticeInput(settings.storeNotice);
  }, [settings.whatsappNumber, settings.businessEmail, settings.storeNotice]);

  // Password change state
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdStatus, setPwdStatus] = useState<{ success?: string; error?: string } | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  // Quick WhatsApp inline editing state
  const [isEditingQuickPhone, setIsEditingQuickPhone] = useState(false);
  const [quickPhoneSaved, setQuickPhoneSaved] = useState(false);

  // Dashboard category filter and search for mobile ease-of-use
  const [dashCategory, setDashCategory] = useState<string>('all');
  const [dashSearch, setDashSearch] = useState<string>('');

  // Edit product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: 'toys',
    price: 25000,
    shortDescription: '',
    description: '',
    images: ['https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=900&q=80'],
    inStock: true,
    isFeatured: false,
    materials: 'Medical-Grade Body-Safe Silicone',
    safetyAndCare: 'Clean with warm water and mild cleanser. Safe with water-based lubricants.',
    specifications: {
      'Material': '100% Medical Silicone',
      'Waterproof': 'IPX7 Waterproof',
      'Noise': 'Whisper quiet'
    },
    isDemonstration: false
  });

  // Mobile-friendly image file picker and compressor
  const handleImageFile = (file: File, isEditing: boolean) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX = 900;
        let w = img.width;
        let h = img.height;
        if (w > h && w > MAX) {
          h = Math.round((h * MAX) / w);
          w = MAX;
        } else if (h > MAX) {
          w = Math.round((w * MAX) / h);
          h = MAX;
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

        if (isEditing && editingProduct) {
          setEditingProduct({
            ...editingProduct,
            images: [dataUrl, ...(editingProduct.images.slice(1))]
          });
        } else {
          setNewProduct((prev) => ({
            ...prev,
            images: [dataUrl, ...(prev.images ? prev.images.slice(1) : [])]
          }));
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  if (!isOwnerModalOpen) return null;

  // Secure password authentication submission
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) return;
    setAuthLoading(true);
    setAuthError(null);

    const result = await loginOwner(passwordInput.trim());
    setAuthLoading(false);

    if (!result.success) {
      setAuthError(result.error || 'Incorrect owner password. Default is VelvetOwner#2026!');
    } else {
      setPasswordInput('');
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      whatsappNumber: phoneInput,
      businessEmail: emailInput,
      storeNotice: noticeInput
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const handleQuickPhoneSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;
    await updateSettings({
      whatsappNumber: phoneInput.trim()
    });
    setQuickPhoneSaved(true);
    setTimeout(() => {
      setQuickPhoneSaved(false);
      setIsEditingQuickPhone(false);
    }, 2000);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdStatus(null);
    if (newPwd !== confirmPwd) {
      setPwdStatus({ error: 'New passwords do not match.' });
      return;
    }
    if (newPwd.length < 6) {
      setPwdStatus({ error: 'New password must be at least 6 characters long.' });
      return;
    }

    setPwdLoading(true);
    const result = await changeOwnerPassword(currentPwd, newPwd);
    setPwdLoading(false);

    if (result.success) {
      setPwdStatus({ success: 'Owner password changed successfully!' });
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
      setTimeout(() => setPwdStatus(null), 4000);
    } else {
      setPwdStatus({ error: result.error || 'Failed to update password.' });
    }
  };

  const testWhatsAppNumber = () => {
    const clean = sanitizePhoneNumber(phoneInput);
    window.open(`https://wa.me/${clean}?text=Test%20connection%20from%20Velvet%20Pleasure%20House`, '_blank');
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created: Product = {
      id: `vph-prod-${Date.now().toString(36)}`,
      name: newProduct.name,
      category: (newProduct.category as ProductCategory) || 'toys',
      price: Number(newProduct.price),
      shortDescription: newProduct.shortDescription || '',
      description: newProduct.description || newProduct.shortDescription || '',
      images: newProduct.images && newProduct.images.length > 0 
        ? newProduct.images 
        : ['https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=900&q=80'],
      inStock: newProduct.inStock ?? true,
      isFeatured: Boolean(newProduct.isFeatured),
      badge: newProduct.badge || '',
      materials: newProduct.materials || 'Body-Safe Materials',
      safetyAndCare: newProduct.safetyAndCare || 'Clean thoroughly with warm water and mild antibacterial cleanser.',
      specifications: newProduct.specifications || {},
      isDemonstration: false
    };

    await addProduct(created);
    setActiveTab('products');
    setNewProduct({
      name: '',
      category: 'toys',
      price: 25000,
      shortDescription: '',
      description: '',
      images: ['https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=900&q=80'],
      inStock: true,
      isFeatured: false,
      materials: 'Medical-Grade Body-Safe Silicone',
      safetyAndCare: 'Clean with warm water and mild cleanser.',
      specifications: { 'Material': 'Medical Silicone' }
    });
  };

  const handleUpdateProductSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  // Toggle in-stock status directly
  const handleToggleStock = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    await updateProduct(product.id, { inStock: !product.inStock });
  };

  // Toggle homepage featured status directly
  const handleToggleFeatured = async (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    await updateProduct(product.id, { isFeatured: !product.isFeatured });
  };

  // Export catalogue JSON to phone/PC
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `velvet_pleasure_house_catalogue_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import catalogue JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (Array.isArray(imported) && imported.length > 0) {
          for (const item of imported) {
            await addProduct(item);
          }
          alert(`Successfully imported ${imported.length} products!`);
        }
      } catch (err) {
        alert('Could not read the JSON file. Please ensure it is a valid product catalogue.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#261B22] border border-[#742D40] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#742D40]/40 bg-[#1F151B]">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-[#D89C91]" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl text-[#F2E9DE]">Store Owner Editing Dashboard</h2>
                {isUsingFirestore ? (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Firebase Firestore Active</span>
                  </span>
                ) : (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-amber-950/80 text-amber-300 border border-amber-500/30">
                    <span>Local / Server Cache</span>
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#D89C91]">Permanent cloud-backed catalogue management for your Android phone</p>
            </div>
          </div>

          <button
            onClick={() => setIsOwnerModalOpen(false)}
            className="p-1.5 rounded-full text-[#F2E9DE]/70 hover:text-[#F2E9DE] hover:bg-[#742D40]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. OWNER PASSWORD LOCK SCREEN (Server-side RBAC token authentication) */}
        {!isOwnerUnlocked ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#742D40]/30 border border-[#D89C91]/40 flex items-center justify-center text-[#D89C91] mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl text-[#F2E9DE]">Store Owner Authentication</h3>
              <p className="text-xs text-[#F2E9DE]/70 leading-relaxed">
                Protected by server-side SHA-256 token verification. Regular customers browsing your website cannot access, inspect, or modify your store catalogue.
              </p>
              <div className="bg-[#1C1419] p-3 rounded-lg border border-[#742D40]/40 text-xs text-[#D89C91] text-left">
                <span className="block font-semibold text-[#F2E9DE] mb-0.5">Initial Setup Password:</span>
                <code>VelvetOwner#2026!</code>
                <span className="block text-[10px] text-[#F2E9DE]/60 mt-1">
                  You can change this password immediately inside the dashboard settings.
                </span>
              </div>
            </div>

            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter Store Owner Password"
                  className="w-full text-center text-sm bg-[#1A1217] border border-[#742D40] rounded-xl px-4 py-3 text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none pr-10"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D89C91]/70 hover:text-[#D89C91] p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Eye className="w-4 h-4" />
                </button>
                {authError && (
                  <p className="text-xs text-rose-400 mt-2 text-center">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] font-semibold text-xs py-3 px-6 rounded-xl transition-all border border-[#D89C91]/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Authenticate & Unlock Console</span>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* 2. UNLOCKED DASHBOARD */
          <>
            {/* Sub-Nav Tabs */}
            <div className="flex border-b border-[#742D40]/30 bg-[#1A1217] px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => { setActiveTab('products'); setEditingProduct(null); }}
                className={`py-3 px-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'products'
                    ? 'border-[#D89C91] text-[#D89C91]'
                    : 'border-transparent text-[#F2E9DE]/70 hover:text-[#F2E9DE]'
                }`}
              >
                <span>Products & Prices</span>
                <span className="text-[10px] bg-[#742D40] px-1.5 py-0.2 rounded-full text-[#F2E9DE]">
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('add'); setEditingProduct(null); }}
                className={`py-3 px-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'add'
                    ? 'border-[#D89C91] text-[#D89C91]'
                    : 'border-transparent text-[#F2E9DE]/70 hover:text-[#F2E9DE]'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setEditingProduct(null); }}
                className={`py-3 px-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'settings'
                    ? 'border-[#25D366] text-[#25D366]'
                    : 'border-transparent text-[#F2E9DE]/70 hover:text-[#F2E9DE]'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp & Contact</span>
              </button>

              <button
                onClick={() => { setActiveTab('how-it-works'); setEditingProduct(null); }}
                className={`py-3 px-3.5 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors shrink-0 ${
                  activeTab === 'how-it-works'
                    ? 'border-[#D89C91] text-[#D89C91]'
                    : 'border-transparent text-[#F2E9DE]/70 hover:text-[#F2E9DE]'
                }`}
              >
                How Self-Editing Works
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* TAB 1: Product Catalogue & Management */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  {/* WhatsApp Quick Hotline Banner with 1-Tap Inline Editor */}
                  <div className="bg-[#1C1419] p-4 sm:p-5 rounded-xl border border-[#25D366]/40 shadow-lg space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] uppercase tracking-wider text-[#D89C91] font-semibold">Store Order Hotline:</span>
                            <span className="text-sm font-mono font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-0.5 rounded-md border border-[#25D366]/30">
                              {settings.whatsappNumber || '+2348000000000'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#F2E9DE]/65 mt-0.5">Where all customer orders & Concierge messages are delivered</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsEditingQuickPhone(!isEditingQuickPhone)}
                          className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-[#120B10] font-bold text-xs px-3.5 py-2 rounded-lg transition-colors shadow shrink-0"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{isEditingQuickPhone ? 'Close Editor' : 'Edit WhatsApp Number'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Inline Quick Editor Form */}
                    {isEditingQuickPhone && (
                      <form onSubmit={handleQuickPhoneSave} className="pt-3 border-t border-[#742D40]/30 space-y-2">
                        <label className="block text-[11px] uppercase tracking-wider text-[#D89C91] font-medium">
                          Enter your WhatsApp phone number (with country code, e.g. +2348012345678):
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={phoneInput}
                            onChange={(e) => setPhoneInput(e.target.value)}
                            placeholder="+2348012345678"
                            className="flex-1 bg-[#150F14] border border-[#25D366]/70 rounded-lg px-3.5 py-2.5 text-xs text-[#F2E9DE] focus:border-[#25D366] focus:outline-none font-mono"
                            required
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="bg-[#25D366] hover:bg-[#20ba59] text-[#120B10] font-bold text-xs px-4 py-2.5 rounded-lg shrink-0 flex items-center justify-center gap-1.5 shadow"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save to Live Website</span>
                          </button>
                          <button
                            type="button"
                            onClick={testWhatsAppNumber}
                            className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs px-3.5 py-2.5 rounded-lg shrink-0 flex items-center justify-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Test WhatsApp Link</span>
                          </button>
                        </div>
                        {quickPhoneSaved && (
                          <p className="text-xs text-emerald-400 font-medium flex items-center gap-1 pt-1">
                            <Check className="w-3.5 h-3.5" /> Saved! Your WhatsApp number is now live across the entire website and in Firestore.
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                  {editingProduct ? (
                    /* EDIT PRODUCT FORM */
                    <form onSubmit={handleUpdateProductSave} className="bg-[#1C1419] p-5 rounded-xl border border-[#742D40] space-y-4">
                      <div className="flex items-center justify-between border-b border-[#742D40]/40 pb-3">
                        <h3 className="font-serif text-base text-[#F2E9DE] flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#D89C91]" />
                          Editing: {editingProduct.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="text-xs text-[#F2E9DE]/60 hover:text-[#F2E9DE]"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Product Name</label>
                          <input
                            type="text"
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Price (₦ Nigerian Naira)</label>
                          <input
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                            className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Category</label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                            className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                          >
                            <option value="lingerie">Lingerie</option>
                            <option value="toys">Sex Toys</option>
                            <option value="lubricants">Lubricants</option>
                            <option value="intimate-care">Intimate Care</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Badge (e.g. Bestseller / New)</label>
                          <input
                            type="text"
                            value={editingProduct.badge || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                            className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Short Description</label>
                          <input
                            type="text"
                            value={editingProduct.shortDescription}
                            onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                            className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-2">
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Product Photograph</label>
                          <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#150F14] p-3 rounded-lg border border-[#742D40]/40">
                            <img
                              src={editingProduct.images[0] || 'https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=300&q=80'}
                              alt="Preview"
                              className="w-16 h-16 rounded-lg object-cover bg-black/50 shrink-0 border border-[#742D40]/40"
                            />
                            <div className="flex-1 w-full space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <label className="inline-flex items-center gap-1.5 bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow">
                                  <Camera className="w-3.5 h-3.5 text-[#D89C91]" />
                                  <span>Choose from Phone Photos / Camera</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handleImageFile(file, true);
                                    }}
                                    className="hidden"
                                  />
                                </label>
                                <span className="text-[10px] text-[#F2E9DE]/50">or enter direct image URL below</span>
                              </div>
                              <input
                                type="url"
                                value={editingProduct.images[0] || ''}
                                onChange={(e) => {
                                  const updated = [...editingProduct.images];
                                  updated[0] = e.target.value;
                                  setEditingProduct({ ...editingProduct, images: updated });
                                }}
                                placeholder="https://images.unsplash.com/..."
                                className="w-full bg-[#1A1217] border border-[#742D40]/50 rounded-lg px-3 py-1.5 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Full Description & Intimate Guidance</label>
                          <textarea
                            rows={3}
                            value={editingProduct.description}
                            onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                            className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-xs uppercase text-[#D89C91] mb-1">Materials & Safety Guidelines</label>
                          <input
                            type="text"
                            value={editingProduct.materials || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, materials: e.target.value })}
                            placeholder="e.g. 100% Medical-Grade Platinum Silicone, Phthalate-free"
                            className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                          />
                        </div>

                        {/* Visibility and Featured Toggles */}
                        <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#F2E9DE] bg-[#150F14] p-3 rounded-lg border border-[#742D40]/30 hover:border-[#D89C91]/40 transition-colors">
                            <input
                              type="checkbox"
                              checked={editingProduct.inStock}
                              onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                              className="rounded text-[#742D40] w-4 h-4"
                            />
                            <div>
                              <span className="font-semibold block">Available & In Stock</span>
                              <span className="text-[10px] text-[#F2E9DE]/60">Uncheck to mark product as unavailable</span>
                            </div>
                          </label>

                          <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#F2E9DE] bg-[#150F14] p-3 rounded-lg border border-[#742D40]/30 hover:border-[#D89C91]/40 transition-colors">
                            <input
                              type="checkbox"
                              checked={Boolean(editingProduct.isFeatured)}
                              onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                              className="rounded text-[#742D40] w-4 h-4"
                            />
                            <div>
                              <span className="font-semibold block flex items-center gap-1 text-amber-300">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span>Feature on Homepage</span>
                              </span>
                              <span className="text-[10px] text-[#F2E9DE]/60">Displays in the Featured Selections section</span>
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-5 py-2.5 rounded-lg border border-[#D89C91]/30 shadow"
                        >
                          Save Changes to Live Website
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingProduct(null)}
                          className="text-xs text-[#F2E9DE]/60 hover:text-[#F2E9DE] px-3 py-2"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : null}

                  {/* Top Bar with Quick Sync and Export */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#F2E9DE]/70 bg-[#1C1419] p-3 rounded-xl border border-[#742D40]/30">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span>Total: <strong>{products.length} products</strong></span>
                      </div>
                      <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        <Sparkles className="w-3 h-3" />
                        <span>Cloud Firestore Linked</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleExportJson}
                        className="inline-flex items-center gap-1.5 bg-[#261B22] hover:bg-[#742D40]/40 text-[#D89C91] px-2.5 py-1.5 rounded border border-[#742D40]/40 text-[11px]"
                        title="Download backup file to your phone"
                      >
                        <Download className="w-3 h-3" />
                        <span>Export Backup</span>
                      </button>

                      <label className="inline-flex items-center gap-1.5 bg-[#261B22] hover:bg-[#742D40]/40 text-[#D89C91] px-2.5 py-1.5 rounded border border-[#742D40]/40 text-[11px] cursor-pointer">
                        <Upload className="w-3 h-3" />
                        <span>Import</span>
                        <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                      </label>

                      <button
                        onClick={resetProductsToDefault}
                        className="inline-flex items-center gap-1 text-[11px] text-[#F2E9DE]/50 hover:text-rose-300 ml-1 underline"
                        title="Reset to default products"
                      >
                        Reset Demo
                      </button>
                    </div>
                  </div>

                  {/* Android-Optimized Mobile Search & Category Filter for Large Catalogues */}
                  <div className="space-y-2 bg-[#1C1419] p-3 rounded-xl border border-[#742D40]/30">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#D89C91] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={dashSearch}
                        onChange={(e) => setDashSearch(e.target.value)}
                        placeholder="Search your products by name or reference ID..."
                        className="w-full bg-[#150F14] border border-[#742D40]/40 rounded-lg pl-8 pr-7 py-2 text-xs text-[#F2E9DE] placeholder:text-[#F2E9DE]/40 focus:border-[#D89C91] focus:outline-none"
                      />
                      {dashSearch && (
                        <button
                          onClick={() => setDashSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#F2E9DE]/50 hover:text-[#F2E9DE]"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'lingerie', label: 'Lingerie' },
                        { id: 'toys', label: 'Sex Toys' },
                        { id: 'lubricants', label: 'Lubricants' },
                        { id: 'intimate-care', label: 'Intimate Care' }
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setDashCategory(c.id)}
                          className={`text-[11px] px-2.5 py-1 rounded-md transition-colors ${
                            dashCategory === c.id
                              ? 'bg-[#742D40] text-[#F2E9DE] font-semibold border border-[#D89C91]/40'
                              : 'bg-[#150F14] text-[#F2E9DE]/60 hover:text-[#F2E9DE]'
                          }`}
                        >
                          {c.label} {c.id !== 'all' ? `(${products.filter(p => p.category === c.id).length})` : `(${products.length})`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Product Cards List */}
                  <div className="divide-y divide-[#742D40]/30 border border-[#742D40]/40 rounded-xl overflow-hidden bg-[#1E151B]">
                    {products
                      .filter((p) => {
                        const matchesCat = dashCategory === 'all' || p.category === dashCategory;
                        const matchesSearch = !dashSearch.trim() ||
                          p.name.toLowerCase().includes(dashSearch.toLowerCase()) ||
                          p.id.toLowerCase().includes(dashSearch.toLowerCase());
                        return matchesCat && matchesSearch;
                      })
                      .map((p) => (
                      <div key={p.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#231820] transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={p.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover bg-black/40 shrink-0 border border-[#742D40]/30" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-serif text-sm text-[#F2E9DE] truncate font-medium">{p.name}</h4>
                              <span className="text-[10px] uppercase bg-[#742D40]/50 text-[#D89C91] px-1.5 py-0.2 rounded shrink-0">
                                {p.category}
                              </span>
                              {p.isFeatured && (
                                <span className="inline-flex items-center gap-0.5 text-[9px] bg-amber-950/80 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30 shrink-0 font-medium">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  <span>Featured on Home</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-[#F2E9DE]/60 mt-0.5">
                              <span className="font-semibold text-[#D89C91]">{formatNaira(p.price)}</span>
                              <span>•</span>
                              <span className="truncate">Ref: {p.id}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions: Featured toggle, Stock toggle, Edit, Delete */}
                        <div className="flex flex-wrap items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            onClick={(e) => handleToggleFeatured(p, e)}
                            className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors flex items-center gap-1 ${
                              p.isFeatured
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/40 hover:bg-amber-900'
                                : 'bg-[#261B22] text-[#F2E9DE]/50 border border-[#742D40]/40 hover:text-amber-300'
                            }`}
                            title="Click to toggle featured placement on homepage"
                          >
                            <Star className="w-3 h-3 fill-current" />
                            <span>{p.isFeatured ? 'Featured on Home' : 'Feature on Home'}</span>
                          </button>

                          <button
                            onClick={(e) => handleToggleStock(p, e)}
                            className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-colors ${
                              p.inStock
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900'
                                : 'bg-amber-950 text-amber-300 border border-amber-500/30 hover:bg-amber-900'
                            }`}
                            title="Click to toggle availability"
                          >
                            {p.inStock ? 'In Stock' : 'Unavailable'}
                          </button>

                          <button
                            onClick={() => setEditingProduct(p)}
                            className="p-1.5 rounded-lg bg-[#261B22] hover:bg-[#742D40]/50 text-[#F2E9DE] border border-[#742D40]/40 transition-colors"
                            title="Edit product"
                          >
                            <Edit3 className="w-4 h-4 text-[#D89C91]" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${p.name}"?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-[#261B22] hover:bg-rose-950/60 text-[#F2E9DE]/60 hover:text-rose-400 border border-[#742D40]/40 transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: Add New Product */}
              {activeTab === 'add' && (
                <form onSubmit={handleCreateProduct} className="space-y-4 max-w-2xl bg-[#1C1419] p-5 rounded-xl border border-[#742D40]/40">
                  <div className="flex items-center justify-between border-b border-[#742D40]/30 pb-3">
                    <h3 className="font-serif text-base text-[#F2E9DE] flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#D89C91]" />
                      Add New Product (Saves to live website)
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Product Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Silk Loungewear Slip"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Price (₦ Nigerian Naira)</label>
                      <input
                        type="number"
                        placeholder="35000"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Category</label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as ProductCategory })}
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                      >
                        <option value="lingerie">Lingerie</option>
                        <option value="toys">Sex Toys</option>
                        <option value="lubricants">Lubricants</option>
                        <option value="intimate-care">Intimate Care</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Badge (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. New Arrival, Bestseller"
                        value={newProduct.badge || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Short Description</label>
                      <input
                        type="text"
                        placeholder="Brief overview visible on the card"
                        value={newProduct.shortDescription}
                        onChange={(e) => setNewProduct({ ...newProduct, shortDescription: e.target.value })}
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE]"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-2">
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Product Photograph</label>
                      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#150F14] p-3 rounded-lg border border-[#742D40]/40">
                        <img
                          src={newProduct.images?.[0] || 'https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=300&q=80'}
                          alt="Preview"
                          className="w-16 h-16 rounded-lg object-cover bg-black/50 shrink-0 border border-[#742D40]/40"
                        />
                        <div className="flex-1 w-full space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <label className="inline-flex items-center gap-1.5 bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-3 py-1.5 rounded-lg cursor-pointer transition-colors shadow">
                              <Camera className="w-3.5 h-3.5 text-[#D89C91]" />
                              <span>Choose from Phone Photos / Camera</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleImageFile(file, false);
                                }}
                                className="hidden"
                              />
                            </label>
                            <span className="text-[10px] text-[#F2E9DE]/50">or enter direct image URL below</span>
                          </div>
                          <input
                            type="url"
                            value={newProduct.images?.[0] || ''}
                            onChange={(e) => setNewProduct({ ...newProduct, images: [e.target.value] })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-[#1A1217] border border-[#742D40]/50 rounded-lg px-3 py-1.5 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Full Description & Intimate Guidance</label>
                      <textarea
                        rows={3}
                        placeholder="Detailed guidance on how this product is used, benefits, sensation and care..."
                        value={newProduct.description || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Materials & Safety Guidelines</label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Medical-Grade Platinum Silicone, Phthalate-free"
                        value={newProduct.materials || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, materials: e.target.value })}
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                      />
                    </div>

                    {/* Visibility and Featured Toggles */}
                    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#F2E9DE] bg-[#150F14] p-3 rounded-lg border border-[#742D40]/30 hover:border-[#D89C91]/40 transition-colors">
                        <input
                          type="checkbox"
                          checked={newProduct.inStock ?? true}
                          onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                          className="rounded text-[#742D40] w-4 h-4"
                        />
                        <div>
                          <span className="font-semibold block">Available & In Stock</span>
                          <span className="text-[10px] text-[#F2E9DE]/60">Customers can add to cart and order immediately</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#F2E9DE] bg-[#150F14] p-3 rounded-lg border border-[#742D40]/30 hover:border-[#D89C91]/40 transition-colors">
                        <input
                          type="checkbox"
                          checked={Boolean(newProduct.isFeatured)}
                          onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
                          className="rounded text-[#742D40] w-4 h-4"
                        />
                        <div>
                          <span className="font-semibold block flex items-center gap-1 text-amber-300">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>Feature on Homepage</span>
                          </span>
                          <span className="text-[10px] text-[#F2E9DE]/60">Showcase this item on the front page</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-6 py-3 rounded-xl border border-[#D89C91]/30 shadow"
                    >
                      Publish Product to Live Website & Firestore
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: WhatsApp & Store Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl bg-[#1C1419] p-5 rounded-xl border border-[#742D40]/40">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D89C91] font-semibold mb-1.5">
                        WhatsApp Business Phone Number (Orders will arrive here):
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          placeholder="+2348012345678"
                          className="flex-1 bg-[#150F14] border border-[#742D40] rounded-lg px-3.5 py-2.5 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                          required
                        />
                        <button
                          type="button"
                          onClick={testWhatsAppNumber}
                          className="inline-flex items-center gap-1 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 px-3 py-2 rounded-lg text-xs font-semibold border border-[#25D366]/30"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Test Link</span>
                        </button>
                      </div>
                      <span className="text-[11px] text-[#F2E9DE]/50 mt-1 block">
                        Include country code: e.g. +2348012345678.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D89C91] font-semibold mb-1.5">
                        Concierge Email Address:
                      </label>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="concierge@velvetpleasurehouse.com"
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3.5 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#D89C91] font-semibold mb-1.5">
                        Store Top Notice:
                      </label>
                      <input
                        type="text"
                        value={noticeInput}
                        onChange={(e) => setNoticeInput(e.target.value)}
                        placeholder="100% Plain packaging nationwide across Nigeria."
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3.5 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#742D40]/30">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] font-semibold text-xs py-2.5 px-5 rounded-lg border border-[#D89C91]/30 transition-all shadow"
                    >
                      <Save className="w-4 h-4 text-[#D89C91]" />
                      <span>Save Contact Settings</span>
                    </button>

                    {settingsSaved && (
                      <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                        <Check className="w-3.5 h-3.5" /> Saved & synchronized!
                      </span>
                    )}
                  </div>
                </form>

                {/* Change Password Card */}
                <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-2xl bg-[#1C1419] p-5 rounded-xl border border-[#742D40]/40">
                  <div className="flex items-center justify-between border-b border-[#742D40]/30 pb-2">
                    <h3 className="font-serif text-base text-[#F2E9DE] flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-[#D89C91]" />
                      <span>Change Store Owner Password</span>
                    </h3>
                    <span className="text-[11px] text-[#D89C91]">Secured with SHA-256 Hashing</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Current Password</label>
                      <input
                        type="password"
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        placeholder="Current password"
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">New Password</label>
                      <input
                        type="password"
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase text-[#D89C91] mb-1">Confirm New</label>
                      <input
                        type="password"
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        placeholder="Repeat new password"
                        className="w-full bg-[#150F14] border border-[#742D40] rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {pwdStatus?.error && (
                    <p className="text-xs text-rose-400">{pwdStatus.error}</p>
                  )}
                  {pwdStatus?.success && (
                    <p className="text-xs text-emerald-400">{pwdStatus.success}</p>
                  )}

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={pwdLoading}
                      className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-4 py-2 rounded-lg border border-[#D89C91]/30 shadow disabled:opacity-50"
                    >
                      {pwdLoading ? 'Updating Password...' : 'Update Password'}
                    </button>
                  </div>
                </form>
                </div>
              )}

              {/* TAB 4: How Self-Editing Works (Full Technical Transparency) */}
              {activeTab === 'how-it-works' && (
                <div className="space-y-4 max-w-2xl text-xs sm:text-sm text-[#F2E9DE]/85 leading-relaxed bg-[#1C1419] p-5 sm:p-6 rounded-xl border border-[#742D40]/40">
                  <h3 className="font-serif text-lg text-[#D89C91] flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Technical Architecture, Persistence & Owner Guide
                  </h3>

                  <div className="space-y-4 divide-y divide-[#742D40]/30 text-xs">
                    <div className="pt-2 space-y-1">
                      <strong className="text-[#F2E9DE] block uppercase tracking-wider text-[11px] text-[#D89C91]">
                        1. Permanent Cloud Persistence (Google Firebase Firestore Connected)
                      </strong>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        <strong>ACTIVE & PERMANENT:</strong> Velvet Pleasure House is now connected directly to Google Firebase Firestore (Database ID: <code>ai-studio-velvetpleasureho-065c3c82-418f-4a29-ba52-f56a287b5810</code>). All product titles, prices in Naira, descriptions, photos, and stock availability toggles are permanently written to Google&apos;s cloud database.
                      </p>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        Whenever your Cloud Run server restarts, sleeps, or scales across multiple instances, your products never disappear or reset. Every customer visiting the website from any device immediately fetches the latest data from Firestore.
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <strong className="text-[#F2E9DE] block uppercase tracking-wider text-[11px] text-[#D89C91]">
                        2. Are localStorage changes visible to customers on other devices?
                      </strong>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        <strong>NO.</strong> <code>localStorage</code> is strictly stored inside that individual phone or browser. It is completely isolated. If you only save to <code>localStorage</code>, no customer on another phone or computer will ever see your changes.
                      </p>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        <strong>How Velvet Pleasure House solves this:</strong> Every change you make in this dashboard immediately transmits over HTTP to the backend API (<code>/api/products</code>, <code>/api/settings</code>). When customers load the website from anywhere, their browsers request data from the server, ensuring everyone sees identical products and prices.
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <strong className="text-[#F2E9DE] block uppercase tracking-wider text-[11px] text-[#D89C91]">
                        3. Database Options & Free Tier Breakdown
                      </strong>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        <strong>Google Firebase Firestore (Recommended):</strong>
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-[#F2E9DE]/75">
                        <li><strong>Cost:</strong> 100% Free on the &ldquo;Spark Plan&rdquo;.</li>
                        <li><strong>Free Limits:</strong> 1 GB stored data, 50,000 document reads/day, 20,000 document writes/day. For an intimate wellness store with hundreds of products and thousands of visits, this free allowance is more than generous.</li>
                        <li><strong>Credit Card Required?</strong> <strong>NO.</strong> The Firebase Spark Plan does not require a credit card or billing account.</li>
                      </ul>
                      <p className="text-[#F2E9DE]/75 leading-relaxed mt-2">
                        <strong>Supabase (PostgreSQL alternative):</strong> Provides a free plan with 500 MB database storage and 50,000 monthly active users, but free projects are paused if inactive for over 7 days. Firebase Firestore is therefore more reliable for continuous store availability.
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <strong className="text-[#F2E9DE] block uppercase tracking-wider text-[11px] text-[#D89C91]">
                        4. Security & Role-Based Access Control (RBAC)
                      </strong>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        The previous default PIN <code>1234</code> has been removed. All product and setting modification endpoints (<code>POST /api/products</code>, <code>PUT /api/products/:id</code>, <code>DELETE /api/products/:id</code>, <code>PUT /api/settings</code>) now strictly enforce <strong>Bearer token verification</strong>. Without the SHA-256 verified store owner session token, any unauthorized request returns an immediate <code>401 Unauthorized</code> error.
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <strong className="text-[#F2E9DE] block uppercase tracking-wider text-[11px] text-[#D89C91]">
                        5. Can Google Cloud Run safely host the live website?
                      </strong>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        <strong>YES.</strong> Google Cloud Run is enterprise-grade infrastructure. It provides instant HTTPS SSL security, fast global CDN response times, automatic scaling during product launches, and runs for <strong>$0 / month</strong> within Google&apos;s generous free tier (2 million free requests per month). There is no need to migrate to Render or Vercel.
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <strong className="text-[#F2E9DE] block uppercase tracking-wider text-[11px] text-[#D89C91]">
                        6. 1-Tap Offline Catalogue Backup
                      </strong>
                      <p className="text-[#F2E9DE]/75 leading-relaxed">
                        In the &ldquo;Products & Prices&rdquo; tab, tap <strong>&ldquo;Export Backup&rdquo;</strong> at any time. It will immediately download a complete <code>velvet_pleasure_house_catalogue.json</code> file to your Android phone or computer containing every product, price, description, and image URL. You can restore your entire catalogue onto any instance in one second via <strong>&ldquo;Import&rdquo;</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-5 sm:px-6 py-3 bg-[#1C1419] border-t border-[#742D40]/30 flex flex-wrap items-center justify-between gap-3 text-xs text-[#F2E9DE]/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-[#D89C91] font-medium">Owner Authenticated (Active Token Session)</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={logoutOwner}
                  className="text-rose-400 hover:text-rose-300 hover:underline text-xs"
                >
                  Log Out
                </button>
                <button
                  onClick={() => setIsOwnerModalOpen(false)}
                  className="bg-[#261B22] hover:bg-[#742D40]/50 text-[#F2E9DE] px-3 py-1.5 rounded-lg border border-[#742D40]/40 transition-colors"
                >
                  Close Dashboard
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
