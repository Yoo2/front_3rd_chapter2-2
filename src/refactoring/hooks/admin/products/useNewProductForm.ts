import { useState } from "react";

export const useNewProductForm = () => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const toggleNewProductForm = () => {
    setShowNewProductForm(!showNewProductForm);
  };

  const closeNewProductForm = () => {
    setShowNewProductForm(false);
  };

  return {
    showNewProductForm,
    toggleNewProductForm,
    closeNewProductForm,
  };
};
