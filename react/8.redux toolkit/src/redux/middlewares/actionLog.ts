import { Middleware } from "redux";

export const actionLog: Middleware = (store) => (next) => (action) => {
  // console.log('state old', store.getState()) 
  // next 其实就是dispatch
  next(action)
  // console.log('state new', store.getState())
}