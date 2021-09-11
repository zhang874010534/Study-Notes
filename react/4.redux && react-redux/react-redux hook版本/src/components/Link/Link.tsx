import React from "react";
import { RouteComponentProps } from "react-router-dom";
interface PropsType extends RouteComponentProps{
  to: string
}
const Link:React.FC<PropsType> = ({ to, history, children}) => {
  return <a href={to} onClick={() => {history.push('')}}>
    {children}
  </a>
}
export default Link