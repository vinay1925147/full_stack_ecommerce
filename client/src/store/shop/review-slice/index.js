import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReviews = createAsyncThunk(
  "/add/review",
  async (data) => {
    const response = axios.post("http://localhost:8000/api/shop/review/add", 
      data,
    );
  
    return response.data;
  }
);
export const getProductReviews = createAsyncThunk(
  "/get/review",
  async ({ productId }) => {
    const response = axios.get(
      `http://localhost:8000/api/shop/review/${productId}`
    );
    return response.data;
  }
);

const ShoppingReviewSlice = createSlice({
  name: "shopReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action?.payload?.data;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = null;
      });
  },
});
export default ShoppingReviewSlice.reducer;