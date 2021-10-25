import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createBrowserHistory } from 'history';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import persistState from 'redux-localstorage'

import App from '../components/App'
import auth from '../components/auth/Auth'

const history = createBrowserHistory()

const rootReducer = combineReducers({
  auth,
  router: routerReducer
})

const middlewares = [thunkMiddleware, routerMiddleware(history)]

if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const enhancer = compose(
  applyMiddleware(...middlewares),
  persistState('auth', { key: 'AUTH' })
)

const store = createStore(rootReducer, {}, enhancer)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('wrapper')
  )
})