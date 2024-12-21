# Company Dashboard

A real-time dashboard built with React and TypeScript that integrates with Linear and Google Sheets to provide comprehensive company metrics and KPIs.

![Dashboard Preview](https://github.com/aytch4k/strategic-dashboard/blob/main/demo/landing.png?auto=format&fit=crop&q=80&w=2426&h=600)

## Features

- 📊 Real-time metrics visualization
- 🔄 Integration with Linear for engineering metrics
- 📈 Google Sheets integration for company KPIs
- 🎯 Strategic initiatives tracking
- 📱 Responsive and customizable layout
- 🔒 Secure API handling
- ⚡ Built with Vite for optimal performance

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Linear SDK
- Chart.js
- Zustand for state management
- Google Sheets API

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- Linear API key
- Google Sheets API key
- Required Google Sheet IDs

## Environment Variables

Create a `.env` file in the root directory with:

```env
VITE_LINEAR_API_KEY=your_linear_api_key
VITE_GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
VITE_GOOGLE_SHEETS_ID=your_sheets_id
VITE_TIMELINE_SHEETS_ID=your_timeline_sheets_id
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/company-dashboard.git
cd company-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── features/        # Feature-specific components
├── hooks/           # Custom React hooks
├── services/        # API and external service integrations
├── store/           # Global state management
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## Configuration

### Refresh Rates

Data refresh intervals can be configured in `src/config/refreshRates.ts`:

```typescript
const DEFAULT_REFRESH_INTERVALS = {
  spreadsheet: 5 * 60 * 1000, // 5 minutes
  linear: 5 * 60 * 1000,      // 5 minutes
  health: 5 * 60 * 1000       // 5 minutes
};
```

To modify refresh rates at runtime:

```typescript
import { setRefreshInterval } from './config/refreshRates';
setRefreshInterval('spreadsheet', 10 * 60 * 1000); // 10 minutes
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
