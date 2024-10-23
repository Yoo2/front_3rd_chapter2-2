import { useState } from "react";
import { Discount, Product } from "../../../../../types";
import {
  addDiscountToProduct,
  getFoundProduct,
  removeDiscountFromProduct,
} from "../../../utils/adminUtils";

type DiscountKey = "quantity" | "rate";
const defaultDiscount = () => ({
  quantity: 0,
  rate: 0,
});

const useNewDiscount = (
  editingProduct: Product | null,
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>
) => {
  const [newDiscount, setNewDiscount] = useState<Discount>(defaultDiscount());

  const addDiscount = (
    productId: string,
    products: Product[],
    onProductUpdate: (updatedProduct: Product) => void
  ) => {
    const updatedProduct = getFoundProduct(productId, products);
    if (!updatedProduct || !editingProduct) return;
    const newProduct = addDiscountToProduct(updatedProduct, newDiscount);
    onProductUpdate(newProduct);
    setEditingProduct(newProduct);
    setNewDiscount(defaultDiscount());
  };

  const removeDiscount = (
    productId: string,
    index: number,
    products: Product[],
    onProductUpdate: (updatedProduct: Product) => void
  ) => {
    const updatedProduct = getFoundProduct(productId, products);
    if (!updatedProduct) return;
    const newProduct = removeDiscountFromProduct(updatedProduct, index);
    onProductUpdate(newProduct);
    setEditingProduct(newProduct);
  };

  const updateDiscountField = <K extends DiscountKey>(
    key: K,
    value: Discount[K]
  ) => {
    setNewDiscount({ ...newDiscount, [key]: value });
  };

  return {
    newDiscount,
    addDiscount,
    removeDiscount,
    updateDiscountField,
  };
};

export default useNewDiscount;
