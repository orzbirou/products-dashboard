# 🛍️ Products Dashboard

A modern Angular e-commerce dashboard featuring product browsing, search, filtering, and shopping cart functionality. Built with Angular 18's latest features including standalone components and signals for reactive state management.

## ✨ Features

### 🛒 Shopping Experience
- **Product Grid**: Beautiful responsive grid layout with product cards
- **Smart Search**: Search products by name or barcode instantly
- **Category Filtering**: Filter products by categories with scrollable tabs
- **Shopping Cart**: Add items to cart with real-time total calculation
- **Responsive Design**: Works perfectly on desktop and mobile devices

### 🚀 Modern Angular Features
- **Standalone Components**: No NgModule boilerplate needed
- **Angular Signals**: Reactive state management with `signal()`, `computed()`, and `effect()`
- **New Inject Function**: Modern dependency injection with `inject()`
- **TypeScript**: Fully typed for better development experience

### 🎨 Design & UX
- **Light Theme**: Clean, modern light theme with glassmorphism effects
- **SCSS Design Tokens**: Consistent styling with CSS custom properties
- **Smooth Animations**: Backdrop blur and hover effects
- **Professional UI**: Card-based layout with proper spacing and typography

## 🛠️ Tech Stack

- **Angular 18.2.0** - Latest Angular with standalone components
- **TypeScript** - Type-safe development
- **SCSS** - Advanced CSS with design tokens
- **RxJS** - Reactive programming for HTTP requests
- **Jasmine + Karma** - Unit testing (54 tests included)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation & Running
```bash
# Clone the repository
git clone [your-repo-url]
cd products-dashboard

# Install dependencies
npm install

# Start development server
npm start

# Open your browser
# Navigate to http://localhost:4200
```

### Available Scripts
```bash
npm start          # Start development server
npm test           # Run unit tests
npm run build      # Build for production
npm run lint       # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/              # Main product grid and filtering
│   │   ├── product-card/           # Individual product display
│   │   └── shopping-basket/        # Shopping cart sidebar
│   ├── services/
│   │   ├── product.service.ts      # Data loading from JSON files
│   │   └── cart.service.ts         # Shopping cart management
│   ├── models/
│   │   ├── product.ts              # Product data interface
│   │   └── category.ts             # Category data interface
│   └── styles/
│       └── _tokens.scss            # Design system tokens
├── assets/
│   ├── products.json               # Product data
│   └── categories.json             # Category data
└── styles.scss                     # Global styles and theme variables
```

## 🔧 Key Features Explained

### Angular Signals State Management
```typescript
// Reactive state that automatically updates the UI
const products = signal<Product[]>([]);
const searchQuery = signal('');

// Computed values that update automatically
const filteredProducts = computed(() => {
  return products().filter(p => 
    p.name.toLowerCase().includes(searchQuery().toLowerCase())
  );
});
```

### Shopping Cart Service
```typescript
// Add items to cart with automatic quantity management
addToCart(product: Product) {
  // Increases quantity if item exists, adds new item otherwise
}

// Automatic total calculation
totalPrice = computed(() => 
  this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
);
```

### Product Filtering System
- **Text Search**: Search by product name or barcode
- **Category Filter**: Filter by product categories
- **Real-time Updates**: Results update instantly as you type
- **Category Tabs**: Scrollable category selection with smooth animations

## 🎨 Design System

### CSS Custom Properties
The app uses a comprehensive design token system:
```scss
:root {
  --surface: #f8fafc;           # Background colors
  --surface-2: rgba(255, 255, 255, 0.9);
  --primary: #6366f1;           # Brand colors
  --on-surface: #1e293b;       # Text colors
  // ... more tokens
}
```

### Modern CSS Features
- **Backdrop Filter**: Glassmorphism effects for modern UI
- **CSS Grid**: Responsive product layout
- **Custom Properties**: Consistent theming throughout
- **Smooth Transitions**: Enhanced user experience

## 🧪 Testing

The project includes comprehensive unit tests:
```bash
npm test                    # Run all 54 tests
npm test -- --watch        # Run tests in watch mode
npm test -- --coverage     # Generate coverage report
```

**Test Coverage**: 54 passing tests covering:
- Component functionality
- Service logic
- User interactions
- Data filtering and search

## 🚀 Production Build

```bash
npm run build              # Creates optimized production build
npm run build -- --aot     # Ahead-of-time compilation
```

Build outputs to `dist/` directory with:
- Minified JavaScript bundles
- Optimized CSS
- Compressed assets
- Source maps for debugging

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Modern CSS features for beautiful UI effects
- TypeScript for type safety and developer experience
