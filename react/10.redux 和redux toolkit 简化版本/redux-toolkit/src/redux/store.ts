import { combineReducers,configureStore } from '@reduxjs/toolkit'
import { learnSlice } from "./learn/slice";
const rootReducer = combineReducers({
    learnReducer: learnSlice.reducer
})
const store  = configureStore({
    reducer: rootReducer
})
export type RootState = ReturnType<typeof store.getState>
export default store