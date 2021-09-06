import { observable, action, makeAutoObservable } from "mobx";

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
export default new TestStore()