import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Speed,
  Security,
  AccountBalanceWallet,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useWalletContext } from '../context/wallet';
import { mockTickers } from '../data/mockTickers';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useWalletContext();
  
  // Get top performing tickers for showcase
  const topPerformers = mockTickers
    .filter(ticker => ticker.changePercent > 0)
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);

  const features = [
    {
      icon: <TrendingUp />,
      title: 'Real-time Data',
      description: 'Live market data updates with real-time price movements and volume tracking.',
    },
    {
      icon: <Assessment />,
      title: 'Advanced Analytics',
      description: 'Comprehensive market analysis tools with historical data and trend insights.',
    },
    {
      icon: <Speed />,
      title: 'Fast Performance',
      description: 'Lightning-fast data delivery with optimized performance for trading decisions.',
    },
    {
      icon: <Security />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with encrypted data transmission and storage.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 4,
            alignItems: 'center'
          }}>
            <Box>
              <Typography
                variant="h1"
                component="h1"
                gutterBottom
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  background: 'linear-gradient(125deg, #ff9c27 0%, #fd48ce 51.7%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Market Ticker
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                color="text.secondary"
                sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
              >
                Real-time Commodity Market Data
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 4 }}>
                Stay ahead of the market with our comprehensive commodity tracking platform.
                Monitor prices, analyze trends, and make informed trading decisions with real-time data.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/commodities')}
                  sx={{ px: 4, py: 1.5 }}
                >
                  View Commodities
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/orders')}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Browse Orders
                </Button>
                {!isLoggedIn && (
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    startIcon={<AccountBalanceWallet />}
                    onClick={() => {
                      // This will trigger the login modal in the navbar
                      // We could also create a direct login function here
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      background: 'linear-gradient(125deg, #ff9c27 0%, #fd48ce 51.7%)',
                      '&:hover': {
                        background: 'linear-gradient(125deg, #e8890f 0%, #e634b7 51.7%)',
                      }
                    }}
                  >
                    Connect Wallet
                  </Button>
                )}
              </Box>
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  p: 3,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography variant="h6" component="h3" gutterBottom>
                  Top Performers Today
                </Typography>
                {topPerformers.map((ticker) => (
                  <Box
                    key={ticker.id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1,
                      borderRadius: 1,
                      bgcolor: alpha('#4caf50', 0.1),
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {ticker.symbol}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${ticker.currentPrice.toFixed(2)}
                      </Typography>
                    </Box>
                    <Chip
                      label={`+${ticker.changePercent.toFixed(2)}%`}
                      color="success"
                      size="small"
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Why Choose Market Ticker?
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 4
        }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                    '& svg': {
                      fontSize: 48,
                      color: 'primary.main',
                    },
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          py: 6,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Start Trading?
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 4 }}>
            Join thousands of traders who rely on Market Ticker for their commodity market insights.
            Start tracking your favorite commodities today.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/commodities')}
            sx={{ px: 6, py: 1.5 }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;