import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  reduxState,
});

class Menu extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_PIZZAS'
        })

     }

    // handleAdd = (event) => {
    //   console.log('handle add', event.target.value)
      
    // }

    handleAdd = (event) =>{
      let translatedPizza = JSON.parse(event.target.value)
      console.log('Passing through handleAdd: ', translatedPizza);
      
        this.props.dispatch({
          type: 'ADD_PIZZA',
          payload: translatedPizza
        })
    }

    handleSubtract = (event) => {
      console.log('handle subtract', event.target.value)
      this.props.dispatch({
        type: 'REMOVE_PIZZA'
      })
    }


    render() {
      let pizzaDisplay = this.props.reduxState.pizzaMenu.map((pizza)=> {
      return (<div key = {pizza.id}><p>{pizza.name}</p> <pre>{pizza.description}</pre> <pre>{pizza.cost}</pre><button value={JSON.stringify(pizza)} onClick={this.handleAdd}>+</button>Pizza<button value={pizza.id} onClick={this.handleSubtract}>-</button></div>)
      })
      return (

        <div className="App">

          <p>Pizza Menu</p>
          <pre>{JSON.stringify(this.props.reduxState.orderTotal)}</pre>
          <div>
            {pizzaDisplay}
          </div>

        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Menu);