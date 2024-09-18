import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addToCart, deleteFromCart } from "../../services/cartService";

const initialState = {
  cart: null,
  status: "idle",
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await getCart();
  return response;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }) => {
    const response = await addToCart(productId, quantity);
    return response;
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productId) => {
    const response = await deleteFromCart(productId);
    return response;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        const updatedOrderItems = state.cart.orderItems.filter(
          (item) => item.product._id !== action.meta.arg
        );

        const updatedTotalPrice = action.payload.cart?.totalPrice || 0;

        state.cart = {
          ...state.cart,
          orderItems: updatedOrderItems.length > 0 ? updatedOrderItems : [],
          totalPrice: updatedOrderItems.length > 0 ? updatedTotalPrice : 0,
        };
      });
  },
});

export default cartSlice.reducer;
