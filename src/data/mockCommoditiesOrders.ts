// Mock data for commodities when API is not available
export const mockCommodities = [
  {
    id: '1',
    name: 'Arabica Coffee',
    symbol: 'COFFEE',
    comId: '0x1234567890abcdef1234567890abcdef12345678',
  },
  {
    id: '2', 
    name: 'Premium Rice',
    symbol: 'RICE',
    comId: '0x2345678901bcdef12345678901bcdef123456789',
  },
  {
    id: '3',
    name: 'Organic Wheat',
    symbol: 'WHEAT', 
    comId: '0x3456789012cdef123456789012cdef1234567890',
  },
  {
    id: '4',
    name: 'Yellow Corn',
    symbol: 'CORN',
    comId: '0x456789013def123456789013def12345678901a',
  },
  {
    id: '5',
    name: 'Raw Sugar',
    symbol: 'SUGAR',
    comId: '0x56789014ef123456789014ef123456789012ab',
  },
];

// Mock data for orders when API is not available
export const mockOrders = [
  {
    orderId: '1001',
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    commodityId: '1',
    region: 'East Africa',
    country: 'Ethiopia',
    amount: 1000,
    price: 250,
    currency: 'USD',
    harvestDate: String(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    validityPeriod: '90 days',
    isBuyOrder: false,
  },
  {
    orderId: '1002', 
    owner: '0xbcdef12345678901bcdef12345678901bcdef123',
    commodityId: '2',
    region: 'Southeast Asia',
    country: 'Thailand',
    amount: 2500,
    price: 180,
    currency: 'USD',
    harvestDate: String(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    validityPeriod: '60 days',
    isBuyOrder: true,
  },
  {
    orderId: '1003',
    owner: '0xcdef123456789012cdef123456789012cdef1234',
    commodityId: '3',
    region: 'North America',
    country: 'Canada',
    amount: 5000,
    price: 320,
    currency: 'CAD',
    harvestDate: String(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    validityPeriod: '120 days',
    isBuyOrder: false,
  },
  {
    orderId: '1004',
    owner: '0xdef123456789013def123456789013def12345678',
    commodityId: '4',
    region: 'South America',
    country: 'Brazil',
    amount: 3000,
    price: 195,
    currency: 'BRL',
    harvestDate: String(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    validityPeriod: '75 days',
    isBuyOrder: true,
  },
  {
    orderId: '1005',
    owner: '0xef123456789014ef123456789014ef1234567890',
    commodityId: '5',
    region: 'Caribbean',
    country: 'Jamaica',
    amount: 1500,
    price: 380,
    currency: 'USD',
    harvestDate: String(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    validityPeriod: '45 days',
    isBuyOrder: false,
  },
];