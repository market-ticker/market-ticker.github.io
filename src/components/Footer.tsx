import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Stack,
} from '@mui/material';
import {
  GitHub,
  Twitter,
  LinkedIn,
  TrendingUp,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
          gap: 4,
          mb: 4
        }}>
          {/* Brand Section */}
          <Box sx={{ gridColumn: { xs: '1', md: 'span 2' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Market Ticker
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Real-time commodity market data and analysis platform. 
              Stay informed with the latest market trends and price movements.
            </Typography>
            <Box>
              <IconButton
                component="a"
                href="https://github.com/market-ticker"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
              >
                <GitHub />
              </IconButton>
              <IconButton
                component="a" 
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
              >
                <Twitter />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Box>

          {/* Markets */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Markets
            </Typography>
            <Stack spacing={1}>
              <Link href="/tickers" color="text.secondary" underline="hover">
                All Tickers
              </Link>
              <Link href="/tickers?category=metals" color="text.secondary" underline="hover">
                Metals
              </Link>
              <Link href="/tickers?category=energy" color="text.secondary" underline="hover">
                Energy
              </Link>
              <Link href="/tickers?category=agriculture" color="text.secondary" underline="hover">
                Agriculture
              </Link>
            </Stack>
          </Box>

          {/* Tools */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Tools
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="text.secondary" underline="hover">
                Price Alerts
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Portfolio
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Analysis
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                News Feed
              </Link>
            </Stack>
          </Box>

          {/* Support */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Support
            </Typography>
            <Stack spacing={1}>
              <Link href="/about" color="text.secondary" underline="hover">
                About Us
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Help Center
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Contact
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                API Docs
              </Link>
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Market Ticker. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Market data provided for informational purposes only.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;