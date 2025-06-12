import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ShoppingCart, TrendingUp, TrendingDown } from '@mui/icons-material';

interface Order {
  orderId: string;
  owner: string;
  commodityId: string;
  region: string;
  country: string;
  amount: number;
  price: number;
  currency: string;
  harvestDate: string;
  validityPeriod: string;
  isBuyOrder: boolean;
}

// GraphQL query to fetch orders
const ORDERS_QUERY = `{
    orderPlaceds {
      orderId
      owner
      commodityId
      region
      country
      amount
      price
      currency
      harvestDate
      validityPeriod
      isBuyOrder
    }
  }
`;

// Function to fetch orders from The Graph API
async function fetchOrders(): Promise<Order[]> {
  try {
    const response = await fetch('https://api.studio.thegraph.com/query/33148/commodity-market-ticker/v0.0.3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: ORDERS_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    return jsonResponse.data.orderPlaceds as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
        setError(null);
      } catch (err) {
        setError('Failed to load orders');
        console.error('Error loading orders:', err);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const formatDate = (timestamp: string) => {
    try {
      return new Date(parseInt(timestamp)).toLocaleDateString();
    } catch {
      return 'Invalid Date';
    }
  };

  const formatOwner = (owner: string) => {
    if (owner.length <= 10) return owner;
    return `${owner.slice(0, 6)}...${owner.slice(-4)}`;
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <ShoppingCart sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(125deg, #ff9c27 0%, #fd48ce 51.7%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Orders
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Track all trading orders in the marketplace. Monitor buy and sell orders, prices, and trading activity.
          </Typography>
        </Box>

        {/* Content */}
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ p: 0 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress size={48} />
              </Box>
            ) : error ? (
              <Box sx={{ p: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
                <Typography variant="body2" color="text.secondary">
                  Please try refreshing the page or contact support if the problem persists.
                </Typography>
              </Box>
            ) : orders.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <ShoppingCart sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Orders Found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There are currently no orders in the marketplace.
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table size={isMobile ? 'small' : 'medium'}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Owner</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Commodity ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Region</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Country</TableCell>
                      <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Price</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Currency</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Harvest Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Validity</TableCell>
                      <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order, index) => (
                      <TableRow 
                        key={order.orderId || index}
                        sx={{ 
                          '&:hover': { bgcolor: 'grey.50' },
                          '&:last-child td': { border: 0 }
                        }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            {order.orderId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            {formatOwner(order.owner)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                            {order.commodityId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {order.region}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {order.country}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight={500}>
                            {order.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight={500}>
                            {order.price.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={order.currency} 
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(order.harvestDate)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {order.validityPeriod}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ textAlign: 'center' }}>
                          <Chip 
                            label={order.isBuyOrder ? 'BUY' : 'SELL'}
                            color={order.isBuyOrder ? 'success' : 'error'}
                            size="small"
                            icon={order.isBuyOrder ? <TrendingUp /> : <TrendingDown />}
                            sx={{ fontWeight: 600 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>

        {/* Stats Summary */}
        {orders.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="primary.main" fontWeight={600}>
                  {orders.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="success.main" fontWeight={600}>
                  {orders.filter(order => order.isBuyOrder).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Buy Orders
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color="error.main" fontWeight={600}>
                  {orders.filter(order => !order.isBuyOrder).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sell Orders
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Orders;