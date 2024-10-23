import { Product } from "../../../../types";
import { useEditingProduct } from "../../../hooks";
import {
  convertToPercent,
  convertToPercentage,
} from "../../../utils/calculationUtils";
import { formatDiscountInfo } from "../../../utils/formatUtils";

interface Props {
  openProductIds: Set<string>;
  products: Product[];
  product: Product;
  onProductUpdate: (updatedProduct: Product) => void;
}

const EditingProductComponent = ({
  openProductIds,
  products,
  product,
  onProductUpdate,
}: Props) => {
  const {
    editingProduct,
    updateEditingProductField,
    updateProductStock,
    removeDiscount,
    newDiscount,
    addDiscount,
    updateProduct,
    updateEditingProduct,
    updateDiscountField,
  } = useEditingProduct();

  if (!openProductIds.has(product.id)) return;
  return (
    <div className="mt-2">
      {editingProduct?.id === product.id ? (
        <div>
          <div className="mb-4">
            <label className="block mb-1">상품명: </label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                updateEditingProductField(product.id, "name", e.target.value)
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">가격: </label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                updateEditingProductField(
                  product.id,
                  "price",
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">재고: </label>
            <input
              type="number"
              value={editingProduct.stock}
              onChange={(e) =>
                updateProductStock(
                  product.id,
                  parseInt(e.target.value),
                  products,
                  onProductUpdate
                )
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
            {editingProduct.discounts.map((discount, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-2"
              >
                <span>{formatDiscountInfo(discount)}</span>
                <button
                  onClick={() =>
                    removeDiscount(product.id, index, products, onProductUpdate)
                  }
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            ))}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="수량"
                value={newDiscount.quantity}
                onChange={(e) =>
                  updateDiscountField("quantity", parseInt(e.target.value))
                }
                className="w-1/3 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="할인율 (%)"
                value={convertToPercent(newDiscount.rate)}
                onChange={(e) =>
                  updateDiscountField(
                    "rate",
                    convertToPercentage(parseInt(e.target.value))
                  )
                }
                className="w-1/3 p-2 border rounded"
              />
              <button
                onClick={() =>
                  addDiscount(product.id, products, onProductUpdate)
                }
                className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                할인 추가
              </button>
            </div>
          </div>
          <button
            onClick={() => updateProduct(onProductUpdate)}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <div>
          {product.discounts.map((discount, index) => (
            <div key={index} className="mb-2">
              <span>{formatDiscountInfo(discount)}</span>
            </div>
          ))}
          <button
            data-testid="modify-button"
            onClick={() => updateEditingProduct(product)}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
};

export default EditingProductComponent;
