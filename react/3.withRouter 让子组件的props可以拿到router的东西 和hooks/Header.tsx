import React from 'react'
import { withRouter, RouteComponentProps, useHistory, useLocation, useParams, useRouteMatch } from "react-router-dom";

interface PropsType extends RouteComponentProps{
  name: string
}
const HeaderComponent:React.FC<PropsType> = (props) => {
  let { history } = props
  const location = useLocation()
  console.log(location)
  return <div onClick={() => {
    history.push('/signIn')
  }}>header</div>
}
export const Header = withRouter(HeaderComponent)
