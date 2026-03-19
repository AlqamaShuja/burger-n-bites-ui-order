import { motion } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 sm:gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <span className="text-white text-lg sm:text-xl font-bold">T</span>
            </div>
            <div className="text-left">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                Burger & Bites
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium tracking-wide">
                FRESH & DELICIOUS
              </p>
            </div>
          </motion.div>

          {/* Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-semibold text-sm shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-shadow cursor-pointer"
          >
            <FiShoppingCart className="text-lg" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 border-orange-500"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
