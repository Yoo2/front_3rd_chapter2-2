// useCart.ts
import { useState } from "react";
import { CartItem, Product } from "../../../types";
import {
  calculateCartTotal,
  addCartItemToCart,
  isEmptyStock,
  updateCartItemQuantity,
  removeCartItemFromCart,
} from "../utils/cartUtils";
import useSelectedCoupon from "./useSelectedCoupon";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { selectedCoupon, applyCoupon } = useSelectedCoupon();

  const addToCart = (product: Product) => {
    if (isEmptyStock(product, cart)) return;
    setCart((prevCart) => addCartItemToCart(prevCart, product));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => removeCartItemFromCart(prevCart, productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity)
    );
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
