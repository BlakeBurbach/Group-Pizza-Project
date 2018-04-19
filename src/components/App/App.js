import React, { Component } from 'react';
// import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Menu from '../views/menu.js';
import Checkout from '../views/checkout.js';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Prime Pizza</h1>
        </header>
        <br/>
        <p>Pizza is great.</p>
      
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            </ul>
          </nav>
          <hr />
          <Route exact path="/menu" component={Menu}/>
          <Route path="/checkout" component={Checkout}/>
        </div>  
      </Router>
      </div>
    );
  }
}

export default App;
