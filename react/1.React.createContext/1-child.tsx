import React from 'react'
import {appContext} from './index'
interface IRobot {
}
const Robot : React.FC<IRobot> = ({})  => {
  return (
    <appContext.Consumer>
      {(value) => {
        return <li>
          <p>{value.username}</p>
        </li> 
      }}
    </appContext.Consumer> 
  )

}
// function Robot():React.FC {
//   return <></>
// }
export default Robot