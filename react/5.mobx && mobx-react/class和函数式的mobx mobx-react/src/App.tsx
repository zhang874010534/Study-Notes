import React from 'react';
import './App.css';
import stores from './store'
import { Provider } from "mobx-react";
import { HashRouter, Switch, Route } from "react-router-dom";
// import Header from "./components/headerClass";
import Header from "./components/headerHook";
function App() {
  return (
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
