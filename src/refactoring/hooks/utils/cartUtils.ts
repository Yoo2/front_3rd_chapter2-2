import { CartItem, Coupon, Discount, Product } from "../../../types";

const callbackItemMaxDiscount =
  (quantity: number) => (maxDiscount: number, currentDiscount: Discount) => {
    const isMoreCartQuantity = quantity >= currentDiscount.quantity;
    const isCurrentBig = currentDiscount.rate > maxDiscount;
    return isMoreCartQuantity && isCurrentBig
      ? currentDiscount.rate
      : maxDiscount;
  };

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;
  const appliedDiscount = discounts.reduce(
    callbackItemMaxDiscount(quantity),
    0
  );
  return appliedDiscount;
};

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  const discount = getMaxApplicableDiscount(item);
  return price * quantity * (1 - discount);
};

const callbackTotalBeforeDiscount = (acc: number, item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  return acc + price * quantity;
};

const calculateTotalAfterDiscount = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalAfterDiscount = cart.reduce(
    (acc, cur) => acc + calculateItemTotal(cur),
    0
  );
  if (!selectedCoupon) return totalAfterDiscount;
  if (selectedCoupon.discountType === "amount") {
    return Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
  }
  return totalAfterDiscount * (1 - selectedCoupon.discountValue / 100);
};

export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  const totalBeforeDiscount = cart.reduce(callbackTotalBeforeDiscount, 0);
  const totalAfterDiscount = calculateTotalAfterDiscount(cart, selectedCoupon);
  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

const getUpdatedItemQuantity =
  (productId: string, newQuantity: number) => (item: CartItem) => {
    if (item.product.id !== productId) return item;
    const maxQuantity = item.product.stock;
    const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
    return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
  };

const isExistItem = (item: CartItem | null) => item !== null;

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart
    .map(getUpdatedItemQuantity(productId, newQuantity))
    .filter(isExistItem);
};

export const getMaxDiscount = (
  discounts: { quantity: number; rate: number }[]
) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const isEmptyStock = (product: Product, cart: CartItem[]) => {
  const remainingStock = getRemainingStock(product, cart);
  return remainingStock <= 0;
};

const getAddedItem = (product: Product) => (item: CartItem) => {
  if (item.product.id !== product.id) return item;
  return { ...item, quantity: Math.min(item.quantity + 1, product.stock) };
};

export const addCartItemToCart = (prevCart: CartItem[], product: Product) => {
  const existingItem = prevCart.find((item) => item.product.id === product.id);
  if (!existingItem) return [...prevCart, { product, quantity: 1 }];
  return prevCart.map(getAddedItem(product));
};

export const removeCartItemFromCart = (
  prevCart: CartItem[],
  productId: string
) => {
  return prevCart.filter((item) => item.product.id !== productId);
};
