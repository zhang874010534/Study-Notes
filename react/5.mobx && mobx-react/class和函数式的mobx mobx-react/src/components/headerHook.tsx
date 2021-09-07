import React from "react";
import { observer, inject} from "mobx-react";

interface PropsType {
  TestStore: any
}
const Header: React.FC<PropsType> = (props) => {
  return <div>
    <div>{props.TestStore.Count}</div>
    <button onClick={() => {
      props.TestStore.changeCount()
    }}>按钮</button>
  </div> 
}
// @inject('TestStore')
// @observer
// class Header extends React.Component<ProviderProps> {
//   render(){
//     return <div>
//       <div>{this.props.TestStore.Count}</div>
//       <button onClick={() => {
//         this.props.TestStore.changeCount()
//         console.log(this.props.TestStore.Count)
//       }}>按钮</button>
//     </div>
//   }
// }
export default inject('TestStore')(observer(Header))