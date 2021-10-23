import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import languageReducer from "./language/languageReducer";
import recommendReducer from "./recommendReducer/recommendReducer";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
// 用这里的conbineReducers 不要用redux里的
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// configureStore这个不用也行 直接就用createStore
const rootReducer = combineReducers({
  languageReducer,
  recommendReducer,
  productDetailReducer: productDetailSlice.reducer
})

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

// applyMiddleware 简单源码
// const applyMiddleware = function(middleware: any) {
//   let next = store.dispatch
//   store.dispatch = middleware(store)(next)
// }

console.log(typeof store.getState)
export type RootState = ReturnType<typeof store.getState>

export default store;