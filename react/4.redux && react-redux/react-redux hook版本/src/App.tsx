import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
const App:React.FC  = () => {
  return <div>
    <BrowserRouter>
      <Switch>
        <Route path="/home/:touristId" component={Home} exact></Route>
        <Route path="/signIn" render={() => <div>signIn</div>}></Route>
        <Route render={() => <div>404 </div>}></Route>
      </Switch>
      
    </BrowserRouter>
  </div>
}

export default App;
  