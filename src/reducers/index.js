import { combineReducers } from 'redux'

import firebase from './firebase'
import todos from './todos'

export default combineReducers({
  todos,
  firebase
})
