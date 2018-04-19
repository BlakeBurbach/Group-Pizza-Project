import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = reduxState => ({
  reduxState,
});

class Menu extends Component {

    componentDidMount() {
        this.props.dispatch(
          {
            type: 'GET_PIZZAS'
        }
      )
    }

    handleAdd = () => {
      return (event) => {
        console.log('handle add', event.target.value)
        this.props.dispatch({
          type: 'ADD_PIZZA', 
          payload: event.target.value
        })
      }
    }


    handleSubtract = () => {
      return (event) => {
        console.log('handle subtract', event.target.value)
        this.props.dispatch({
          type: 'REMOVE_PIZZA',
          payload: event.target.value 
        })
      }
    }


    render() {
      let pizzaDisplay = this.props.reduxState.pizzaMenu.map((pizza)=> {
      return (
        <div key = {pizza.id}>
        <p>{pizza.name}</p>
        <pre>{pizza.description}</pre> 
        <pre>{pizza.cost}</pre>
        <button value={pizza.id} onClick={this.handleAdd()}>+</button>
        {this.props.reduxState.countPizzas}
        <button value={pizza.id} onClick={this.handleSubtract()}>-</button>
        </div>
        )
      })
      return (

        <div className="App">

          <p>Pizza Menu</p>
          {/* <pre>{JSON.stringify(this.props.reduxState.pizzaMenu)}</pre> */}
          <div>
            {pizzaDisplay}
          </div>

        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Menu);