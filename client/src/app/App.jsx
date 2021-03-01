import React from 'react';
import { Counter } from '../features/counter/Counter';
import Header from '../home/Header';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Counter />
    </div>
  );
}

export default App;
