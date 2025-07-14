export interface IOrder {
  products: Product[];
  coupon?: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface Product {
  product: string;
  quantity: number;
  color: string;
}
