### 去看redux/store.ts 、redux/productDetail、components/toolkit 测试git

```typescript
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { productDetailSlice } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
interface PropsType {

}
const Toolkit: React.FC<RouteComponentProps<PropsType>> = (prop) => {
  console.log(prop)
  const loading = useSelector(state => state.productDetailReducer.loading)
  const error = useSelector(state => state.productDetailReducer.error)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(productDetailSlice.actions.fetchStart())
    setTimeout(() => {
      dispatch(productDetailSlice.actions.fetchFail('请求失败了'))
    }, 4000);
  }, [])
  return <div>
    <div>{loading ? 'loading....' : ''}</div>
    <div>{error}</div>
  </div>
} 
export default Toolkit
```

```tsx
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import languageReducer from "./language/languageReducer";
import recommendReducer from "./recommendReducer/recommendReducer";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
// 用这里的combineReducers 不要用redux里的
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
```

