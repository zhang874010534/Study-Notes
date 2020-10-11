import React, { Component ,Fragment} from 'react';
// import store from './store/index'
import {connect} from 'react-redux'

class App extends Component {
  constructor(props){ 
    super(props)
    this.state={}
  }
  render(){
    return <Fragment>
      <div>
        <input type="text" value={this.props.inputValue} onChange={this.props.changeInput}/>
        <button onClick={this.props.handleClick}>提交</button>
      </div>
      <ul>
        {
          this.props.list.map((item,index)=>{
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </Fragment>
  }
}
const mapStateToProps=(state)=>{
  return {
    inputValue:state.inputValue,
    list:state.list
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    changeInput(e){
      const action={
        type:'change_input',
        value:e.target.value
      }
      dispatch(action)
    },
    handleClick(){
      const action={
        type:'add_item'
      }
      dispatch(action)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)