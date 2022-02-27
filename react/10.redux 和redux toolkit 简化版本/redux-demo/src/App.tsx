import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import store from './redux/store'
import { createLearnAction } from './redux/learnReducer/learnAction'
function App() {
  const [state, setState] = useState(store.getState())
  store.subscribe(() => {
    setState(store.getState())
  })
  function add() {
    const action = createLearnAction(10)
    store.dispatch(action)
  }
  return (
    <div className="App">
      <button onClick={add}>按钮</button>
      {state.learnReducer}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
