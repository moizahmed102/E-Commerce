import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} from "../../services/adminOrders";

export const fetchOrders = createAsyncThunk(
  "admin/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getAllOrders();
      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeOrderStatus = createAsyncThunk(
  "admin/changeOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status);
      return updatedOrder;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeOrder = createAsyncThunk(
  "admin/removeOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      await deleteOrder(orderId);
      return orderId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(changeOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(removeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order._id !== action.payload
        );
      })
      .addCase(removeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
