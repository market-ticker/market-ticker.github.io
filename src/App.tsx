import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { WalletContextProvider } from './context/wallet';
import { theme } from './theme';
import MuiNavbar from './components/MuiNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TickerList from './pages/TickerList';
import About from './pages/About';
import Root from './components/Root'; // Legacy root component for /legacy route
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletContextProvider>
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <MuiNavbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tickers" element={<TickerList />} />
                <Route path="/about" element={<About />} />
                <Route path="/legacy" element={<Root />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </WalletContextProvider>
    </ThemeProvider>
  );
}

export default App;
