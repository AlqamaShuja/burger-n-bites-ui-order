import { motion } from 'framer-motion';

export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
      {/* All category button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onSelect(null)}
        className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
          activeCategory === null
            ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        All
      </motion.button>

      {categories.map((category) => (
        <motion.button
          key={category.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(category.id)}
          className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
            activeCategory === category.id
              ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20'
              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}
