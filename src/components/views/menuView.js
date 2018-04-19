import React, { Component } from 'react';


class Menu extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_PIZZAS'
        })
     }

    render() {
      return (
        <div className="App">

          <p>Pizza Menu</p>
          <div>
            
          </div>

        </div>
      );
    }
  }
  
  export default Menu;