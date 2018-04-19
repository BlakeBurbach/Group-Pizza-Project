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

  handleChange = (event)  => {
    // console.log('event happended')
    this.setState({
        newOrder: {
            ...this.state.newOrder,
            [event.target.name]: event.target.value,
        }
    });
}
  addNewOrder = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'ADD_ORDER', payload: this.state.newOrder })
    this.setState({
      newOrder: {
        customer_name: '',
        order_total: ''
      }
    })
  }

    render() {
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
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Checkout);