import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from "react-hot-toast";

// Async thunk to update payment method
export const updatePaymentMethod = createAsyncThunk(
  "payment/updatePaymentMethod",
  async (paymentMethod) => {
    try {
      // Assuming your API has an endpoint to update payment method
      
      return paymentMethod;
    } catch (error) {
      return (error.response?.data?.message || "Failed to update payment method");
    }
  }
);




const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentMethod: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethod = action.payload;
        localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
        state.success = true;
      })
      .addCase(updatePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default paymentSlice.reducer;