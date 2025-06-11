import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
  alpha,
} from '@mui/material';
import {
  Search,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import { Ticker, TickerCategory } from '../types';
import { mockTickers, filterTickers } from '../data/mockTickers';
import TickerModal from '../components/TickerModal';

const TickerList: React.FC = () => {
  const [selectedTicker, setSelectedTicker] = useState<Ticker | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<TickerCategory | ''>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change' | 'volume'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredTickers = useMemo(() => {
    return filterTickers(mockTickers, {
      searchQuery,
      category: categoryFilter || undefined,
      sortBy,
      sortOrder,
    });
  }, [searchQuery, categoryFilter, sortBy, sortOrder]);

  const handleTickerClick = (ticker: Ticker) => {
    setSelectedTicker(ticker);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedTicker(null);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const getCategoryColor = (category: TickerCategory): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (category) {
      case TickerCategory.METALS:
        return 'warning';
      case TickerCategory.ENERGY:
        return 'error';
      case TickerCategory.AGRICULTURE:
        return 'success';
      case TickerCategory.LIVESTOCK:
        return 'info';
      case TickerCategory.CURRENCY:
        return 'primary';
      case TickerCategory.CRYPTO:
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Market Tickers
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time commodity market data and pricing information
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 3,
            alignItems: 'center'
          }}>
            <Box>
              <TextField
                fullWidth
                label="Search tickers"
                placeholder="Search by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value as TickerCategory | '')}
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {Object.values(TickerCategory).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'change' | 'volume')}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="price">Price</MenuItem>
                  <MenuItem value="change">Change</MenuItem>
                  <MenuItem value="volume">Volume</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant={sortOrder === 'asc' ? 'contained' : 'outlined'}
                onClick={() => setSortOrder('asc')}
                sx={{ flex: 1 }}
              >
                Ascending
              </Button>
              <Button
                variant={sortOrder === 'desc' ? 'contained' : 'outlined'}
                onClick={() => setSortOrder('desc')}
                sx={{ flex: 1 }}
              >
                Descending
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredTickers.length} of {mockTickers.length} tickers
        </Typography>
      </Box>

      {/* Ticker Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {filteredTickers.map((ticker) => (
          <Card
            key={ticker.id}
            sx={{
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
            onClick={() => handleTickerClick(ticker)}
          >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {ticker.symbol}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {ticker.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={ticker.category.charAt(0).toUpperCase() + ticker.category.slice(1)}
                    color={getCategoryColor(ticker.category)}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
                    {formatPrice(ticker.currentPrice)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ticker.unit}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: ticker.changePercent >= 0 
                        ? alpha('#4caf50', 0.1) 
                        : alpha('#f44336', 0.1),
                    }}
                  >
                    {ticker.changePercent >= 0 ? (
                      <TrendingUp sx={{ fontSize: 16, color: '#4caf50' }} />
                    ) : (
                      <TrendingDown sx={{ fontSize: 16, color: '#f44336' }} />
                    )}
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: ticker.changePercent >= 0 ? '#4caf50' : '#f44336',
                        fontWeight: 600,
                      }}
                    >
                      {ticker.changePercent >= 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Vol: {formatVolume(ticker.volume)}
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Updated: {ticker.lastUpdated.toLocaleTimeString()}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Box>

      {/* No Results */}
      {filteredTickers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No tickers found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters
          </Typography>
        </Box>
      )}

      {/* Ticker Details Modal */}
      <TickerModal
        ticker={selectedTicker}
        isOpen={modalOpen}
        onClose={handleModalClose}
      />
    </Container>
  );
};

export default TickerList;