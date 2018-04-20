import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    console.log('rootSaga loaded');
    yield takeEvery('GET_PIZZAS', fetchSaga);

  }

function* fetchSaga(action){
  try {
      const pizzaResponse = yield call(axios.get, '/api/pizza');
      console.log(pizzaResponse);
      yield put({
          type: 'SET_MENU',
          payload: pizzaResponse.data
      })
  } catch (error) {
    console.log('fetchSaga', error)
  }
}

const pizzaMenu = (state = [], action) => {
    switch (action.type) {
        case 'SET_MENU' :
            return action.payload
        default :
            return state    
    }
}

let menuArray = [{name: 'Splat of Marinara', quantity: 0, cost: 0}, 
{name: 'Onamonapizza', quantity: 0, cost: 0}, {name: 'Pepperoni', quantity: 0, cost: 0},
{name: 'Over the Rainbow', quantity: 0, cost: 0}, {name: 'Chinese Firedragon', quantity: 0, cost: 0},
{name: 'Bad Date', quantity: 0, cost: 0}]

const orderTotal = (state = menuArray, action) => {

    if(action.type === 'ADD_PIZZA'){
        console.log('in ADD_PIZZA');
        
         let newMenuArray = menuArray.map((pizza) => {
            if (pizza.name === action.payload.name){
                pizza.quantity++;
                pizza.cost += parseFloat(action.payload.cost);
            }
            
            return newMenuArray
            
        })
        } if(action.type === 'DELETE_PIZZA') {
            let newMenuArray = menuArray.map((pizza) => {
                if (pizza.name === action.payload.name){
                    pizza.quantity--;
                    pizza.cost-= action.payload.cost;
                }
                return newMenuArray
        })
    }
    return state
}
// const countPizzas = (state = 0, action ) => {
//     switch (action.type) {
//         case 'ADD_PIZZA':
//           return state + 1;
//         case 'REMOVE_PIZZA':
//           return state -1;
//         default:
//           return state 
//       }
// }

const store = createStore(
    combineReducers({ pizzaMenu, orderTotal}),
    applyMiddleware(sagaMiddleware, logger)
  );

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
