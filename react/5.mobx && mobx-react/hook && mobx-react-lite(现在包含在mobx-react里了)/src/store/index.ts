import React from 'react'
import TestStore from './module/TestStore'

export const stores = {
  TestStore
}
const StoreContext = React.createContext({
  TestStore
})
export const useStore = () => React.useContext(StoreContext)