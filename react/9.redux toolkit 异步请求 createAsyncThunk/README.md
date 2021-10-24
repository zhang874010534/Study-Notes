### 去看redux/productDetail

```tsx
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

```

### store.ts createStore换成configureStore

```tsx
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import languageReducer from "./language/languageReducer";
import recommendReducer from "./recommendReducer/recommendReducer";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
// 用这里的combineReducers 不要用redux里的
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// configureStore这个不用也行 直接就用createStore 但是如果需要用toolkit自带的redux-thunk就要用configureStore
const rootReducer = combineReducers({
  languageReducer,
  recommendReducer,
  productDetailReducer: productDetailSlice.reducer
})

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog],
  devTools: true
});

// applyMiddleware 简单源码
// const applyMiddleware = function(middleware: any) {
//   let next = store.dispatch
//   store.dispatch = middleware(store)(next)
// }

console.log(typeof store.getState)
export type RootState = ReturnType<typeof store.getState>

export default store;
```

### 执行

```tsx
dispatch(getProductDetail(prop.match.params.id))
```

