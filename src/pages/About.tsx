import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Paper,
  Link,
} from '@mui/material';
import {
  TrendingUp,
  Analytics,
  Speed,
  Security,
  AccountBalanceWallet,
  Inventory,
  ShoppingCart,
  Language,
  OpenInNew,
  GitHub,
} from '@mui/icons-material';

const About: React.FC = () => {
  const technologies = [
    'React 18',
    'TypeScript',
    'Material-UI v7',
    'React Router',
    'Vite',
    'GraphQL',
    'ethers.js',
    'Magic Link',
    'Alchemy Account Abstraction',
    'The Graph Protocol',
  ];

  const features = [
    {
      title: 'Blockchain Integration',
      description: 'Smart contract integration for commodity creation and order placement on Ethereum',
      icon: <Security />,
    },
    {
      title: 'Wallet Authentication',
      description: 'Magic Link integration with Account Abstraction for seamless user experience',
      icon: <AccountBalanceWallet />,
    },
    {
      title: 'Real-time Data',
      description: 'Live commodity and order data fetched from The Graph protocol subgraph',
      icon: <Analytics />,
    },
    {
      title: 'Responsive Design',
      description: 'Fully responsive Material-UI interface optimized for all devices',
      icon: <Speed />,
    },
    {
      title: 'Commodity Management',
      description: 'Create and manage agricultural commodities on the blockchain',
      icon: <Inventory />,
    },
    {
      title: 'Order Marketplace',
      description: 'Place and track buy/sell orders with real-time updates',
      icon: <ShoppingCart />,
    },
  ];

  const architectureHighlights = [
    {
      title: 'Decentralized Backend',
      description: 'Smart contracts on Ethereum handle all business logic',
      icon: <Language />,
    },
    {
      title: 'Account Abstraction',
      description: 'Simplified user experience with gasless transactions',
      icon: <AccountBalanceWallet />,
    },
    {
      title: 'GraphQL Integration',
      description: 'Efficient data fetching from The Graph protocol',
      icon: <Analytics />,
    },
  ];

  const projectDetails = {
    name: 'Market Ticker',
    description: 'A decentralized commodity trading platform built on Ethereum',
    version: '2.0',
    repository: 'https://github.com/market-ticker/market-ticker.github.io',
    demo: 'https://market-ticker.github.io',
    documentation: 'https://github.com/market-ticker/market-ticker.github.io/blob/main/README.md',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <TrendingUp sx={{ fontSize: 48, mr: 2, color: 'primary.main' }} />
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(125deg, #ff9c27 0%, #fd48ce 51.7%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Market Ticker
          </Typography>
        </Box>
        <Typography variant="h5" color="text.secondary" paragraph>
          Decentralized Commodity Trading Platform
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
          A modern blockchain-based platform for agricultural commodity trading, 
          built with React, TypeScript, and Ethereum smart contracts. 
          Experience seamless trading with wallet integration and real-time market data.
        </Typography>
      </Box>

      {/* Project Details Card */}
      <Card sx={{ mb: 6, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <CardContent sx={{ p: 4, color: 'white' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'white' }}>
            Project Overview
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'rgba(255,255,255,0.9)' }}>
            Market Ticker is a revolutionary decentralized platform that enables farmers, traders, 
            and buyers to interact directly in a transparent commodity marketplace. Built on Ethereum 
            blockchain technology, it eliminates intermediaries while ensuring trust and transparency 
            in agricultural trade.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="h6" sx={{ color: 'white' }}>Version</Typography>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>{projectDetails.version}</Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="h6" sx={{ color: 'white' }}>Platform</Typography>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>Web3</Typography>
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <Typography variant="h6" sx={{ color: 'white' }}>Network</Typography>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>Ethereum</Typography>
            </Paper>
          </Box>
        </CardContent>
      </Card>

      {/* Key Features */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Key Features
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Explore the powerful features that make Market Ticker a comprehensive solution for commodity trading.
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 4,
            mt: 3
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                  {feature.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Architecture Highlights */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Technical Architecture
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Built with modern web technologies and blockchain infrastructure for maximum performance and security.
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mt: 3
          }}>
            {architectureHighlights.map((item, index) => (
              <Box key={index} sx={{ textAlign: 'center' }}>
                <Avatar sx={{ 
                  bgcolor: 'secondary.main', 
                  width: 64, 
                  height: 64, 
                  mx: 'auto', 
                  mb: 2 
                }}>
                  {item.icon}
                </Avatar>
                <Typography variant="h6" component="h3" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Technology Stack
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Built with cutting-edge technologies for optimal performance and developer experience.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {technologies.map((tech, index) => (
              <Chip
                key={index}
                label={tech}
                variant="outlined"
                color="primary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Links and Resources */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Resources & Links
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 3,
            mt: 3
          }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                <GitHub sx={{ mr: 1, verticalAlign: 'middle' }} />
                Source Code
              </Typography>
              <Link 
                href={projectDetails.repository} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              >
                GitHub Repository
                <OpenInNew sx={{ ml: 1, fontSize: 16 }} />
              </Link>
            </Box>
            
            <Box>
              <Typography variant="h6" gutterBottom>
                <Language sx={{ mr: 1, verticalAlign: 'middle' }} />
                Live Demo
              </Typography>
              <Link 
                href={projectDetails.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              >
                market-ticker.github.io
                <OpenInNew sx={{ ml: 1, fontSize: 16 }} />
              </Link>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="body2" color="text.secondary" align="center">
            Built with ❤️ for the decentralized future of agriculture trading
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;