import { createContext, useContext, useState, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // Ref to read current items without triggering re-renders
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const addToCart = useCallback((product) => {
    const existing = itemsRef.current.find((item) => item.id === product.id);
    if (existing) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.success(`Updated ${product.name} quantity`);
    } else {
      setItems((prev) => [...prev, { ...product, quantity: 1 }]);
      toast.success(`${product.name} added to cart`);
    }
  }, []);

  const removeFromCart = useCallback((productId, productName) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
    toast.error(`${productName} removed from cart`);
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    toast.success('Cart cleared');
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const discountedPrice = item.discount
      ? item.price - (item.price * item.discount) / 100
      : item.price;
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
