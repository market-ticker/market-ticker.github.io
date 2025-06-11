import { Ticker, TickerCategory, TickerDetails, PricePoint, NewsItem } from '../types';

// Mock ticker data
export const mockTickers: Ticker[] = [
  {
    id: '1',
    symbol: 'GOLD',
    name: 'Gold',
    currentPrice: 2045.30,
    change: 12.50,
    changePercent: 0.61,
    volume: 1250000,
    marketCap: 12500000000,
    lastUpdated: new Date(),
    category: TickerCategory.METALS,
    description: 'Precious metal commodity used as a store of value',
    unit: 'USD/oz',
  },
  {
    id: '2',
    symbol: 'SILVER',
    name: 'Silver',
    currentPrice: 24.85,
    change: -0.75,
    changePercent: -2.93,
    volume: 2300000,
    marketCap: 1850000000,
    lastUpdated: new Date(),
    category: TickerCategory.METALS,
    description: 'Industrial and precious metal with high conductivity',
    unit: 'USD/oz',
  },
  {
    id: '3',
    symbol: 'WTI',
    name: 'Crude Oil WTI',
    currentPrice: 78.45,
    change: 2.10,
    changePercent: 2.75,
    volume: 850000,
    marketCap: 7800000000,
    lastUpdated: new Date(),
    category: TickerCategory.ENERGY,
    description: 'West Texas Intermediate crude oil benchmark',
    unit: 'USD/bbl',
  },
  {
    id: '4',
    symbol: 'NATGAS',
    name: 'Natural Gas',
    currentPrice: 2.85,
    change: -0.12,
    changePercent: -4.04,
    volume: 1750000,
    marketCap: 2850000000,
    lastUpdated: new Date(),
    category: TickerCategory.ENERGY,
    description: 'Natural gas futures contract',
    unit: 'USD/MMBtu',
  },
  {
    id: '5',
    symbol: 'WHEAT',
    name: 'Wheat',
    currentPrice: 6.25,
    change: 0.15,
    changePercent: 2.46,
    volume: 450000,
    marketCap: 625000000,
    lastUpdated: new Date(),
    category: TickerCategory.AGRICULTURE,
    description: 'Wheat commodity futures',
    unit: 'USD/bushel',
  },
  {
    id: '6',
    symbol: 'CORN',
    name: 'Corn',
    currentPrice: 4.82,
    change: -0.08,
    changePercent: -1.63,
    volume: 780000,
    marketCap: 482000000,
    lastUpdated: new Date(),
    category: TickerCategory.AGRICULTURE,
    description: 'Corn commodity futures',
    unit: 'USD/bushel',
  },
  {
    id: '7',
    symbol: 'COPPER',
    name: 'Copper',
    currentPrice: 3.95,
    change: 0.05,
    changePercent: 1.28,
    volume: 320000,
    marketCap: 3950000000,
    lastUpdated: new Date(),
    category: TickerCategory.METALS,
    description: 'Industrial metal with high demand in construction',
    unit: 'USD/lb',
  },
  {
    id: '8',
    symbol: 'CATTLE',
    name: 'Live Cattle',
    currentPrice: 175.50,
    change: 1.25,
    changePercent: 0.72,
    volume: 125000,
    marketCap: 1750000000,
    lastUpdated: new Date(),
    category: TickerCategory.LIVESTOCK,
    description: 'Live cattle futures for beef production',
    unit: 'USD/cwt',
  },
];

// Generate mock historical data
const generateHistoricalData = (basePrice: number, days: number = 30): PricePoint[] => {
  const data: PricePoint[] = [];
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const randomVariation = (Math.random() - 0.5) * 0.1; // ±5% variation
    const price = basePrice * (1 + randomVariation);
    const volume = Math.floor(Math.random() * 1000000) + 100000;
    
    data.push({
      timestamp,
      price: Math.round(price * 100) / 100,
      volume,
    });
  }
  
  return data;
};

// Generate mock news items
const generateMockNews = (tickerName: string): NewsItem[] => [
  {
    id: '1',
    title: `${tickerName} Prices Rise Amid Supply Concerns`,
    summary: `Market analysts report increased demand and supply chain disruptions affecting ${tickerName} prices.`,
    url: '#',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    source: 'Market News',
  },
  {
    id: '2',
    title: `Technical Analysis: ${tickerName} Shows Bullish Pattern`,
    summary: `Chart patterns suggest potential upward momentum for ${tickerName} in the coming weeks.`,
    url: '#',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    source: 'Trading Insights',
  },
  {
    id: '3',
    title: `Global Economic Factors Impact ${tickerName} Trading`,
    summary: `International market conditions and policy changes affect ${tickerName} commodity trading.`,
    url: '#',
    publishedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    source: 'Economic Times',
  },
];

// Create detailed ticker information
export const getTickerDetails = (tickerId: string): TickerDetails | undefined => {
  const ticker = mockTickers.find(t => t.id === tickerId);
  if (!ticker) return undefined;

  return {
    ...ticker,
    historicalData: generateHistoricalData(ticker.currentPrice),
    fundamentals: {
      high52Week: ticker.currentPrice * 1.25,
      low52Week: ticker.currentPrice * 0.75,
      avgVolume: ticker.volume,
      beta: Math.random() * 2,
    },
    news: generateMockNews(ticker.name),
  };
};

// Filter and search functionality
export const filterTickers = (
  tickers: Ticker[],
  filters: {
    category?: TickerCategory;
    searchQuery?: string;
    sortBy?: 'name' | 'price' | 'change' | 'volume';
    sortOrder?: 'asc' | 'desc';
  }
): Ticker[] => {
  let filtered = [...tickers];

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(ticker => ticker.category === filters.category);
  }

  // Filter by search query
  if (filters.searchQuery && filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(ticker =>
      ticker.name.toLowerCase().includes(query) ||
      ticker.symbol.toLowerCase().includes(query)
    );
  }

  // Sort by specified field
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (filters.sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = a.currentPrice;
          bValue = b.currentPrice;
          break;
        case 'change':
          aValue = a.changePercent;
          bValue = b.changePercent;
          break;
        case 'volume':
          aValue = a.volume;
          bValue = b.volume;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'desc' 
          ? bValue.localeCompare(aValue)
          : aValue.localeCompare(bValue);
      }

      return filters.sortOrder === 'desc' 
        ? (bValue as number) - (aValue as number)
        : (aValue as number) - (bValue as number);
    });
  }

  return filtered;
};