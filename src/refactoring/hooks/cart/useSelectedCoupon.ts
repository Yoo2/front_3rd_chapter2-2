import { useState } from "react";
import { Coupon } from "../../../types";

const useSelectedCoupon = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };
  return { selectedCoupon, applyCoupon };
};
export default useSelectedCoupon;
