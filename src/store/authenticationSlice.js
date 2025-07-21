import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import toast from "react-hot-toast";

export const getLoginDetails = createAsyncThunk(
  "auth/login",
  async ({ data }, { rejectWithValue }) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await api.post("/auth/signin", data);
      return {
        data: response.data,
        toastId,
      };
    } catch (error) {
      return rejectWithValue({
        error: error.response?.data?.message || error.message,
        toastId,
      });
    }
  }
);

export const addUpdatedUserAddress = createAsyncThunk(
  'address/addUpdatedUserAddress',
  async ({ data, addressId }, { rejectWithValue }) => {
    const isUpdating = !!addressId;
    const toastId = toast.loading(isUpdating ? "Updating Address..." : "Adding Address...");
    try {
      console.log(isUpdating ? "Sending PUT request with data:" : "Sending POST request with data:", data);
      const response = isUpdating
        ? await api.put(`/addresses/${addressId}`, data)
        : await api.post("/addresses", data);
      console.log("API response:", response.data);
      return {
        data: response.data,
        toastId,
        isUpdating,
      };
    } catch (error) {
      console.error("API Error:", error);
      console.error("Error Response:", error.response);
      console.error("Error Response Data:", error.response?.data);
      const errorMessage =
        error.response?.data?.message || error.message || (isUpdating ? "Update failed" : "Registration failed");
      console.log("Error Message:", errorMessage);
      return rejectWithValue({
        error: errorMessage,
        toastId,
      });
    }
  }
);

export const getUserAddress = createAsyncThunk(
  "address/getUserAddress",
  async (_, { rejectWithValue }) => {
    const toastId = toast.loading("Address Is Loading...");
    console.log("Fetching user address...");
    try {
      console.log("Sending API request...");
      const response = await api.get("/addresses/specificUser");
      return {
        data: response.data,
        toastId,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to fetch addresses";
      return rejectWithValue({
        error: errorMessage,
        toastId,
      });
    }
  }
);

export const selectUserCheckoutAddress = createAsyncThunk(
  "address/selectUserCheckoutAddress",
  async (address, { rejectWithValue }) => {
    const toastId = toast.loading("Selecting Address...");
    try {
      // No API call, just return the selected address
      return {
        data: address,
        toastId,
      };
    } catch (error) {
      const errorMessage = error.message || "Failed to select address";
      return rejectWithValue({
        error: errorMessage,
        toastId,
      });
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "address/deleteUserAddress",
  async (addressId, { rejectWithValue }) => {
    const toastId = toast.loading("Deleting Address...");
    try {
      console.log(`Sending DELETE request for address ID: ${addressId}`);
      await api.delete(`/addresses/${addressId}`);
      return {
        addressId,
        toastId,
      };
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to delete address";
      return rejectWithValue({
        error: errorMessage,
        toastId,
      });
    }
  }
);

export const getClientSecretKey = createAsyncThunk(
  "auth/getClientSecretKey",
  async (data, { rejectWithValue }) => {
    const toastId = toast.loading("Fetching Client Secret...");
    try {
      console.log("Sending POST request with data:", data);
      const response = await api.post("/order/stripe-client-secret", data);
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
        error.response?.data?.message || error.message || "Failed to fetch client secret";
      console.log("Error Message:", errorMessage);
      return rejectWithValue({
        error: errorMessage,
        toastId,
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    address: [],
    selectedUserCheckoutAddress: null,
    clientSecret: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.selectedUserCheckoutAddress = null;
      state.clientSecret = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoginDetails.fulfilled, (state, action) => {
        const { data, toastId } = action.payload;
        state.user = data;
        localStorage.setItem("auth", JSON.stringify(data));
        toast.dismiss(toastId);
        toast.success("Login successful");
      })
      .addCase(getLoginDetails.rejected, (state, action) => {
        const { error, toastId } = action.payload || {};
        state.user = null;
        toast.dismiss(toastId);
        toast.error(error || "Login failed");
        if (error === "Bad credentials") {
          toast.error("Bad credentials");
        } else {
          toast.error(error || "Something went wrong");
        }
      })
      .addCase(getLoginDetails.pending, (state) => {
        state.user = null;
      })
      .addCase(addUpdatedUserAddress.fulfilled, (state, action) => {
        const { data, toastId, isUpdating } = action.payload;
        console.log(isUpdating ? "Address updated successfully:" : "Address added successfully:", data);
        toast.dismiss(toastId);
        toast.success(isUpdating ? "Address updated successfully" : "Address added successfully");
      })
      .addCase(addUpdatedUserAddress.rejected, (state, action) => {
        console.log("Rejected state triggered:", action);
        const { error, toastId } = action.payload || {};
        toast.dismiss(toastId);
        toast.error(error || "Something went wrong");
      })
      .addCase(addUpdatedUserAddress.pending, (state) => {
        console.log("Pending state triggered");
      })
      .addCase(getUserAddress.fulfilled, (state, action) => {
        const { data, toastId } = action.payload;
        console.log("Address fetched successfully:", data);
        state.address = data;
        toast.dismiss(toastId);
        toast.success("Address fetched successfully", { id: 'getUserAddress' });
      })
      .addCase(getUserAddress.rejected, (state, action) => {
        console.log("Rejected state triggered:", action);
        const { error, toastId } = action.payload || {};
        toast.dismiss(toastId);
        toast.error(error || "Something went wrong");
      })
      .addCase(getUserAddress.pending, (state) => {
        console.log("Pending state triggered");
      })
      .addCase(selectUserCheckoutAddress.fulfilled, (state, action) => {
        const { data, toastId } = action.payload;
        state.selectedUserCheckoutAddress = data;
        localStorage.setItem("selectedUserCheckoutAddress", JSON.stringify(data));
        toast.dismiss(toastId);
        toast.success("Address selected successfully");
      })
      .addCase(selectUserCheckoutAddress.rejected, (state, action) => {
        const { error, toastId } = action.payload || {};
        toast.dismiss(toastId);
        toast.error(error || "Failed to select address");
      })
      .addCase(selectUserCheckoutAddress.pending, (state) => {
        console.log("Selecting address pending");
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        const { addressId, toastId } = action.payload;
        console.log(`Address ${addressId} deleted successfully`);
        state.address = state.address.filter((addr) => addr.addressId !== addressId);
        if (state.selectedUserCheckoutAddress?.addressId === addressId) {
          state.selectedUserCheckoutAddress = null;
        }
        toast.dismiss(toastId);
        toast.success("Address deleted successfully");
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        console.log("Delete rejected state triggered:", action);
        const { error, toastId } = action.payload || {};
        toast.dismiss(toastId);
        toast.error(error || "Failed to delete address");
      })
      .addCase(deleteUserAddress.pending, (state) => {
        console.log("Delete pending state triggered");
      })
      .addCase(getClientSecretKey.fulfilled, (state, action) => {
        const { data, toastId } = action.payload;
        console.log("Client secret fetched successfully:", data);
        state.clientSecret = data;
        toast.dismiss(toastId);
        toast.success("Client secret fetched successfully");
      })
      .addCase(getClientSecretKey.rejected, (state, action) => {
        const { error, toastId } = action.payload || {};
        console.log("Client secret fetch failed:", error);
        toast.dismiss(toastId);
        toast.error(error || "Failed to fetch client secret");
      })
      .addCase(getClientSecretKey.pending, (state) => {
        console.log("Fetching client secret pending");
        state.clientSecret = null;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;