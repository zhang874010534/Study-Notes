import { useRoutes } from 'react-router-dom'
import { RouterWaiterPropsType } from './type'
import Fn from "./fn";

function RouterWaiter (
  {
    routes,
    onRouteBefore,
    loading,
  } : RouterWaiterPropsType
) {
  const fn = new Fn({
    routes,
    onRouteBefore,
    loading,
  })
  const reactRoutes = fn.transformRoutes()

  return useRoutes(reactRoutes)
}

export default RouterWaiter
