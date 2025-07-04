import React, { useState, useCallback, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  alpha,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  TrendingUp,
  Home,
  Info,
  AccountBalanceWallet,
  Inventory,
  ShoppingCart,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useWalletContext } from '../context/wallet';
import CreateCommodityMaterialUI from './CreateCommodityMaterialUI';
import PlaceOrderMaterialUI from './PlaceOrderMaterialUI';

interface Commodity {
  id: string;
  name: string;
  symbol: string;
  comId: string;
}

// GraphQL query to fetch commodities for the order form
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
    return [];
  }
}

const MuiNavbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mobile menu state
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  
  // Wallet modal state
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Commodities state for PlaceOrder form
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Wallet context
  const { isLoggedIn, login, logout, username, scaAddress } = useWalletContext();

  // Load commodities for PlaceOrder form
  useEffect(() => {
    const loadCommodities = async () => {
      try {
        const fetchedCommodities = await fetchCommodities();
        setCommodities(fetchedCommodities);
      } catch (err) {
        console.error('Error loading commodities:', err);
      }
    };

    loadCommodities();
  }, [refreshKey]);

  // Refresh callbacks for forms
  const refreshCommodities = () => {
    setRefreshKey(prev => prev + 1);
  };

  const refreshOrders = () => {
    // This could be expanded if needed to refresh orders in other parts of the app
    console.log('Order placed successfully');
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleWalletModalOpen = () => {
    setIsWalletModalOpen(true);
  };

  const handleWalletModalClose = () => {
    setIsWalletModalOpen(false);
    setEmail('');
    setIsLoggingIn(false);
  };

  const handleLogin = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      await login(email);
      setIsWalletModalOpen(false);
      setEmail('');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoggingIn(false);
    }
  }, [login, email]);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout]);

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Commodities', path: '/commodities', icon: <Inventory /> },
    { label: 'Orders', path: '/orders', icon: <ShoppingCart /> },
    { label: 'About', path: '/about', icon: <Info /> },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const NavButton: React.FC<{ item: typeof navigationItems[0] }> = ({ item }) => (
    <Button
      component={Link}
      to={item.path}
      color="inherit"
      startIcon={item.icon}
      sx={{
        mx: 1,
        color: isActiveRoute(item.path) ? 'primary.contrastText' : 'inherit',
        bgcolor: isActiveRoute(item.path) ? alpha('#ffffff', 0.2) : 'transparent',
        '&:hover': {
          bgcolor: alpha('#ffffff', 0.1),
        },
        borderRadius: 2,
        px: 2,
      }}
    >
      {item.label}
    </Button>
  );

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mr: 4,
            }}
            onClick={() => navigate('/')}
          >
            <TrendingUp sx={{ mr: 1, fontSize: 28 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 0,
                fontWeight: 700,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
              }}
            >
              Market Ticker
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {navigationItems.map((item) => (
                <NavButton key={item.path} item={item} />
              ))}
            </Box>
          )}

          {/* Spacer for mobile */}
          {isMobile && <Box sx={{ flexGrow: 1 }} />}

          {/* Action Buttons */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
              <CreateCommodityMaterialUI onCreationComplete={refreshCommodities} />
              <PlaceOrderMaterialUI onOrderPlaced={refreshOrders} commodities={commodities} />
            </Box>
          )}

          {/* Wallet Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  startIcon={<AccountBalanceWallet />}
                  onClick={() => window.open(`https://sepolia.etherscan.io/address/${scaAddress}`, '_blank')}
                  sx={{
                    bgcolor: alpha('#ffffff', 0.2),
                    '&:hover': {
                      bgcolor: alpha('#ffffff', 0.3),
                    },
                    borderRadius: 2,
                    px: 2,
                    display: { xs: 'none', sm: 'flex' },
                  }}
                >
                  {username || 'Wallet'}
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  sx={{
                    border: 1,
                    borderColor: alpha('#ffffff', 0.5),
                    borderRadius: 2,
                    px: 2,
                  }}
                >
                  {isLoggingOut ? 'Logging Out...' : 'Logout'}
                </Button>
              </>
            ) : (
              <Button
                color="inherit"
                startIcon={<AccountBalanceWallet />}
                onClick={handleWalletModalOpen}
                sx={{
                  bgcolor: alpha('#ffffff', 0.2),
                  '&:hover': {
                    bgcolor: alpha('#ffffff', 0.3),
                  },
                  borderRadius: 2,
                  px: 2,
                }}
              >
                Connect Wallet
              </Button>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={handleMobileMenuOpen}
                sx={{ ml: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {navigationItems.map((item) => (
          <MenuItem
            key={item.path}
            onClick={() => {
              navigate(item.path);
              handleMobileMenuClose();
            }}
            selected={isActiveRoute(item.path)}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {item.icon}
              {item.label}
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <CreateCommodityMaterialUI onCreationComplete={() => {
              refreshCommodities();
              handleMobileMenuClose();
            }} />
            <PlaceOrderMaterialUI onOrderPlaced={() => {
              refreshOrders();
              handleMobileMenuClose();
            }} commodities={commodities} />
          </Box>
        </MenuItem>
      </Menu>

      {/* Wallet Connection Modal */}
      <Dialog
        open={isWalletModalOpen}
        onClose={handleWalletModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Connect Your Wallet
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your email address to connect with your wallet using Magic Link authentication.
          </Typography>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={isLoggingIn}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && email.trim()) {
                handleLogin();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWalletModalClose} disabled={isLoggingIn}>
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            variant="contained"
            disabled={isLoggingIn || !email.trim()}
          >
            {isLoggingIn ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MuiNavbar;