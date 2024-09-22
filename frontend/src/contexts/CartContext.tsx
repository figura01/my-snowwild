import { CART_STORAGE_KEY } from "@/constants";
import {
  GetFromLocalStorage,
  SetToLocalStorage,
} from "@/hooks/useLocalStorage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Material {
  id: string;
  name: string;
  description: string;
  picture: string;
  price: number;
}

export interface CartItem extends Material {
  quantity: number;
  selectedSize: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Material, selectedSize: string) => void;
  removeFromCart: (id: string, selectedSize: string) => void;
  updateQuantity: (id: string, selectedSize: string, quantity: number) => void;
  getItemCount: () => number;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    GetFromLocalStorage(CART_STORAGE_KEY);
  }, []);

  useEffect(() => {
    SetToLocalStorage(CART_STORAGE_KEY, cart);
  }, [cart]);

  const addToCart = (item: Material, selectedSize: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === selectedSize
      );
      if (existingItem) {
        // Si l'article existe avec la même taille, mettre à jour la quantité
        return prevCart.map((cartItem) =>
          cartItem.id === item.id && cartItem.selectedSize === selectedSize
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Ajouter un nouvel article avec la taille sélectionnée
        return [...prevCart, { ...item, quantity: 1, selectedSize }];
      }
    });
  };

  const removeFromCart = (id: string, selectedSize: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (
    id: string,
    selectedSize: string,
    quantity: number
  ) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  // utilisation d'un compteur pour le panier
  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        getItemCount,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
