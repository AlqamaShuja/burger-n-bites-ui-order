import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const discountedPrice = item.discount
    ? item.price - (item.price * item.discount) / 100
    : item.price;

  const itemTotal = Math.round(discountedPrice * item.quantity);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 bg-gray-50 rounded-xl p-3 mb-3"
    >
      {/* Image */}
      <img
        src={item.imageUrl || PLACEHOLDER_IMG}
        alt={item.name}
        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl flex-shrink-0"
        onError={(e) => {
          // Broken/deleted image URL → fall back to the placeholder
          if (e.currentTarget.src !== PLACEHOLDER_IMG) {
            e.currentTarget.src = PLACEHOLDER_IMG;
          }
        }}
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="font-semibold text-gray-900 text-sm truncate">
            {item.name}
          </h4>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => removeFromCart(item.id, item.name)}
            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 cursor-pointer"
          >
            <FiTrash2 size={16} />
          </motion.button>
        </div>

        <p className="text-yellow-600 font-bold text-sm mt-0.5">
          Rs {Math.round(discountedPrice)}
        </p>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity controls */}
          <div className="flex items-center gap-1 bg-black rounded-full px-1 py-0.5">
            <button
              onClick={() =>
                item.quantity === 1
                  ? removeFromCart(item.id, item.name)
                  : updateQuantity(item.id, item.quantity - 1)
              }
              className="w-7 h-7 rounded-full text-yellow-400 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            >
              <FiMinus size={12} />
            </button>
            <span className="w-6 text-center font-bold text-white text-xs">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 rounded-full text-black bg-yellow-400 flex items-center justify-center hover:bg-yellow-300 transition-colors cursor-pointer"
            >
              <FiPlus size={12} />
            </button>
          </div>

          {/* Item total */}
          <span className="font-bold text-gray-900 text-sm">
            Rs {itemTotal}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
