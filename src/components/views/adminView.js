import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = reduxState => ({
    reduxState,
  });

  class Admin extends Component {
      state = {
          customerList : []
      }

  getCustomerInfo =()=>{
    axios.get('/api/pizza?id=1').then((response)=>{
        this.setState({
            customerList: response.data
        }); 
        console.log('get customer info', this.state.customerList)
    }).catch(error =>{
        console.log(error)
    })
    }
    
    componentDidMount() {

        this.getCustomerInfo()
        this.props.dispatch(
          {
            type: 'GET_ORDERS',
            // payload: this.state.customerList
        })
    }

    render(){
        
        let customerDisplay = this.state.customerList.map((customer)=> {
            return (<tr key = {customer.id}><td key = {customer.id}>{customer.customer_name}</td><td>{customer.order_total}</td></tr>)
            })

        return(

        <div className="App">
          <p>Pizza Orders Admin View!!</p>
          {/* <pre>{JSON.stringify(this.props.reduxState.orderTotal)}</pre> */}
          <table>
            <thead>
              <tr>
                <th>
                  Customer name
                </th>
                {/* <th>
                  Time order placed
                </th> */}
                <th>
                  Total Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {customerDisplay}
            </tbody>
          </table>
        </div>
        )
    }

    }

  export default connect(mapStateToProps)(Admin);