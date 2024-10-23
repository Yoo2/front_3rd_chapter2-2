import { useState } from "react";
import { Product } from "../../../../types";
import useNewDiscount from "./hooks/useNewDiscount";

export const useEditingProduct = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { newDiscount, addDiscount, removeDiscount, updateDiscountField } =
    useNewDiscount(editingProduct, setEditingProduct);

  const updateEditingProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const updateEditingProductName = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };

  const updateEditingProductPrice = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
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
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    updateEditingProductName,
    updateEditingProductPrice,
    updateProductStock,
    removeDiscount,
    newDiscount,
    addDiscount,
    updateProduct,
    updateEditingProduct,
    updateDiscountField,
  };
};
