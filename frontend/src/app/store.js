import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import productReducer from "../features/slices/productSlice";
import categoryReducer from "../features/slices/categorySlice";
import cartReducer from "../features/slices/cartSlice";
import orderReducer from "../features/slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});

export default store;
