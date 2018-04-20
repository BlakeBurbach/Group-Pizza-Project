import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = reduxState => ({
  reduxState,
});

class Menu extends Component {
  state = {
    count: 0
  }
    componentDidMount() {
        this.props.dispatch(
          {
            type: 'GET_PIZZAS'
        }
      )
    }

    handleAddClick = () => {
      return (event, pizzaId) => {
        console.log('handle add', event.target.value)
        let pizzaToSend = JSON.parse(event.target.value)
        return this.props.dispatch({
          type: 'ADD_PIZZA',
          payload: pizzaToSend
        })
      }
    }


    handleSubtractClick = () => {
       return (event) => {
        console.log('handle subtract', event.target.value)
        let pizzaToSend = JSON.parse(event.target.value)
        return this.props.dispatch({
          type: 'REMOVE_PIZZA',
          payload: pizzaToSend
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
        <button value={JSON.stringify(pizza)} onClick={this.handleAddClick()}>+</button>
        {this.props.reduxState.countPizzas}
        <button value={JSON.stringify(pizza)} onClick={this.handleSubtractClick()}>-</button>
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