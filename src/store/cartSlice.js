import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from "react-hot-toast";

// Create a thunk for adding to cart
export const addToCartThunk = createAsyncThunk(
  "cart/addToCartThunk",
  async (productToAdd, { getState }) => {
    const { products } = getState().products;

    // Check if product exists in product store
    const productInStore = products?.find(
      (product) => product.productId === productToAdd.productId
    );

    if (!productInStore) {
      toast.error("Product not found");
      return { error: "Product not found", product: null };
    }

    // Check if product is in stock
    if (productInStore.quantity <= 0) {
      toast.error("Product is out of stock");
      return { error: "Product is out of stock", product: null };
    }

    // Return the product to be added
    return { error: null, product: productToAdd };
  }
);

// Create a thunk for creating/updating cart
export const createOrUpdateCart = createAsyncThunk(
  "cart/createOrUpdateCart",
  async (_, { getState }) => {
    const { carts } = getState();
    const cartItems = carts.cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    try {
      const response = await api.post("/cart/create", cartItems);
      return { cartId: response.data, error: null };
    } catch (error) {
      toast.error("Failed to create/update cart");
      return { cartId: null, error: error.message };
    }
  }
);

// Create a thunk for fetching user's cart
export const getUsersCart = createAsyncThunk(
  "cart/getUsersCart",
  async () => {
    try {
      console.log("Fetching user's cart...");
      const response = await api.get("/carts/users/cart");
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data); 
      console.log("API Response:", response.data); // Log the full response
      return { cartId: response.data.cartId, error: null };
    } catch (error) {
      console.error("Error fetching cart:", error); // Log the error
      toast.error("Failed to fetch user's cart1");
      return { cartId: null, error: error.message };
    }
  }
);

export const stripePaymentConfirmation = createAsyncThunk(
  "payment/stripePaymentConfirmation",
  async (paymentData, { rejectWithValue }) => {
    const toastId = toast.loading("Confirming payment...");
    try {
      const paymentMethod = "CARD"
      const response = await api.post(`/order/users/payment/${paymentMethod}`, paymentData);
      console.log("Payment confirmation response:", response.data);
      return {
        data: response.data,
        toastId,
      };
    } catch (error) {
      console.error("Payment confirmation error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to confirm payment";
      return rejectWithValue({
        error: errorMessage,
        toastId,
      });
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 0,
    cartId: null,
    errorMessage: null,
    successMessage: null,
  },
  reducers: {
    // Clear messages
    clearMessages(state) {
      state.errorMessage = null;
      state.successMessage = null;
    },
    // Set error message
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
      state.successMessage = null;
    },
    // Increase quantity
    increaseQuantity(state, action) {
      const { productId } = action.payload;
      const item = state.cart.find((item) => item.productId === productId);

      if (item) {
        item.quantity += 1;
        const priceToUse = item.specialPrice || item.price;
        item.itemTotal = item.quantity * priceToUse;
        state.totalPrice = state.cart.reduce(
          (total, item) => total + item.itemTotal,
          0
        );
        // Update localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        state.successMessage = `Quantity increased for ${item.productName}`;
        toast.success(`Quantity increased for ${item.productName}`);
      }
    },
    // Decrease quantity
    decreaseQuantity(state, action) {
      const { productId } = action.payload;
      const item = state.cart.find((item) => item.productId === productId);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        const priceToUse = item.specialPrice || item.price;
        item.itemTotal = item.quantity * priceToUse;
        state.totalPrice = state.cart.reduce(
          (total, item) => total + item.itemTotal,
          0
        );
        // Update localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        state.successMessage = `Quantity decreased for ${item.productName}`;
        toast.success(`Quantity decreased for ${item.productName}`);
      } else if (item && item.quantity === 1) {
        state.errorMessage = "Quantity cannot be less than 1";
        toast.error("Quantity cannot be less than 1");
      }
    },
    // Remove item from cart
    removeItem(state, action) {
      const { productId } = action.payload;
      const item = state.cart.find((item) => item.productId === productId);
      if (item) {
        state.cart = state.cart.filter((item) => item.productId !== productId);
        state.totalPrice = state.cart.reduce(
          (total, item) => total + item.itemTotal,
          0
        );
        // Update localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        state.successMessage = `${item.productName} removed from cart`;
        state.errorMessage = null;
        toast.success(`${item.productName} removed from cart`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.errorMessage = action.payload.error;
          state.successMessage = null;
        } else if (action.payload.product) {
          // Add to cart if there's no error
          const productToAdd = action.payload.product;

          // Check if product is already in cart
          const isAlreadyInCart = state.cart.find(
            (item) => item.productId === productToAdd.productId
          );

          if (isAlreadyInCart) {
            state.errorMessage = "Product already added to cart";
            state.successMessage = null;
            toast.error("Product already added to cart");
            return;
          }

          // Add product to cart
          const priceToUse = productToAdd.specialPrice || productToAdd.price;
          const cartItem = {
            ...productToAdd,
            quantity: 1,
            itemTotal: priceToUse,
          };

          state.cart.push(cartItem);
          state.totalPrice += priceToUse;
          state.errorMessage = null;
          state.successMessage = "Product added to cart";

          // Update localStorage
          localStorage.setItem("cartItems", JSON.stringify(state.cart));
          toast.success(`${productToAdd.productName} added to cart`);
        }
      })
      .addCase(createOrUpdateCart.fulfilled, (state, action) => {
        if (action.payload.error) {
          state.errorMessage = action.payload.error;
          state.successMessage = null;
        } else {
          
          state.errorMessage = null;
          state.successMessage = "Cart created/updated successfully";
          toast.success("Cart created/updated successfully");
        }
      })
      .addCase(createOrUpdateCart.rejected, (state, action) => {
        state.errorMessage = action.error.message;
        state.successMessage = null;
        toast.error("Failed to create/update cart");
      })
      .addCase(getUsersCart.fulfilled, (state, action) => {
       
          state.cartId = action.payload.cartId; // Update cartId
          state.errorMessage = null;
          state.successMessage = "User's cart fetched successfully";
          toast.success("User's cart fetched successfully");
        
      })
      .addCase(getUsersCart.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
        state.successMessage = null;
        toast.error("Failed to fetch user's cart2");
      })
      .addCase(stripePaymentConfirmation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(stripePaymentConfirmation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.cart = [];
        state.totalPrice = 0;
        state.cartId = null;
        toast.dismiss(action.payload.toastId);
        toast.success("Payment confirmed successfully");
        console.log("Payment confirmed successfully");

        // Clear localStorage
        ["cartItems", "paymentMethod", "selectedUserCheckoutAddress"].forEach(key => localStorage.removeItem(key));

        // Reset cart state and payment method
        

        
      })
      .addCase(stripePaymentConfirmation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.success = false;
        toast.dismiss(action.payload.toastId);
        toast.error(action.payload.error || "Failed to confirm payment");
      });
  },
});

export const { clearMessages, setErrorMessage, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;