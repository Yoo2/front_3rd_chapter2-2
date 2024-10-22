import { useState } from "react";
import { Coupon } from "../../../../types";

type CouponKey = "name" | "code" | "discountType" | "discountValue";

export const useNewCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });
  const addNewCoupon = (onCouponAdd: (newCoupon: Coupon) => void) => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const updateNewCouponField = <K extends CouponKey>(
    key: K,
    value: Coupon[K]
  ) => {
    setNewCoupon({ ...newCoupon, [key]: value });
  };

  return {
    newCoupon,
    addNewCoupon,
    updateNewCouponField,
  };
};
