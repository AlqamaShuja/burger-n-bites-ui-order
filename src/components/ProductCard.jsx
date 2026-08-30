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
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col group border border-gray-100"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.imageUrl || PLACEHOLDER_IMG}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            // Broken/deleted image URL → fall back to the placeholder
            if (e.currentTarget.src !== PLACEHOLDER_IMG) {
              e.currentTarget.src = PLACEHOLDER_IMG;
            }
          }}
        />

        {/* Discount badge */}
        {product.discount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg"
          >
            -{product.discount}%
          </motion.div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {product.category?.name}
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
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
                  className="flex items-center gap-1 bg-gray-900 rounded-full px-1 py-1"
                >
                  <button
                    onClick={() =>
                      cartItem.quantity === 1
                        ? removeFromCart(product.id, product.name)
                        : updateQuantity(product.id, cartItem.quantity - 1)
                    }
                    className="w-8 h-8 rounded-full bg-gray-700 text-yellow-400 flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span className="w-8 text-center font-bold text-white text-sm">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center hover:bg-yellow-300 transition-colors cursor-pointer"
                  >
                    <FiPlus size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => addToCart(product)}
                  className="w-11 h-11 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 hover:shadow-xl transition-all cursor-pointer"
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
