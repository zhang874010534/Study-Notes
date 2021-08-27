import React, { useContext, useEffect, useState } from 'react'
import {withAddToCart} from "./AddToCart";
export interface IRobot {
  name: string,
  addToCart: (id:number, name: string) => void
}
const Robot : React.FC<IRobot> = ({addToCart})  => {
  return (
    <li>
      <button onClick={addToCart}>appContext</button>
    </li> 
  )

}
// function Robot():React.FC {
//   return <></>
// }
export default withAddToCart(Robot)