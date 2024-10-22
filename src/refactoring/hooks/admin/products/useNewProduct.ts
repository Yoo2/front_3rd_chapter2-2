import { useState } from "react";
import { Product } from "../../../../types";

type ProductKey = "name" | "price" | "stock";

export const useNewProduct = () => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const addNewProduct = (onProductAdd: (newProduct: Product) => void) => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
  };

  const updateNewProductField = <K extends ProductKey>(
    key: K,
    value: Product[K]
  ) => {
    setNewProduct({ ...newProduct, [key]: value });
  };

  return {
    newProduct,
    addNewProduct,
    updateNewProductField,
  };
};
