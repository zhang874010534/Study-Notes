import React,{ useContext } from "react";
import { IRobot } from "./Robot";
import { appContext, appSetStateContext } from "../AppState";
export const withAddToCart = (ChildComponent: React.ComponentType<IRobot>) => {
  return (props: any) => { 
    const setState = useContext(appSetStateContext)
    const addToCart = (id, name) => {
      if (setState) {
        setState((state) => {
            return {
              ...state,
              shoppingCart: {
                  items: [...state.shoppingCart.items, { id, name }],
              },
            };
        });
      }
    }
    return <ChildComponent {...props} addToCart={addToCart} />
  };
}