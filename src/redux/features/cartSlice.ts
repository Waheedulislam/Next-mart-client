import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartProduct extends IProduct {
  orderQuantity: number;
}

interface InitialState {
  products: CartProduct[];
  city: string;
  shippingAddress: string;
}

const initialState: InitialState = {
  products: [],
  city: "",
  shippingAddress: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const productToAdd = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (productToAdd) {
        productToAdd.orderQuantity += 1;
        return;
      }

      state.products.push({ ...action.payload, orderQuantity: 1 });
    },
    IncrementOrderQuantity: (state, action) => {
      const productToInCrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToInCrement) {
        productToInCrement.orderQuantity += 1;
        return;
      }
    },
    DecrementOrderQuantity: (state, action) => {
      const productToInCrement = state.products.find(
        (product) => product._id === action.payload
      );

      if (productToInCrement && productToInCrement.orderQuantity > 1) {
        productToInCrement.orderQuantity -= 1;
        return;
      }
    },
    removeOrderQuantity: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    updateCity: (state, action) => {
      state.city = action.payload;
    },
    updatedShippingSelector: (state, action) => {
      state.shippingAddress = action.payload;
    },
    clearCart: (state) => {
      state.products = [];
      state.city = "";
      state.shippingAddress = "";
    },
  },
});

export const shippingCostSelector = (state: RootState) => {
  if (
    state.cart.city &&
    state.cart.city === "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 60;
  } else if (
    state.cart.city &&
    state.cart.city !== "Dhaka" &&
    state.cart.products.length > 0
  ) {
    return 120;
  } else {
    return 0;
  }
};
export const grandTotalSelector = (state: RootState) => {
  const subTotal = subTotalSelector(state);
  const shippingCost = shippingCostSelector(state);
  return subTotal + shippingCost;
};

//address
export const citySelector = (state: RootState) => {
  return state.cart.city;
};

export const shippingAddressSelector = (state: RootState) => {
  return state.cart.shippingAddress;
};

//product related
export const orderedProductsSelector = (state: RootState) => {
  return state.cart.products;
};

export const OrderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      product: product._id,
      quantity: product.orderQuantity,
      color: "White",
    })),
    shippingAddress: `${state.cart.shippingAddress}-${state.cart.city}`,
    paymentMethod: "Online",
  };
};

//payment related
export const subTotalSelector = (state: RootState) => {
  return state.cart.products.reduce((acc, product) => {
    if (product.offerPrice) {
      return acc + product.offerPrice * product.orderQuantity;
    } else {
      return acc + product.price * product.orderQuantity;
    }
  }, 0);
};

export const {
  addProduct,
  IncrementOrderQuantity,
  DecrementOrderQuantity,
  removeOrderQuantity,
  updateCity,
  updatedShippingSelector,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
