// store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authenticationSlice";
import registerReducer from "./registerSlice"; 
import paymentReducer from "./paymentSlice";

const user = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : null;

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  carts: {
    cart: cartItems,
    totalPrice: cartItems.reduce((total, item) => total + item.itemTotal, 0),
    cartId: null,
    errorMessage: null,
    successMessage: null,
  },
  auth: {
    user: user, 
    address: [],
    selectedUserCheckoutAddress: null,
    clientSecret: null,
  },
  register: {
    // Add initial state for register slice
    loading: false,
    error: null,
    success: false, 
  },
};

export const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
    auth: authReducer,
    register: registerReducer, 
    payments: paymentReducer,
  },
  preloadedState: initialState,
});