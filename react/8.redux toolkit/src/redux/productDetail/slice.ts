import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  }
})
