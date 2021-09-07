import React from 'react';
import './App.css';
import { stores } from './store'
import { Provider, useLocalObservable } from "mobx-react";
import { HashRouter, Switch, Route } from "react-router-dom";
// import Header from "./components/headerClass";
import Header from "./components/headerHook";
function App() {
  // const TestStore = useLocalObservable(() => ({
  //   Count: 0,
  //   changeCount() {
  //     this.Count = this.Count + 1;
  //   }
  // }))
  return (
    // Provider只是为了兼容class 删了也不会影响hook  useStore 通过context拿数据拿方法
    <Provider {...stores}>
      <HashRouter>
        <Switch>
          <Route component={Header} path="/header" exact></Route>
        </Switch>
      </HashRouter>
    </Provider>

  );
}

export default App;
