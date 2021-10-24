import {  createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
interface ProductDetailState  {
  loading: boolean,
  error: string | null,
  data: any
}
const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}
// reducers版本
// export const getProductDetail = createAsyncThunk(
//   'productDetail/getProductDetail',
//   async (touristRouteId: string, thunkAPI) => {
//     thunkAPI.dispatch(productDetailSlice.actions.fetchStart()) 
//     try {
//       const response = await axios.get('https://api.bilibili.com/x/web-interface/nav')
//       console.log(response)
//     } catch (error) {
//       setTimeout(() => {
//         thunkAPI.dispatch(productDetailSlice.actions.fetchFail(JSON.stringify(error)))
//       }, 4000);
//     }
//   }
// )

// https://redux-toolkit.js.org/api/createAsyncThunk
// extraReducers版本
export const getProductDetail = createAsyncThunk(
  'productDetail/getProductDetail',
  async (touristRouteId: string, thunkAPI) => {
    const response = await axios.get('https://mock-api.com/ZgY2GynN.mock/demo')
    console.log(response.data)
    return response.data
  }
)
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  },
  // 异步必须用这个
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null, string, any, any>) => {
      console.log(action)
      state.loading = false
      state.error = JSON.stringify(action.error)
    }
  }
})
