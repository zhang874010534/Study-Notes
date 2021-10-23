import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
export const ADD_LIST = 'add_list'
interface IAddList {
  type: typeof ADD_LIST,
  payload: {  
    name: string
  }
}
export type recommendAction = IAddList;
export const createAddListAction = (name: string):IAddList => {
  return {
    type: ADD_LIST,
    payload: {
      name: name
    }
  }
}

export const giveMeDataCreator  = (): ThunkAction<void, RootState, unknown, IAddList> => (dispatch, getState) => {
  console.log('redux-thunk 异步请求拿到数据')
  // 发送一个异步的请求
  // 返回结果dispatch(actionCreator(data))
}