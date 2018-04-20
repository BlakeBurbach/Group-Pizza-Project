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

handleChange = (event) => {
  this.setState({
    newOrder: {
        ...this.state.newOrder,
        [event.target.name]: event.target.value,
    }
});
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
      return (
        <div className="App">

          <p>Checkout</p>
          <form onSubmit={this.addNewOrder}>
            <input type="text" name="customer_name" placeholder="Customer Name" value={this.state.newOrder.customer_name} onChange={this.handleChange}/>
            <input type="text" name="order_total" placeholder="Order Total" value={this.state.newOrder.order_total} onChange={this.handleChange}/>
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
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Checkout);