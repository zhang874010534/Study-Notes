import { createStore, combineReducers } from "redux";
import languageReducer from "./language/languageReducer";
import recommendReducer from "./recommendReducer/recommendReducer";

const rootReducer = combineReducers({
  languageReducer,
  recommendReducer
})
const store = createStore(rootReducer);

console.log(typeof store.getState)
export type RootState = ReturnType<typeof store.getState>

export default store;