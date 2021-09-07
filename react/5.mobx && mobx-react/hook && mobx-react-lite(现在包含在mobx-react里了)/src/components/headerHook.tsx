import React from "react";
import { observer, inject, useObserver} from "mobx-react";
import { useStore } from '../store'
interface PropsType {
  TestStore: any
}

//1.observer
// const Header: React.FC<PropsType> = observer((props) => {
//   // 这就拿到context了
//   let store = useStore();
//   return <div>
//       {store.TestStore.Count}
//       <button onClick={() => {
//         store.TestStore.changeCount()
//       }}>按钮</button>
//   </div>
// })

//2.useObserver
const Header: React.FC<PropsType> = (props) => {
  // 可以通过context的Provider把store传下来  context的Consumer来拿到store
  
  // 也可以直接这样子拿
  // 这就拿到store了
  let store = useStore();
  return useObserver(() => 
    <div>
      {store.TestStore.Count}
      <button onClick={() => {
        store.TestStore.changeCount()
      }}>按钮</button>
    </div>
  )
}
export default Header