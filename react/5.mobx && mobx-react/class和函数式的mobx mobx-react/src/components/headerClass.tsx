import React from "react";
import { observer,ProviderProps, inject} from "mobx-react";

@inject('TestStore')
@observer
class Header extends React.Component<ProviderProps> {
  render(){
    return <div>
      <div>{this.props.TestStore.Count}</div>
      <button onClick={() => {
        this.props.TestStore.changeCount()
        console.log(this.props.TestStore.Count)
      }}>按钮</button>
    </div>
  }
}
export default Header