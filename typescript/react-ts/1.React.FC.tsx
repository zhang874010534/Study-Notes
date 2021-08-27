import React from 'react'

interface IRobot {
  id: number,
  name: string,
  email: string
}
const Robot : React.FC<IRobot> = ({id,name,email})  => {
  return <li>
    <img src={`https://avatars.githubusercontent.com/u/38835461?s=60&v=4`} alt="" />
  </li>
}
// function Robot():React.FC {
//   return <></>
// }
export default Robot