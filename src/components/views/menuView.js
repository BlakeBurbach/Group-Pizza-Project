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
  
  export default connect(mapStateToProps)(Menu);