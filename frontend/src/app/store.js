import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import productReducer from "../features/slices/productSlice";
import categoryReducer from "../features/slices/categorySlice";
import cartReducer from "../features/slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
});

export default store;
