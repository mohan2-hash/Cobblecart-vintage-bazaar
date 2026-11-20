export type StoreName = 'Flipkart' | 'Amazon' | 'Croma' | 'Vintage Emporium' | 'Official Store';

export interface StorePrice {
  store: StoreName;
  price: number;
  originalPrice: number;
  inStock: boolean;
  deliveryDays: number;
  deliveryText: string;
  rating: number;
  reviewCount: number;
  productUrl: string;
  badge?: string;
  offers: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  storeSource: 'Flipkart' | 'Amazon' | 'Verified Buyer';
  helpfulCount: number;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
  store: StoreName;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  description: string;
  category: 'electronics' | 'fashion' | 'books' | 'audio' | 'watches' | 'home';
  categoryLabel: string;
  storefrontName: string; // E.g., "The Edison Electric Guild", "Savile Row Wardrobe"
  images: string[];
  thumbnail: string;
  brand: string;
  features: string[];
  specifications: Record<string, string>;
  storePrices: StorePrice[];
  priceHistory: PriceHistoryPoint[];
  reviews: Review[];
  overallRating: number;
  totalReviews: number;
  aiVerdict?: {
    recommendation: 'BUY_NOW' | 'WAIT_FOR_DROP' | 'FAIR_DEAL';
    verdictSummary: string;
    pros: string[];
    cons: string[];
    cheapestStore: StoreName;
    savingsAmount: number;
    priceDropProbability: number; // e.g. 85%
  };
  featured?: boolean;
  isVintageSpecial?: boolean;
}

export interface CartItem {
  product: Product;
  selectedStore: StorePrice;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  savedItems: string[]; // product IDs
  priceAlerts: { productId: string; targetPrice: number }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
  suggestedProducts?: string[]; // IDs
}
