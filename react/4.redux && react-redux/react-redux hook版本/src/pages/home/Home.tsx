import React from 'react';
import logo from './logo.svg'
import styles from './a.module.css'
import { Layout, Typography, Input, Menu, Dropdown, Button } from "antd";
import { Header } from '../../components'
import { RouteComponentProps } from "react-router-dom";
interface IMatchParams {
  touristId: string
}

interface PropsType extends RouteComponentProps<IMatchParams>{
  name: string
}
const Home:React.FC<PropsType>  = (props) => {
  console.log(props)
  console.log(props.match.params.touristId)
  return <div>
    {props.match.params.touristId}
    <Dropdown overlay={<div>123</div>} placement="bottomRight">
      <Button>bottomLeft</Button>
    </Dropdown>
    <Header name={'name'}></Header>
    <Layout.Header>
      <img src={logo} alt=""  className={styles.logo}/>
      <Typography.Title level={3} className={styles.title}>React 旅游网</Typography.Title>
      <Input.Search placeholder={'请输入旅 游的关键字'}></Input.Search>
    </Layout.Header>
    <Menu mode={'horizontal'}>
      <Menu.Item key={1}>旅游首页</Menu.Item>
      <Menu.Item key={2}>旅游首页</Menu.Item>
      <Menu.Item key={3}>旅游首页</Menu.Item>
    </Menu>
  </div>
}
export default Home
