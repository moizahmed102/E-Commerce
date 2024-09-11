// features/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getProducts } from "../../services/productService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (queryParams, thunkAPI) => {
    try {
      return await getProducts(queryParams);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProduct(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
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
      });
  },
});

export default productSlice.reducer;
