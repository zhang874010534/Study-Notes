import {MenuProps} from "antd/es";
import {leftMap} from "@/views/home/map";
import {useState} from "react";
import styles from "./style.module.scss";
import {Button, Menu} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {SelectInfo} from "rc-menu/lib/interface";

export default function SideBar () {
  const location = useLocation()
  const leftItem: MenuProps['items'] = leftMap
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  }

  const onSelect = (info: SelectInfo) => {
    navigate(info.key)
  }
  return <div className={styles.side} style={{
    width: collapsed ? "80px" : "240px"
  }}>
    <div className={styles.collapse}>
      <Button type="primary" onClick={toggleCollapsed} style={{
        width: "100%"
      }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </div>
    <Menu
      defaultSelectedKeys={[location.pathname]}
      mode="inline"
      inlineCollapsed={collapsed}
      items={leftItem}
      className={styles.menu}
      onSelect={onSelect}
    >
    </Menu>
  </div>
}
