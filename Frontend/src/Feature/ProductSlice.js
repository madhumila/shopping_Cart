import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
};
export const productFetch = createAsyncThunk(
  "products/productsFetch",

  async () => {
    const response = await axios.get("http://localhost:5003/products");
    return response?.data;
  }
);
const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [productFetch.pending]: (state, action) => {
      state.status = "pending";
    },
    [productFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [productFetch.fulfilled]: (state, action) => {
      state.status = "success";
      state.items = action.payload;
    },
  },
});

export default ProductSlice.reducer;
