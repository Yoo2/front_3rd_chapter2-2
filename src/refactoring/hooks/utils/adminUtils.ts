import { Discount, Product } from "../../../types";

export const getFoundProduct = (productId: string, products: Product[]) => {
  return products.find((p) => p.id === productId);
};

export const addDiscountToProduct = (
  product: Product,
  newDiscount: Discount
) => {
  return {
    ...product,
    discounts: [...product.discounts, newDiscount],
  };
};

export const removeDiscountFromProduct = (product: Product, index: number) => {
  return {
    ...product,
    discounts: product.discounts.filter((_, i) => i !== index),
  };
};
