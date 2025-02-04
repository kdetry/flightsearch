# Google Flights Clone

A modern flight search application built with React, TypeScript, and Material-UI that mimics the functionality of Google Flights. This project demonstrates the implementation of a performant flight search interface with real-time filtering capabilities.

## 🚀 Features

- **Advanced Flight Search**
  - Origin and destination airport selection with autocomplete
  - Date selection for departure and return flights
  - Passenger count and seat type selection
  - Trip type selection (One-way/Round-trip)

- **Search Results**
  - Real-time flight filtering
  - Price range slider
  - Airline filters
  - Stop count filters (Direct, 1 Stop, 2+ Stops)
  - Detailed flight information display
  - Responsive design for all devices

## 🛠 Tech Stack

- **Core**
  - React 18
  - TypeScript
  - Vite (Build tool)

- **State Management**
  - Jotai (Atomic state management)

- **UI Components**
  - Material-UI (MUI) v5
  - MUI X Date Pickers
  - date-fns (Date manipulation)

- **Development Tools**
  - ESLint
  - TypeScript ESLint
  - SWC (Fast compilation)

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── FlightCard.tsx   # Flight details card
│   ├── SearchFilters.tsx # Search filtering component
│   └── ...
├── pages/               # Page components
│   └── SearchResultsPage.tsx
├── store/               # State management
│   ├── atoms.ts         # Jotai atoms
│   └── flightsAtom.ts   # Flight-related state
└── services/            # API and external services
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd google-flights-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_base_url
```

### ESLint Configuration
The project uses a comprehensive ESLint setup with TypeScript support. To modify the configuration, update `eslint.config.js`:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 🎯 Performance Optimizations

- React.memo for component memoization
- useCallback for event handler memoization
- useMemo for expensive computations
- Atomic state management with Jotai
- Code splitting and lazy loading
- Optimized bundle size with Vite

## 🧪 Component Architecture

### FlightCard
- Memoized component for displaying flight details
- Handles single flight itinerary display
- Optimized for re-renders

### SearchFilters
- Memoized filter controls
- Real-time filter updates
- Efficient state management

### SearchResultsPage
- Main container component
- Manages filter state
- Handles flight data filtering
- Responsive layout

## 📱 Responsive Design

The application is fully responsive and works across all device sizes:
- Desktop (> 1024px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔄 State Management

Using Jotai for atomic state management:
- `flightSearchAtom`: Search parameters
- `flightsAtom`: Flight search results
- Filter state: Local component state with React.useState

## 🛣️ Future Improvements

- [ ] Add flight booking functionality
- [ ] Implement user authentication
- [ ] Add price alerts
- [ ] Implement flight tracking
- [ ] Add multi-city search
- [ ] Implement price graphs
- [ ] Add seat selection

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🤝 Support

For support, email [your-email@example.com](mailto:your-email@example.com) or open an issue in the repository.
