import React from 'react'
// import App from './app'
import { Provider } from 'react-redux'
import * as actions from './redux/actions'

export { default as routes } from './routes'
export { default as createStore } from './redux/store'
export { actions }
export function createApp(store, children) {
  // console.log(children)
  return <Provider store={store}>{children}</Provider>
}
