## StatementDog Frontend

A modern stock analytics dashboard built with React, TypeScript, MUI, Vite, and Recharts. It visualizes monthly revenue and year-over-year growth, shows industry rankings, and supports a clean, mobile-friendly UI.

### Features
- **Interactive chart**: Monthly revenue (bar) and YoY growth (line) using Recharts
- **Tooltip**: Displays yyyymm monthly average price on hover
- **Industry rank boxes**: Group and display rankings by category (e.g., HPC, HBM)
- **Responsive layout**: MUI + CSS Modules for desktop and mobile
- **i18n-ready**: Language resources under `src/i18n/`

### Tech Stack
- **React 19** + **TypeScript**
- **Vite 6** for dev/build
- **MUI v7** for UI components
- **Recharts v3** for charts
- **ESLint + Prettier + Husky** for code quality

### Getting Started
1. Install dependencies
   - Yarn: `yarn`
   - npm: `npm install`
2. Start the dev server
   - `yarn dev`
   - Open `http://localhost:5173`
3. Build for production
   - `yarn build` (outputs to `dist/`)
4. Preview local production build
   - `yarn preview`

### Available Scripts
- **dev**: start Vite dev server
- **build**: type-check and bundle (`tsc -b && vite build`)
- **preview**: preview built app
- **lint**: run ESLint
- **deploy**: build and publish `dist/` with `gh-pages`

### Development Notes
- Project uses strict TypeScript and ESLint rules. Run `yarn lint` during development.
- Husky + lint-staged are configured to keep commits clean.
- UI code uses **CSS Modules** (e.g., `styles.module.css`) to scope styles.

### Data & API
- Demo data lives in `src/data/stockData.ts`.
  - The main chart reads from `monthlyOverviewData.monthly`:
    - `Revenue.data` → 每月營收 (bar)
    - `RevenueYOY.data` → 單月營收年增率 (line)
    - `Price.data` → Tooltip 顯示的月均價
- There is a dev proxy in `vite.config.ts` for `/api/stock-data` to avoid CORS during development.
  - To switch to live data, update `src/service/dataService.ts` and ensure the proxy/headers fit your backend setup.

### Project Structure
```
src/
  components/        # Reusable UI (Header, Footer, Loading, etc.)
  pages/
    StockComponent/  # Main dashboard + chart + table
    StockRank/       # Rank list boxes and styles
  data/              # Static mock data (monthlyOverviewData, etc.)
  service/           # API services (auth, data, ai)
  utils/             # Helpers (api client, string utils)
  i18n/              # Translations
```

### Deployment
- GitHub Pages: run `yarn deploy` (uses the `homepage` in `package.json`).
- Any static host: serve the `dist/` folder after `yarn build`.

### Troubleshooting
- **CORS**: Use the Vite proxy (`/api/stock-data`) in dev to inject CORS headers. Don’t call third-party APIs directly from the browser without proper CORS support.
- **Chart not updating**: Confirm the data shape in `monthlyOverviewData` matches the chart mapper in `src/pages/StockComponent/index.tsx`.

### License
This project is provided as-is for educational/demo purposes.

