import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from "react-hot-toast";

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ data }, { rejectWithValue }) => {
    const toastId = toast.loading("Registering...");
    try {
      console.log("Sending API request with data:", data);
      const response = await api.post("/auth/signup", data);
      console.log("API response:", response.data);
      return {
        data: response.data,
        toastId,
      };
    } catch (error) {
      console.error("API Error:", error);
      console.error("Error Response:", error.response);
      console.error("Error Response Data:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";
      console.log("Error Message:", errorMessage);
      return rejectWithValue({
        error: errorMessage,
        toastId,
      });
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetRegisterState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        console.log("Pending state triggered");
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Fulfilled state triggered:", action.payload);
        const { toastId } = action.payload;
        state.loading = false;
        state.success = true;
        toast.dismiss(toastId);
        toast.success("Registration successful");
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Rejected state triggered:", action);
        console.log("Rejected payload:", action.payload);
        console.log("Rejected error:", action.error); // Log action.error for additional context
        const { error, toastId } = action.payload || {};
        state.loading = false;
        state.error = error || "Unknown error";
        if (toastId) {
          toast.dismiss(toastId);
        }
        if (error?.includes("User Already Exists")) {
          toast.error("User already exists with this username");
        } else if (error?.includes("Invalid input data")) {
          toast.error("Please check your input data");
        } else {
          toast.error(error || "Registration failed");
        }
      });
  },
});

export const { resetRegisterState } = registerSlice.actions;
export default registerSlice.reducer;