import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router'
import './index.css';
import {Provider} from 'react-redux'
import configureStore from './redux/store/configfureStore'
import reportWebVitals from './reportWebVitals';

const store = configureStore();
// const store = createStore(rootReducer,composeWithDevTools())

ReactDOM.render(
  <Provider store = {store}>
    <Router/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
