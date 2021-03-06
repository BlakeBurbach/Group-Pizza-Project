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
    yield takeEvery('GET_PIZZAS', fetchSaga); 
    yield takeEvery('ADD_ORDER', postSaga);
}

function* fetchSaga(action) {
    try {
        const pizzaResponse = yield call(axios.get, '/api/pizza');
        console.log('GET pizzaResponse', pizzaResponse);
        yield put({
            type: 'SET_MENU',
            payload: pizzaResponse.data
        })
    } catch (error) {
        console.log('fetchSaga ERROR', error)
    }
}

function* postSaga(action) {
    try {
        parseFloat(action.payload.order_total)
        yield call(axios.post, '/api/pizza', action.payload);
        yield put({
            type: 'GET_PIZZAS'
        })
    } catch (error) {
        console.log('postSaga ERROR', error)
    }
}


const pizzaMenu = (state = [], action) => {
    switch (action.type) {
        case 'SET_MENU':
            console.log('SET_MENU', action.payload)
            return action.payload
        default:
            return state
    }
}


let menuArray = [{ id: 1, name: 'Splat of Marinara', quantity: 0, cost: 0 },
{ id: 2, name: 'Onamonapizza', quantity: 0, cost: 0 }, { id: 3, name: 'Pepperoni', quantity: 0, cost: 0 },
{ id: 4, name: 'Over the Rainbow', quantity: 0, cost: 0 }, { id: 5, name: 'Chinese Firedragon', quantity: 0, cost: 0 },
{ id: 6, name: 'Bad Date', quantity: 0, cost: 0 }]


const orderTotal = (state = menuArray, action) => {

    if (action.type === 'ADD_PIZZA') {
        console.log('in ADD_PIZZA');

        let newMenuArray = menuArray.map((pizza) => {
            if (pizza.name === action.payload.name) {
                pizza.quantity++;
                pizza.cost += parseFloat(action.payload.cost);
                pizza.cost = parseFloat(pizza.cost.toFixed(2));
                
            }
            return pizza;
        })
        return newMenuArray
} else if (action.type === 'DELETE_PIZZA') {
    let newMenuArray = menuArray.map((pizza) => {
        if (pizza.name === action.payload.name) {
            pizza.quantity--;
            pizza.cost -= parseFloat(action.payload.cost);
            pizza.cost = parseFloat(pizza.cost.toFixed(2));
        }
        return pizza;
    })
    return newMenuArray
}
return menuArray

}


const store = createStore(
    combineReducers({ pizzaMenu, orderTotal }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
