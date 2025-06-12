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
} from '@mui/material';
import { Inventory } from '@mui/icons-material';
import CreateCommodityMaterialUI from '../components/CreateCommodityMaterialUI';

interface Commodity {
  id: string;
  name: string;
  symbol: string;
  comId: string;
}

// GraphQL query to fetch commodities
const COMMODITIES_QUERY = `
  query {
        commodityCreateds {
          id
          comId
          name
          symbol
      }
  }
`;

// Function to fetch commodities from The Graph API
async function fetchCommodities(): Promise<Commodity[]> {
  try {
    const response = await fetch('https://api.studio.thegraph.com/query/33148/commodity-market-ticker/v0.0.3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: COMMODITIES_QUERY }),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const jsonResponse = await response.json();
    const data = jsonResponse.data.commodityCreateds as Commodity[];
    return data;
  } catch (error) {
    console.error('Error fetching commodities:', error);
    throw error;
  }
}

const Commodities: React.FC = () => {
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshCommodities = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    const loadCommodities = async () => {
      try {
        setLoading(true);
        const fetchedCommodities = await fetchCommodities();
        setCommodities(fetchedCommodities);
        setError(null);
      } catch (err) {
        setError('Failed to load commodities');
        console.error('Error loading commodities:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCommodities();
  }, [refreshKey]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Inventory sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
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
              Commodities
            </Typography>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Explore all available commodities in our marketplace. Track prices, monitor trends, and discover trading opportunities.
          </Typography>
        </Box>

        {/* Create Commodity Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <CreateCommodityMaterialUI onCreationComplete={refreshCommodities} />
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
            ) : commodities.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Inventory sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Commodities Found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There are currently no commodities available in the marketplace.
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} elevation={0} sx={{ overflowX: 'auto' }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell sx={{ fontWeight: 600, minWidth: '60px' }}>#</TableCell>
                      <TableCell sx={{ fontWeight: 600, minWidth: '150px' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, minWidth: '100px' }}>Symbol</TableCell>
                      <TableCell sx={{ fontWeight: 600, minWidth: '200px' }}>Commodity ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, minWidth: '100px' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {commodities.map((commodity, index) => (
                      <TableRow 
                        key={commodity.id || index}
                        sx={{ 
                          '&:hover': { bgcolor: 'grey.50' },
                          '&:last-child td': { border: 0 }
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {commodity.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={commodity.symbol} 
                            variant="outlined" 
                            size="small"
                            color="primary"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {commodity.comId}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label="Active" 
                            color="success" 
                            size="small"
                            variant="outlined"
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
        {commodities.length > 0 && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Showing {commodities.length} commodities in the marketplace
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Commodities;