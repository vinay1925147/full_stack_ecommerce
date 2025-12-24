import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  addressList: [],
};
export const addNewAddress = createAsyncThunk(
  "/add/addNewaddress",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/shop/address/add",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const getAllAddress = createAsyncThunk(
  "/get/getAlladdress",
  async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/shop/address/get/${userId}`,
      
    );
    return response.data;
  }
);
export const editAddress = createAsyncThunk(
  "/edit/address",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:8000/api/shop/address/edit/${userId}/${addressId}`,
      formData
    );
    console.log(response);
    return response.data;
  }
);
export const deleteAddress = createAsyncThunk(
  "/delete/address",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:8000/api/shop/address/delete/${userId}/${addressId}`,
      { withCredentials: true }
    );
    console.log(response);
    return response.data;
  }
);

const shoppingAddressSlice = createSlice({
  name: "shopaddress",
  initialState,
  resducers: {},
  extraReduecers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(getAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(getAllAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.addressList = [];
      })
   
  },
});
 
export default shoppingAddressSlice.reducer;
