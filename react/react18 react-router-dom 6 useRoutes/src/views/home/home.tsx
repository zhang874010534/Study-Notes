import {useLocation, useOutlet} from "react-router-dom";
import {Menu} from "antd"
import styles from './style.module.scss';
import {MenuProps} from "antd/es";
import { SideBar, ActionBar } from "./components"
import {navbarMap} from "./map";
import {BrowserRouterProps} from "react-router-dom"

function Home(props: BrowserRouterProps) {
  const navbarItems: MenuProps['items'] = navbarMap
  const outlet = useOutlet()
  const { pathname } = useLocation()
  // 选中侧边栏
  return <div id="container" className={styles.container}>
    <div id="navbar" className={styles.navbar}>
      <div className={styles["navbar-left"]}>
        标题
      </div>
      <div className={styles["navbar-right"]}>
        <Menu mode="horizontal" items={navbarItems}  theme="dark"></Menu>
      </div>
    </div>
    <ActionBar></ActionBar>
    <div id="content" className={styles.main}>
      <SideBar></SideBar>
      <div className={styles.content}>
        { outlet }
        {/*<TransitionGroup>*/}
        {/*  <CSSTransition*/}
        {/*    key={pathname}*/}
        {/*    appear={true}*/}
        {/*    timeout={ 2000 }*/}
        {/*    classNames='dg'*/}
        {/*  >*/}
        {/*    { outlet }*/}
        {/*  </CSSTransition>*/}
        {/*</TransitionGroup>*/}
      </div>
    </div>
  </div>
}

export default Home
