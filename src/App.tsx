import React from 'react';
import Notebook from './components/Notebook';
import CloudBackground from './components/CloudBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      <CloudBackground />
      <Notebook />
    </div>
  );
}

export default App;