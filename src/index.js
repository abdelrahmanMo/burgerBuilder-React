import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux'
import burgerBuilderReducer from './store/reducer/burgerBuilder'
import thunk from 'redux-thunk' 
import orederReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder:burgerBuilderReducer,
    order:orederReducer,
    auth:authReducer
})

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
))
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
