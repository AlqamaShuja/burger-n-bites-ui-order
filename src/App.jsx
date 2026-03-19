import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import ProductSkeleton from './components/ProductSkeleton';
import Cart from './components/Cart';
import FloatingCartButton from './components/FloatingCartButton';
import { useProducts } from './hooks/useProducts';

function App() {
  const { products, categories, loading, error } = useProducts();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    let result = products;

    if (activeCategory) {
      result = result.filter((p) => p.category?.id === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query) ||
          p.category?.name.toLowerCase().includes(query)
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Cart />
      <FloatingCartButton />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <HeroBanner />

        {/* Search Bar */}
        <div className="mb-4 sm:mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Category Filter */}
        <div className="mb-5 sm:mb-8">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2.5 sm:mb-4 px-1">
            Browse Menu
          </h3>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">!</span>
            </div>
            <p className="text-red-500 font-medium mb-2">
              Failed to load menu
            </p>
            <p className="text-gray-400 text-sm">{error}</p>
          </motion.div>
        )}

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && !error && filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-gray-500 text-base font-medium mb-1">
              No dishes found
            </p>
            <p className="text-gray-400 text-sm">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : 'No products found in this category'}
            </p>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-xs sm:text-sm border-t border-gray-800 bg-black mt-8">
        <p>Burger & Bites &mdash; Made with <span className="text-yellow-400">love</span></p>
      </footer>
    </div>
  );
}

export default App;
