import { createStore,combineReducers } from "redux";
import learnReducer from './learnReducer/learnReducer'
const rootReducer = combineReducers({
    learnReducer
})
const store = createStore(rootReducer)

export default store
