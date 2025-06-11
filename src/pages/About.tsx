import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  TrendingUp,
  Analytics,
  Speed,
} from '@mui/icons-material';

const About: React.FC = () => {
  const technologies = [
    'React 18',
    'TypeScript',
    'Material-UI',
    'React Router',
    'Vite',
    'ESLint',
    'Modern CSS',
  ];

  const features = [
    {
      title: 'Real-time Market Data',
      description: 'Live commodity price tracking with sub-second updates',
    },
    {
      title: 'Advanced Analytics',
      description: 'Comprehensive charts and technical analysis tools',
    },
    {
      title: 'RESTful API Ready',
      description: 'Built with API integration in mind for real data sources',
    },
    {
      title: 'Responsive Design',
      description: 'Optimized for desktop, tablet, and mobile devices',
    },
    {
      title: 'TypeScript First',
      description: 'Fully typed codebase for better development experience',
    },
    {
      title: 'Modern Architecture',
      description: 'Component-based architecture with reusable modules',
    },
  ];

  const nextSteps = [
    'Integrate with real commodity data APIs (Alpha Vantage, Yahoo Finance, etc.)',
    'Add user authentication and portfolio management',
    'Implement advanced charting with technical indicators',
    'Add real-time WebSocket connections for live data',
    'Build mobile application using React Native',
    'Implement price alerts and notifications',
    'Add social features and market sentiment analysis',
    'Create admin dashboard for content management',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Market Ticker
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A modern, TypeScript-based React application for commodity market tracking
        </Typography>
      </Box>

      {/* Project Overview */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Project Overview
          </Typography>
          <Typography variant="body1" paragraph>
            Market Ticker is a comprehensive commodity market tracking platform built with modern
            web technologies. This starter project provides a solid foundation for building
            a full-featured trading and market analysis application.
          </Typography>
          <Typography variant="body1" paragraph>
            The application demonstrates best practices in React development, including component
            composition, state management, TypeScript integration, and responsive design principles.
            It's designed to be easily extensible and maintainable.
          </Typography>
        </CardContent>
      </Card>

      {/* Technology Stack */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Technology Stack
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            Built using cutting-edge technologies for optimal performance and developer experience:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {technologies.map((tech) => (
              <Chip
                key={tech}
                label={tech}
                variant="outlined"
                color="primary"
                sx={{ mb: 1 }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Features */}
      <Card sx={{ mb: 6 }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Key Features
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            mt: 2
          }}>
            {features.map((feature, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  <CheckCircle fontSize="small" />
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
            Architecture Highlights
          </Typography>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            mt: 2
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                Component-Based
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modular components with clear separation of concerns
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Analytics sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                TypeScript First
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fully typed for better development experience and fewer bugs
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Speed sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" component="h3" gutterBottom>
                Performance Optimized
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Built with Vite for fast development and optimized builds
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Next Steps for Development
          </Typography>
          <Typography variant="body1" paragraph>
            This starter provides a solid foundation. Here are recommended next steps for
            building a production-ready application:
          </Typography>
          <List>
            {nextSteps.map((step, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={step} />
                </ListItem>
                {index < nextSteps.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;