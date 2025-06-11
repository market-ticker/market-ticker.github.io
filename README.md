# Market Ticker - Modern React TypeScript Starter

A modern, fully-typed React application for commodity market tracking built with TypeScript, Material-UI, and React Router.

## 🚀 Features

- **Modern Stack**: React 18, TypeScript, Material-UI (MUI), React Router, Vite
- **Responsive Design**: Mobile-first design with MUI's responsive grid system
- **Type Safety**: Fully typed with TypeScript interfaces and proper type checking
- **Routing**: Multi-page navigation with React Router (Home, Ticker List, About)
- **Mock Data**: Complete ticker data with mock commodity information
- **Interactive UI**: Modal dialogs, filtering, sorting, and search functionality
- **Theme Customization**: Custom MUI theme with gradient styling
- **Component Architecture**: Reusable, well-structured components
- **Wallet Integration**: Web3 wallet connectivity (legacy feature preserved)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Footer.tsx      # Site footer with links
│   ├── MuiNavbar.tsx   # Navigation bar with routing
│   ├── TickerModal.tsx # Modal for ticker details
│   └── ...            # Legacy components
├── pages/              # Route page components
│   ├── Home.tsx        # Landing page
│   ├── TickerList.tsx  # Ticker list with filtering
│   ├── About.tsx       # About page
│   └── index.ts        # Page exports
├── types/              # TypeScript type definitions
│   ├── ticker.ts       # Ticker/commodity types
│   └── index.ts        # Type exports
├── data/               # Mock data and utilities
│   └── mockTickers.ts  # Mock ticker data
├── theme.ts            # MUI theme configuration
├── App.tsx            # Main app with routing
└── main.tsx           # App entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/market-ticker/market-ticker.github.io.git
cd market-ticker.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Theme Customization

Edit `src/theme.ts` to customize the Material-UI theme:

```typescript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9c27', // Custom orange
      dark: '#fd48ce', // Custom pink
    },
    // ... more theme options
  },
});
```

### Adding New Routes

1. Create a new page component in `src/pages/`
2. Add the route to `src/App.tsx`:

```typescript
<Routes>
  <Route path="/new-page" element={<NewPage />} />
  // ... existing routes
</Routes>
```

3. Update navigation in `src/components/MuiNavbar.tsx`

## 📊 Mock Data

The application includes comprehensive mock data for tickers/commodities:

- **Ticker Types**: Metals, Energy, Agriculture, Livestock
- **Price Data**: Current prices, change percentages, volume
- **Historical Data**: 30-day price history
- **News**: Mock news articles for each ticker
- **Fundamentals**: 52-week highs/lows, beta, volume

Edit `src/data/mockTickers.ts` to modify the mock data.

## 🌐 API Integration

The application is designed to easily integrate with real APIs:

1. **Replace Mock Data**: Update `src/data/mockTickers.ts` with API calls
2. **Add API Service**: Create `src/services/api.ts` for API communication
3. **State Management**: Consider adding Redux or Zustand for complex state
4. **Real-time Data**: Implement WebSocket connections for live updates

### Recommended APIs

- **Alpha Vantage**: Commodity and financial data
- **Yahoo Finance**: Market data
- **Quandl**: Economic and financial data
- **IEX Cloud**: Real-time market data

## 🔒 Security & Performance

- **Type Safety**: Full TypeScript coverage prevents runtime errors
- **Code Splitting**: Vite automatically optimizes bundle splitting
- **Tree Shaking**: Unused code is automatically removed
- **Modern Build**: ES modules and modern JavaScript features
- **Security Headers**: Add security headers in production deployment

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The `dist/` folder contains the production build.

### Deployment Options

- **GitHub Pages**: Already configured for `docs/` folder deployment
- **Netlify**: Drag and drop the `dist/` folder
- **Vercel**: Connect GitHub repository for automatic deployments
- **S3 + CloudFront**: For enterprise-scale deployments

## 🔄 Legacy Support

The application preserves existing wallet functionality:

- Access legacy components at `/legacy` route
- Original wallet context and components remain intact
- Gradual migration path from old to new UI

## 🛣️ Next Steps

### Immediate Enhancements

- [ ] Integrate real commodity data APIs
- [ ] Add user authentication and portfolios
- [ ] Implement advanced charting (Chart.js, D3.js)
- [ ] Add real-time WebSocket data connections
- [ ] Create mobile app with React Native

### Advanced Features

- [ ] Price alerts and notifications
- [ ] Social features and market sentiment
- [ ] Advanced technical analysis tools
- [ ] Machine learning price predictions
- [ ] Multi-language support (i18n)

### Development Improvements

- [ ] Add comprehensive test suite (Jest, React Testing Library)
- [ ] Set up CI/CD pipeline (GitHub Actions)
- [ ] Add Storybook for component documentation
- [ ] Implement error boundary components
- [ ] Add performance monitoring (Sentry, LogRocket)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for additional documentation
- **Issues**: Open an issue on GitHub for bug reports
- **Discussions**: Use GitHub Discussions for questions and ideas

---

Built with ❤️ using React, TypeScript, and Material-UI