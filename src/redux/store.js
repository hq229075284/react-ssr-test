import { createStore } from 'redux'
import reducers from './reducers'
export default (initState = {}) => createStore(reducers, initState)