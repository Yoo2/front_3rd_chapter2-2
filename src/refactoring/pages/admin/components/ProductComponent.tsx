import { Product } from "../../../../types";
import { useProductAccordion } from "../../../hooks";
import EditingProductComponent from "./EditingProductComponent";

interface Props {
  product: Product;
  index: number;
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
}

const ProductComponent = ({
  product,
  index,
  products,
  onProductUpdate,
}: Props) => {
  const { openProductIds, toggleProductAccordion } = useProductAccordion();

  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      <EditingProductComponent
        openProductIds={openProductIds}
        products={products}
        product={product}
        onProductUpdate={onProductUpdate}
      />
    </div>
  );
};

export default ProductComponent;
