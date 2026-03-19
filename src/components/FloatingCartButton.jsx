import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

export default function FloatingCartButton() {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3.5 rounded-full shadow-2xl shadow-orange-300 flex items-center gap-3 sm:hidden cursor-pointer"
        >
          <div className="relative">
            <FiShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <span className="font-bold text-sm">
            Rs {Math.round(totalPrice)}
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
            View Cart
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
