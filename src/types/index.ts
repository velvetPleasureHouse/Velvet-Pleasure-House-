export type ProductCategory = 'lingerie' | 'toys' | 'lubricants' | 'intimate-care';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in Nigerian Naira (₦)
  shortDescription: string;
  description: string;
  images: string[];
  inStock: boolean;
  isFeatured?: boolean;
  badge?: string;
  specifications: Record<string, string>;
  safetyAndCare: string;
  compatibility?: string;
  materials: string;
  isDemonstration?: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  summary: string;
  keyPoints: string[];
  content: {
    heading: string;
    paragraphs: string[];
  }[];
  author: string;
  reviewedBy: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  businessEmail: string;
  instagramHandle: string;
  twitterHandle: string;
  storeNotice: string;
  currencySymbol: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
