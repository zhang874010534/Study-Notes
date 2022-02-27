import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from "./redux/hook";
import { useDispatch } from "react-redux";
import { learnSlice, loadData } from "./redux/learn/slice";
function App() {
  const count = useSelector(state => state.learnReducer.count)
    useDispatch()
  const dispatch = useDispatch()
  function add() {
    dispatch(learnSlice.actions.increment(10))
    dispatch(loadData(22))
  }
  return (
    <div className="App">
      <button onClick={add}>111</button>
      {count}
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
