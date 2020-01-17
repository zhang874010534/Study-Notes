import React from 'react';
import logo from './logo.svg';
import PropTypes from 'prop-types'
import './App.css';

class Title extends React.Component{
  static contextTypes ={
    themeColor:PropTypes.string,
    changeThemeColor:PropTypes.func,
    阿宝:PropTypes.string
  }
  constructor(props){
    super(props)
    
  }
  render(){
    return <div>
      <h1 style={{color:"red"}}>{this.context.阿宝}</h1>
    </div>
  }
}

class Button extends React.Component{
  static contextTypes={
    themeColor:PropTypes.string,
    changeThemeColor:PropTypes.func,
    阿宝:PropTypes.string
  }
  constructor(props){
    super(props)
    
  }
  render(){
    let {themeColor,changeThemeColor}=this.context
    return <div>
      <button type="button" style={{color:themeColor}}
      onClick={()=>{changeThemeColor("red")}}
      >red</button>
      <button type="button" style={{color:themeColor}}
      onClick={function(){changeThemeColor("green")}} /* 这里只是单纯的调用一下父组件的方法指向无所谓的*/
      >green</button>
    </div>
  }
}

class App extends React.Component{
  static childContextTypes={
    themeColor:PropTypes.string,
    changeThemeColor:PropTypes.func,
    阿宝:PropTypes.string
  }
  getChildContext(){
    return {
      themeColor:this.state.themeColor,
      changeThemeColor:this.changeThemeColor,
      阿宝:"听过的就说了解，看过的就说熟悉，用过的就说熟练，会用的就说精通"
    }
  }
  changeThemeColor=(color)=>{
    this.setState({
      themeColor:color
    })
    // console.log(this);
    
  }
  constructor(props){
    super(props)
    
    this.state={
      themeColor:'red'
    }
  }
  
  render(){
    return <div>
      <Title></Title>
      <Button></Button>
    </div>
  }
}
export default App;
