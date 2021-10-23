import { recommendAction, ADD_LIST } from "./recommendAction";
interface IRecommendState {
  productionList: any[]
}

const defaultState: IRecommendState = {
  productionList: []
} 
export default (state = defaultState, action: recommendAction) => {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        productionList: state.productionList.push(action.payload)
      }
    default:
      break;
  }
  return state  
}