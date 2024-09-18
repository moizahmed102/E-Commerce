import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, fetchOrders } from "../../services/orderService";

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const response = await createOrder(orderData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOrdersByUserAsync = createAsyncThunk(
  "order/getOrdersByUser",
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().auth.user?.id; // Get user ID from auth state
    if (!userId) {
      return thunkAPI.rejectWithValue("User not authenticated");
    }
    try {
      const response = await fetchOrders(userId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getOrdersByUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrdersByUserAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrdersByUserAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;
