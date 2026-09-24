import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextType {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  addToCart: (qty?: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  discountApplied: boolean;
  setDiscountApplied: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantity, setQuantity] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  const addToCart = (qty = 1) => {
    setQuantity((prev) => (prev > 0 ? prev + qty : qty));
  };

  return (
    <CartContext.Provider value={{
      quantity, setQuantity,
      addToCart,
      isCartOpen, setIsCartOpen,
      isCheckoutOpen, setIsCheckoutOpen,
      discountApplied, setDiscountApplied
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}