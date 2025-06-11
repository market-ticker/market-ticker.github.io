// Core ticker/commodity data types
export interface Ticker {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  lastUpdated: Date;
  category: TickerCategory;
  description?: string;
  unit: string;
}

export interface TickerDetails extends Ticker {
  historicalData: PricePoint[];
  fundamentals: TickerFundamentals;
  news: NewsItem[];
}

export interface PricePoint {
  timestamp: Date;
  price: number;
  volume: number;
}

export interface TickerFundamentals {
  high52Week: number;
  low52Week: number;
  avgVolume: number;
  beta?: number;
  peRatio?: number;
  dividend?: number;
  dividendYield?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: Date;
  source: string;
}

export enum TickerCategory {
  COMMODITIES = 'commodities',
  ENERGY = 'energy',
  METALS = 'metals',
  AGRICULTURE = 'agriculture',
  LIVESTOCK = 'livestock',
  CURRENCY = 'currency',
  CRYPTO = 'crypto',
}

// UI-specific types
export interface TickerModalProps {
  ticker: Ticker | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface TickerListFilters {
  category?: TickerCategory;
  searchQuery?: string;
  sortBy?: 'name' | 'price' | 'change' | 'volume';
  sortOrder?: 'asc' | 'desc';
}

// API response types
export interface TickerApiResponse {
  tickers: Ticker[];
  total: number;
  page: number;
  limit: number;
}

export interface TickerDetailsApiResponse {
  ticker: TickerDetails;
  success: boolean;
  message?: string;
}