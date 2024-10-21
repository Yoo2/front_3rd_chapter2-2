import { Coupon } from "../../types";

const formatDiscountType = (discountType: string) => {
  if (discountType === "amount") return "원";
  return "%";
};

export const formatCoupon = (coupon: Coupon) => {
  const { name, discountType, discountValue } = coupon;
  return `${name} - ${discountValue}${formatDiscountType(discountType)}`;
};

export const formatSelectedCoupon = (coupon: Coupon) => {
  const { name, discountType, discountValue } = coupon;
  return `적용된 쿠폰: ${name}(${discountValue}${formatDiscountType(
    discountType
  )} 할인)`;
};

export const formatCommaWithUnit = (amount: number) => {
  return `${amount.toLocaleString()}원`;
};
