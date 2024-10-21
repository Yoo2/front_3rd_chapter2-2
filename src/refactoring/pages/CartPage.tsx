import { Coupon, Product } from "../../types.ts";
import CartItemComponent from "../components/cart-components/CartItemComponent.tsx";
import ProductComponent from "../components/cart-components/ProductComponent.tsx";
import { useCart } from "../hooks/index.ts";
import {
  formatCommaWithUnit,
  formatCoupon,
  formatSelectedCoupon,
} from "../utils/formatUtils.ts";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {products.map((product) => (
              <ProductComponent
                key={product.id}
                product={product}
                cart={cart}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <div className="space-y-2">
            {cart.map((item) => {
              return (
                <CartItemComponent
                  key={item.product.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              );
            })}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            <select
              onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="">쿠폰 선택</option>
              {coupons.map((coupon, index) => (
                <option key={coupon.code} value={index}>
                  {formatCoupon(coupon)}
                </option>
              ))}
            </select>
            {selectedCoupon && (
              <p className="text-green-600">
                {formatSelectedCoupon(selectedCoupon)}
              </p>
            )}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
            <div className="space-y-1">
              <p>{`상품 금액: ${formatCommaWithUnit(totalBeforeDiscount)}`}</p>
              <p className="text-green-600">{`할인 금액: ${formatCommaWithUnit(
                totalDiscount
              )}`}</p>
              <p className="text-xl font-bold">
                {`최종 결제 금액: ${formatCommaWithUnit(totalAfterDiscount)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
