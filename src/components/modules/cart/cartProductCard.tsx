import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormater";
import {
  CartProduct,
  DecrementOrderQuantity,
  IncrementOrderQuantity,
  removeOrderQuantity,
} from "@/redux/features/cartSlice";

import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function CartProductCard({ product }: { product: CartProduct }) {
  const dispatch = useDispatch();

  const incrementQuantity = (id: string) => {
    dispatch(IncrementOrderQuantity(id));
  };
  const decrementQuantity = (id: string) => {
    dispatch(DecrementOrderQuantity(id));
  };
  const removeProduct = (id: string) => {
    dispatch(removeOrderQuantity(id));
  };
  return (
    <div className="bg-white rounded-lg flex p-5 gap-5">
      <div className="h-full w-32 rounded-md overflow-hidden">
        <Image
          src={product?.imageUrls?.[0]}
          height={200}
          width={200}
          alt="product"
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h1 className="text-xl font-semibold">{product?.name}</h1>
        <div className="flex gap-5 my-2">
          <p>
            <span className="text-gray-500">Color:</span>{" "}
            <span className="font-semibold">Black</span>
          </p>
          <p>
            <span className="text-gray-500">Stock Availability:</span>{" "}
            <span className="font-semibold">{product?.stock}</span>
          </p>
        </div>
        <hr className="my-1" />
        <div className="flex items-center justify-between">
          <h2>
            Price:
            {product.offerPrice
              ? currencyFormatter(product.offerPrice)
              : currencyFormatter(product.price)}
          </h2>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 font-semibold">Quantity</p>
            <Button
              onClick={() => decrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Minus />
            </Button>
            <p className="font-semibold text-xl p-2">
              {product?.orderQuantity}
            </p>
            <Button
              onClick={() => incrementQuantity(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Plus />
            </Button>
            <Button
              onClick={() => removeProduct(product._id)}
              variant="outline"
              className="size-8 rounded-sm"
            >
              <Trash className="text-red-500/50" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
