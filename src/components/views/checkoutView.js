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
            <input type="submit" value="Checkout"/>
          </form>
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Checkout);