import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  alpha,
  IconButton,
} from '@mui/material';
import {
  Close,
  TrendingUp,
  TrendingDown,
  Schedule,
  Assessment,
} from '@mui/icons-material';
import { TickerModalProps } from '../types';
import { getTickerDetails } from '../data/mockTickers';

const TickerModal: React.FC<TickerModalProps> = ({ ticker, isOpen, onClose }) => {
  if (!ticker) return null;

  const tickerDetails = getTickerDetails(ticker.id);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatVolume = (volume: number) => {
    return new Intl.NumberFormat('en-US').format(volume);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(2)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(2)}M`;
    }
    return `$${(marketCap / 1000).toFixed(2)}K`;
  };

  const getCategoryColor = (category: string): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (category) {
      case 'metals':
        return 'warning';
      case 'energy':
        return 'error';
      case 'agriculture':
        return 'success';
      case 'livestock':
        return 'info';
      case 'currency':
        return 'primary';
      case 'crypto':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
            {ticker.symbol} - {ticker.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
            <Chip
              label={ticker.category.charAt(0).toUpperCase() + ticker.category.slice(1)}
              color={getCategoryColor(ticker.category)}
              size="small"
            />
            <Typography variant="body2" color="text.secondary">
              {ticker.unit}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Price Information */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3
            }}>
              <Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                  {formatPrice(ticker.currentPrice)}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    bgcolor: ticker.changePercent >= 0 
                      ? alpha('#4caf50', 0.1) 
                      : alpha('#f44336', 0.1),
                    width: 'fit-content',
                  }}
                >
                  {ticker.changePercent >= 0 ? (
                    <TrendingUp sx={{ fontSize: 20, color: '#4caf50' }} />
                  ) : (
                    <TrendingDown sx={{ fontSize: 20, color: '#f44336' }} />
                  )}
                  <Typography
                    variant="body1"
                    sx={{ 
                      color: ticker.changePercent >= 0 ? '#4caf50' : '#f44336',
                      fontWeight: 600,
                    }}
                  >
                    {formatPrice(ticker.change)} ({ticker.changePercent >= 0 ? '+' : ''}{ticker.changePercent.toFixed(2)}%)
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Schedule sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    Last Updated: {ticker.lastUpdated.toLocaleString()}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Volume: {formatVolume(ticker.volume)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Market Cap: {formatMarketCap(ticker.marketCap)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Description */}
        {ticker.description && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {ticker.description}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Fundamentals */}
        {tickerDetails && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Key Statistics
              </Typography>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                gap: 2
              }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    52W High
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatPrice(tickerDetails.fundamentals.high52Week)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    52W Low
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatPrice(tickerDetails.fundamentals.low52Week)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Avg Volume
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {formatVolume(tickerDetails.fundamentals.avgVolume)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Beta
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {tickerDetails.fundamentals.beta?.toFixed(2) ?? 'N/A'}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Recent News */}
        {tickerDetails && tickerDetails.news.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent News
              </Typography>
              <List dense>
                {tickerDetails.news.slice(0, 3).map((newsItem, index) => (
                  <React.Fragment key={newsItem.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {newsItem.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {newsItem.summary}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {newsItem.source} • {newsItem.publishedAt.toLocaleDateString()}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < tickerDetails.news.length - 1 && <Divider component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button variant="contained" startIcon={<Assessment />}>
          View Full Analysis
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TickerModal;