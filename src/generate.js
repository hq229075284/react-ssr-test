import React from 'react'
import App from './app'
import { Provider } from 'react-redux'
import * as actions from './redux/actions'

export { default as createStore } from './redux/store'
export { actions }
export const createApp = (store) => <Provider store={store}>
  <App />
</Provider>
