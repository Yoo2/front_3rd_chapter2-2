import { useState } from "react";
import { Product } from "../../../../types";
import useNewDiscount from "./hooks/useNewDiscount";
import { getFoundProduct } from "../../utils/adminUtils";

type EditingProductKey = "name" | "price";

export const useEditingProduct = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { newDiscount, addDiscount, removeDiscount, updateDiscountField } =
    useNewDiscount(editingProduct, setEditingProduct);

  const updateEditingProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const updateEditingProductField = <K extends EditingProductKey>(
    productId: string,
    key: K,
    value: Product[K]
  ) => {
    if (editingProduct?.id !== productId) return;
    const updatedProduct = { ...editingProduct, [key]: value };
    setEditingProduct(updatedProduct);
  };

  const updateProduct = (
    onProductUpdate: (updatedProduct: Product) => void
  ) => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const updateProductStock = (
    productId: string,
    newStock: number,
    products: Product[],
    onProductUpdate: (updatedProduct: Product) => void
  ) => {
    const updatedProduct = getFoundProduct(productId, products);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    updateEditingProductField,
    updateProductStock,
    removeDiscount,
    newDiscount,
    addDiscount,
    updateProduct,
    updateEditingProduct,
    updateDiscountField,
  };
};
