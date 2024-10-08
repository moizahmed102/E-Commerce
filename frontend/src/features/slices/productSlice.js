import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (queryParams, thunkAPI) => {
    try {
      return await getProducts(queryParams);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch products";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProduct(productData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to add product";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ productId, productData }, thunkAPI) => {
    try {
      return await updateProduct(productId, productData);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update product";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (productId, thunkAPI) => {
    try {
      return await deleteProduct(productId);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete product";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  products: [],
  totalProducts: 0,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(action.payload)) {
          state.products = action.payload;
          state.totalProducts = action.payload.length;
        } else {
          state.products = [];
          state.totalProducts = 0;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload.product);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload.product._id
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.product._id
        );
        state.totalProducts -= 1;
      });
  },
});

export default productSlice.reducer;
