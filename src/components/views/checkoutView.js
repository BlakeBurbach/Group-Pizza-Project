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
          
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps)(Checkout);