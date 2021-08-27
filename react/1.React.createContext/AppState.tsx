import React, { useState } from "react";

interface IDefaultValue {
  username: string,
  shopCart: any[],
} 
const defaultValue:IDefaultValue = {
  username: 'zhangce',
  shopCart: [],
}
export const appContext = React.createContext(defaultValue)
export const appSetStateContext = React.createContext<React.Dispatch<React.SetStateAction<IDefaultValue>> | undefined>(undefined)

export const AppStateProvider:React.FC = (props) => {
  const [state, setState] = useState(defaultValue)
  return <appContext.Provider value={state}>
    <appSetStateContext.Provider value={setState}>
      {props.children}
    </appSetStateContext.Provider>
  </appContext.Provider>
}