import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  orderId: null,
  approvalURL: null,
};

export const createNewOrder = createAsyncThunk(
  "/createNew/order",
  async (orderData) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/order/create",
     { orderData}
    );
     console.log(response.data,response);
    return response.data;
  }
);

export const captureOrder = createAsyncThunk(
  "/capture/order",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/order/capture",
      {
        paymentId,
        payerId,
        orderId,
      }
    );
    //  console.log(response.data,response);
    return response.data;
  }
);
const ShoppingOrderSlice = createSlice({
  name: "shopOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.approvalURL = action?.payload?.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(action.payload.orderId)
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        // state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export default ShoppingOrderSlice.reducer;
