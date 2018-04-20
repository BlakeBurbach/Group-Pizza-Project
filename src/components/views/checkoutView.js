import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  reduxState,
});

class Checkout extends Component {
state = {
  newOrder: {
    customer_name: '',
    order_total: ''
  }
}

handleChange = (propertyName) => {
  return (event) => {
    this.setState({
      newOrder: {
        ...this.state.newOrder,
        [propertyName]: event.target.value
      }
  });
  }
}

addNewOrder = () => {
  this.props.dispatch({
    type: 'ADD_ORDER', 
    payload: this.state.newOrder
  })
}

    render() {
      let newPizzaDisplay = this.props.reduxState.orderTotal.map((updatedPizza)=> {
        if(updatedPizza.quantity === 0){
          return (<tr key={updatedPizza.id}></tr>)
        } else {
        return (<tr key={updatedPizza.id}>
          <td>{updatedPizza.name}</td>
          <td>{updatedPizza.quantity}</td>
          <td>{updatedPizza.cost}</td>  
          </tr>)
        }
      })
      let pizzaTotal = 0;
     let calcCost = this.props.reduxState.orderTotal.map((totalCost)=> {
        pizzaTotal += parseFloat(totalCost.cost)
        pizzaTotal = parseFloat(pizzaTotal.toFixed(2))
        return totalCost
      })
      
      return (
        <div className="App">

          <p>Checkout</p>
          <form onSubmit={this.addNewOrder}>
            <input type="text" name="customer_name" placeholder="Customer Name" value={this.state.newOrder.customer_name} onChange={this.handleChange('customer_name')}/>
            <input type="number" name="order_total" placeholder="Order Total" value={pizzaTotal} onChange={this.handleChange('order_total')}/>
            <input type="submit" value="Checkout"/>
          </form>
          <table>
            <thead>
              <tr>
                <th>
                  Pizza Name
                </th>
                <th>
                  Quantity
                </th>
                <th>
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {newPizzaDisplay}
            </tbody>
          </table>
          <p>{pizzaTotal}</p>
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Checkout);