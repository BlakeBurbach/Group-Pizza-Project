import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = reduxState => ({
  reduxState,
});

class Checkout extends Component {


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