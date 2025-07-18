"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormater";
import {
  citySelector,
  clearCart,
  grandTotalSelector,
  orderedProductsSelector,
  OrderSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { CreateOrder } from "@/services/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails() {
  const Subtotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const order = useAppSelector(OrderSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const city = useAppSelector(citySelector);
  const shipping = useAppSelector(shippingAddressSelector);
  const CartProduct = useAppSelector(orderedProductsSelector);
  const user = useUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first");
      }
      if (!city) {
        throw new Error("City is missing");
      }
      if (!shipping) {
        throw new Error("Shipping address is missing");
      }
      if (CartProduct.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ?");
      }

      const res = await CreateOrder(order);
      console.log(res);
      if (res.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        router.push(res.data.PaymentUrl);
      }
      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };
  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>
      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(Subtotal)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Discount</p>
          <p className="font-semibold">{currencyFormatter(0)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>
      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5"
      >
        Order Now
      </Button>
    </div>
  );
}
