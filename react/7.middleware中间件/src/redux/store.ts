import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import languageReducer from "./language/languageReducer";
import recommendReducer from "./recommendReducer/recommendReducer";
import { actionLog } from "./middlewares/actionLog";
const rootReducer = combineReducers({
  languageReducer,
  recommendReducer
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