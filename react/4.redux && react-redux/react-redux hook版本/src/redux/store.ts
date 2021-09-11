import { createStore } from "redux";
import languageReducer from "./language/languageReducer";

const store = createStore(languageReducer);

console.log(typeof store.getState)
export type RootState = ReturnType<typeof store.getState>

export default store;