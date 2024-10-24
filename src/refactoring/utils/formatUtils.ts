import { Coupon, Discount } from "../../types";
import { convertToPercent } from "./calculationUtils";

const formatDiscount = (discountValue: number, discountType: string) => {
  return `${discountValue}${formatDiscountType(discountType)}`;
};

const formatDiscountType = (discountType: string) => {
  if (discountType === "amount") return "원";
  return "%";
};

export const formatCoupon = (coupon: Coupon) => {
  const { name, discountType, discountValue } = coupon;
  return `${name} - ${formatDiscount(discountValue, discountType)}`;
};

export const formatSelectedCoupon = (coupon: Coupon) => {
  const { name, discountType, discountValue } = coupon;
  return `적용된 쿠폰: ${name}(${formatDiscount(
    discountValue,
    discountType
  )} 할인)`;
};

export const formatCommaWithUnit = (amount: number) => {
  return `${amount.toLocaleString()}원`;
};

export const formatAdminCoupon = (coupon: Coupon) => {
  const { name, code, discountType, discountValue } = coupon;
  return `${name} (${code}):${formatDiscount(
    discountValue,
    discountType
  )} 할인`;
};

export const formatDiscountInfo = (discount: Discount) => {
  return `${discount.quantity}개 이상 구매 시 ${convertToPercent(
    discount.rate
  )}% 할인`;
};

export const formatPercent = (value: number) => {
  return `${convertToPercent(value).toFixed(0)}%`;
};
