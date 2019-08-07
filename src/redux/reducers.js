import { combineReducers } from 'redux'
import { SAVE_DATA } from './const'
const saveData = function (state = null, action) {
  switch (action.type) {
    case SAVE_DATA:
      console.log(SAVE_DATA, state, action.payload)
      return action.payload
    default: return state
  }
}

export default combineReducers({
  saveData
})