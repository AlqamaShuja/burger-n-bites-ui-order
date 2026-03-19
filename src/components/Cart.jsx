import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

export default function Cart() {
  const { items, isCartOpen, setIsCartOpen, totalPrice, clearCart } = useCart();

  // Generate WhatsApp order message
  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const lines = [];
    lines.push('Order Details:');
    lines.push('');

    items.forEach((item) => {
      const unitPrice = item.discount
        ? Math.round(item.price - (item.price * item.discount) / 100)
        : Math.round(item.price);
      const itemTotal = unitPrice * item.quantity;
      lines.push(`- ${item.name} x ${item.quantity} = Rs ${itemTotal}`);
    });

    lines.push('');
    lines.push(`Total: Rs ${Math.round(totalPrice)}`);
    lines.push('');
    lines.push('Please confirm my order. Thank you!');

    const message = lines.join('\n');
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-black">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <FiShoppingBag className="text-black" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Your Cart</h2>
                  <p className="text-xs text-gray-400">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearCart}
                    className="w-10 h-10 rounded-full text-gray-400 hover:text-red-400 hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                    title="Clear cart"
                  >
                    <FiTrash2 size={18} />
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer text-white"
                >
                  <FiX size={20} />
                </motion.button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="popLayout">
                {items.length > 0 ? (
                  items.map((item) => <CartItem key={item.id} item={item} />)
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                  >
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiShoppingBag className="text-gray-300" size={40} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-400 mb-1">
                      Your cart is empty
                    </h3>
                    <p className="text-sm text-gray-300">
                      Add some delicious items to get started
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-t border-gray-100 p-5 space-y-4 bg-white"
              >
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Total</span>
                  <span className="text-2xl font-extrabold text-gray-900">
                    Rs {Math.round(totalPrice)}
                  </span>
                </div>

                {/* WhatsApp Order Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300 transition-shadow cursor-pointer"
                >
                  <FaWhatsapp size={22} />
                  Click to Place Order via WhatsApp
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
