import { useState } from "react";
import { Coupon } from "../../types";

const useAdminNewCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });
  const handleAddCoupon = (onCouponAdd: (newCoupon: Coupon) => void) => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  return {
    newCoupon,
    setNewCoupon,
    handleAddCoupon,
  };
};

export default useAdminNewCoupon;
