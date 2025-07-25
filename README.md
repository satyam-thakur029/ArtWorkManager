# ArtworkManager - React TypeScript Application

A modern React TypeScript application built with Vite that displays artwork data from the Art Institute of Chicago API using PrimeReact DataTable with server-side pagination and persistent row selection.

## 🚀 Features

- **Server-side Pagination**: Efficient data loading with API calls for each page
- **Persistent Row Selection**: Selected/deselected rows persist across page changes
- **Loading States**: Smooth loading indicators during data fetching
- **Responsive Design**: Mobile-friendly PrimeReact DataTable
- **TypeScript**: Full type safety and better development experience
- **Custom Selection Panel**: Advanced row selection management

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **PrimeReact** for UI components
- **Art Institute of Chicago API** for artwork data

## 📋 Components

### Core Components

1. **ArtworkManager** - Main component managing the artwork table
2. **DataTable** - PrimeReact table with server-side pagination
3. **Loading** - Loading spinner component
4. **Pagination** - Custom pagination controls

### Key Features Implemented

- ✅ Server-side pagination (no client-side data storage)
- ✅ Persistent row selection across pages
- ✅ Loading states during API calls
- ✅ Custom row selection panel
- ✅ TypeScript interfaces for type safety

## 🎯 API Integration

**Base URL**: `https://api.artic.edu/api/v1/artworks`

**Fields Displayed**:
- `title` - Artwork title
- `place_of_origin` - Origin location
- `artist_display` - Artist information
- `inscriptions` - Artwork inscriptions
- `date_start` - Start date
- `date_end` - End date

## 🚦 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd artwork-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
artwork-manager/
├── src/
│   ├── components/
│   │   ├── ArtworkManager.tsx
│   │   ├── Loading.tsx
│   │   └── DataTable.tsx
|   |   ├── Paginator.tsx 
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Key Implementation Details

### Server-Side Pagination
- Each page change triggers a new API call
- No client-side storage of all fetched data
- Prevents memory issues with large datasets

### Persistent Row Selection
```typescript
// Selection state management
const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
const [pageSelections, setPageSelections] = useState<Map<number, Set<number>>>(new Map());
```

### Loading States
- Loading spinner during initial data fetch
- Loading indicators during page changes
- Proper error handling for failed API calls

### TypeScript Interfaces
```typescript
interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}
```

## 📊 Performance Optimizations

1. **Lazy Loading**: Data fetched only when needed
2. **Memory Efficient**: No accumulation of all page data
3. **Optimized Re-renders**: Proper use of React hooks
4. **Efficient State Management**: Minimal state updates

## ✅ Pre-Submission Checklist

- [x] **No accumulation of all fetched data** - Each page calls API independently
- [x] **Server-side pagination** - API called for each page visit
- [x] **Persistent row selection** - Selections maintained across page changes
- [x] **TypeScript implementation** - Full type safety
- [x] **Vite build tool** - Fast development and building
- [x] **PrimeReact DataTable** - Proper component implementation

## 🚀 Deployment

### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'dist' folder to Netlify
```

### Cloudflare Pages
```bash
# Build command: npm run build
# Build output directory: dist
```

## 🐛 Troubleshooting

### Common Issues

1. **API Rate Limiting**
   - The API may have rate limits
   - Implement proper error handling

2. **Missing Data Fields**
   - Some artworks may have null/undefined fields
   - Handle gracefully with fallback values

3. **Pagination Issues**
   - Ensure API calls are made for each page
   - Verify page parameter is correctly passed

## 📝 Development Notes

### Important Constraints
- **No Vercel deployment** (use Netlify, Cloudflare, etc.)
- **Must use TypeScript** (JavaScript not accepted)
- **Must use Vite** (other build tools not accepted)
- **Server-side pagination required** (client-side not acceptable)

### Code Quality
- Follow TypeScript best practices
- Implement proper error boundaries
- Use meaningful variable names
- Add proper type annotations

## 🔗 Links

- **Live Demo**: [Your deployed URL here]
- **GitHub Repository**: [Your repository URL here]
- **API Documentation**: https://api.artic.edu/docs/
- **PrimeReact DataTable**: https://primereact.org/datatable/

## 📞 Support

For any questions or issues, please refer to:
1. The video explanation provided
2. PrimeReact documentation
3. Art Institute of Chicago API docs

## 📄 License

This project is created as part of a technical assignment.

---

**⚠️ Important**: This application implements server-side pagination and persistent row selection as per requirements. No client-side storage of all data is implemented to prevent memory issues.