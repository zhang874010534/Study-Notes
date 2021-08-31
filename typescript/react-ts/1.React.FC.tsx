import React from 'react'
import { RouteComponentProps } from "react-router-dom";

interface IMatchParams {
  touristId: string
}
interface IRobot extends RouteComponentProps<IMatchParams>{
  id: number,
  name: string,
  email: string
}
const Robot : React.FC<IRobot> = (props)  => {
  console.log(props.match.params.touristId)
  return <li>
    <img src={`https://avatars.githubusercontent.com/u/38835461?s=60&v=4`} alt="" />
  </li>
}
// function Robot():React.FC {
//   return <></>
// }
export default Robot