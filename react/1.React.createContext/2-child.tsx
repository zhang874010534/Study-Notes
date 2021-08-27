import React, { useContext} from 'react'
import {appContext, appSetStateContext} from '../AppState'
interface IRobot {
}
const Robot : React.FC<IRobot> = ({})  => {
  const value = useContext(appContext) 
  const setState = useContext(appSetStateContext)
  const addToCart = () => {
    if(setState){
      setState(state => {
        return {
          ...state,
          username: 'zhangce2'
        }
      })
    }
  }
  return (
    <li>
      <p>{value.username}</p>
      <button onClick={addToCart}>appContext</button>
    </li> 
  )

}
// function Robot():React.FC {
//   return <></>
// }
export default Robot