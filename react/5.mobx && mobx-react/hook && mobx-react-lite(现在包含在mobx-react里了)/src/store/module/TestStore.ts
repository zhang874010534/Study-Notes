import { observable, action, makeAutoObservable} from "mobx";
import { useLocalObservable } from "mobx-react";

//1.class的方式创建store
// 6.0语法
class TestStore {
  Count = 0;
  constructor(){
    makeAutoObservable(this)
  }
  @action changeCount = () => {
    this.Count = this.Count + 1;
  }
}
// 5.0语法
// class TestStore {
//   @observable Count = 0;
//   @action changeCount = () => {
//     this.Count = this.Count + 1;
//   }
// }
// export default new TestStore()

//2. 函数式的方式创建store 好像不太行会报错 得放函数里执行
// const TestStore = useLocalObservable(() => ({
//   Count: 0,
//   changeCount() {
//     this.Count = this.Count + 1;
//   }
// }))
export default new TestStore()