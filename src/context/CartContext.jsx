import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user, token } = useAuth();
  
  // Use a ref to prevent infinite sync loops
  const isInitialLoad = useRef(true);

  // Initialize from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sagason_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // When user logs in or out
  useEffect(() => {
    const fetchCart = async () => {
      if (user && token) {
        try {
          const response = await fetch('http://localhost:5000/api/cart', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const dbCart = await response.json();
          
          // Merge local cart and DB cart. For simplicity, just combining them and then doing a full sync.
          // A better approach in production would be deduplicating by productId.
          const localCart = JSON.parse(localStorage.getItem('sagason_cart') || '[]');
          
          const mergedCart = [...dbCart];
          
          localCart.forEach(localItem => {
            const existingIndex = mergedCart.findIndex(i => i.product_id === localItem.product_id || i.productId === localItem.productId);
            if (existingIndex >= 0) {
              mergedCart[existingIndex].quantity += localItem.quantity;
            } else {
              mergedCart.push(localItem);
            }
          });

          // Normalize keys if needed (db uses snake_case sometimes, we use camelCase in frontend)
          const normalizedCart = mergedCart.map(item => ({
            productId: item.product_id || item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            customizations: item.customizations
          }));

          setCart(normalizedCart);
          isInitialLoad.current = false; // We loaded from DB
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      }
    };
    
    fetchCart();
  }, [user, token]);

  // Sync to local storage and backend whenever cart changes
  useEffect(() => {
    localStorage.setItem('sagason_cart', JSON.stringify(cart));
    
    if (user && token && !isInitialLoad.current) {
      const syncToDb = async () => {
        try {
          await fetch('http://localhost:5000/api/cart/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ items: cart })
          });
        } catch (error) {
          console.error("Failed to sync cart", error);
        }
      };
      // Debounce this in a real app
      syncToDb();
    }
    
    if (isInitialLoad.current) {
      // If we got here and we are loaded locally, mark it not initial so subsequent adds will sync
      isInitialLoad.current = false;
    }
  }, [cart, user, token]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.productId === product.productId);
      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += (product.quantity || 1);
        return newCart;
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isDrawerOpen,
      setIsDrawerOpen,
      cartTotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};
