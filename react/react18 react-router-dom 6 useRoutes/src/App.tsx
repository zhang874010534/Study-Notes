import React, {useEffect, useState} from 'react';
import './App.css';
import routes, {onRouteBefore} from './routers'
import RouterWaiter from './routers/RouterWaiter'
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "./stores/index";

function App() {
  // const element = useRoutes(routes)
  const [isRender, setIsRender] = useState(false)
  const location = useLocation()
  const isGotUserInfo = useSelector((state: RootState) => state.userReducer.isGotUserInfo)


  useEffect(() => {
    console.log('---update---', document.lastModified)

    // 判断路由是否可渲染
    const path = location.pathname
    if (['/login'].includes(path)) {
      setIsRender(true)
    } else {
      if (!isGotUserInfo) {
        // api.getUserInfo().then((res: any) => {
        //   const data = res.data || {}
        //   userStore.setUserInfo(data)
        //   setIsRender(true)
        // })
      }else {
        setIsRender(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App">
      {
        isRender ?
          <RouterWaiter
            routes={routes}
            onRouteBefore={onRouteBefore}
          /> : null
      }
      {/*<RouterAuth>{element}</RouterAuth>*/}
    </div>
  );
}

export default App;
