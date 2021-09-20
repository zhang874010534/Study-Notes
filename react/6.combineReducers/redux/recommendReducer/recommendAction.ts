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