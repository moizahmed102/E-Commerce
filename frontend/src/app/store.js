import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/slices/authSlice";
import productReducer from "../features/slices/productSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});

export default store;
