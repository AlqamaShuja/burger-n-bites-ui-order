import { motion } from 'framer-motion';

export default function HeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl sm:rounded-3xl overflow-hidden mx-4 sm:mx-0 mb-6 sm:mb-8"
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
      <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full" />

      <div className="relative px-6 sm:px-10 py-8 sm:py-12 text-white">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-orange-100 text-sm font-medium mb-2 tracking-wider uppercase"
        >
          Welcome to
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-5xl font-extrabold mb-3 leading-tight"
        >
          Burger & Bites
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-orange-100 text-sm sm:text-base max-w-sm leading-relaxed"
        >
          Discover our delicious menu and order your favorites with just a tap.
          Fresh, fast, and flavorful!
        </motion.p>
      </div>
    </motion.div>
  );
}
