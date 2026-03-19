import { motion } from 'framer-motion';
import { FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const PLACEHOLDER_IMG =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';

export default function ProductCard({ product, index }) {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find((item) => item.id === product.id);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const isOutOfStock = !product.isAvailable || product.stockQuantity <= 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.imageUrl || PLACEHOLDER_IMG}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount badge */}
        {product.discount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg"
          >
            -{product.discount}%
          </motion.div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">
          {product.category?.name}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-bold px-4 py-2 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-tight mb-1">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2">
          {/* Price */}
          <div>
            <span className="text-xl sm:text-2xl font-extrabold text-gray-900">
              Rs {Math.round(discountedPrice)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through ml-2">
                Rs {product.price}
              </span>
            )}
          </div>

          {/* Add to cart / quantity controls */}
          {!isOutOfStock && (
            <div className="flex items-center">
              {cartItem ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-orange-50 rounded-full px-1 py-1"
                >
                  <button
                    onClick={() =>
                      cartItem.quantity === 1
                        ? removeFromCart(product.id, product.name)
                        : updateQuantity(product.id, cartItem.quantity - 1)
                    }
                    className="w-8 h-8 rounded-full bg-white text-orange-500 flex items-center justify-center shadow-sm hover:bg-orange-100 transition-colors cursor-pointer"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900 text-sm">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <FiPlus size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(product)}
                  className="w-11 h-11 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shadow-lg shadow-orange-200 hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <FiShoppingBag size={18} />
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
