// import Coupon from "@/components/modules/cart/Coupon";
import Address from "@/components/modules/cart/Address";
import CartProducts from "@/components/modules/cart/cartProducts";
import Coupon from "@/components/modules/cart/coupon";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import ProductBanner from "@/components/modules/products/banner";
import NMContainer from "@/components/ui/core/NMContainer/NMContainer";

const CartPage = () => {
  return (
    <NMContainer>
      <ProductBanner title="Cart Page" path="Home - Cart" />
      <div className="grid grid-cols-12 gap-8 my-5">
        <CartProducts />
        <Coupon />
        <Address />
        <PaymentDetails />
      </div>
    </NMContainer>
  );
};

export default CartPage;
