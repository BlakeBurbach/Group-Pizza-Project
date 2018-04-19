import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Menu from '../views/menuView'
import Checkout from '../views/checkoutView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Prime Pizza</h1>
        </header>
        <br/>
        <p>Pizza is great.</p>
      </div>
    );
  }
}

export default App;
