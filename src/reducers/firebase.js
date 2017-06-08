import { createReducers } from '../utils'

import { actionTypes } from '../actions'
const {
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILED,

  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILED,

  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILED,

  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILED,

  FIREBASE_CONNECTED,
  FIREBASE_DISCONNECTED
} = actionTypes;

export default function firebase (state, action) {
  const { type, todo, error } = action
  let newState, toDelete, toUpdate, toRevert
  switch (type) {
    case CREATE_TODO: return { ...state, creating: true }
    case CREATE_TODO_SUCCESS: return { ...state, creating: false, error: null }
    case CREATE_TODO_FAILED: return { ...state, creating: false, error: action.error }

    case UPDATE_TODO: return { ...state, updating: true }
    case UPDATE_TODO_SUCCESS: return { ...state, updating: false, error: null }
    case UPDATE_TODO_FAILED: return { ...state, updating: false, error: action.error }

    case DELETE_TODO: return { ...state, deleting: true }
    case DELETE_TODO_SUCCESS: return { ...state, deleting: false, error: null }
    case DELETE_TODO_FAILED: return { ...state, deleting: false, error: action.error }

    case FETCH_TODOS: return { ...state, fetching: true }
    case FETCH_TODOS_SUCCESS: return { ...state, fetching: false, error: null }
    case FETCH_TODOS_FAILED: return { ...state, fetching: false, error: action.error }

    case FIREBASE_CONNECTED: return { ...state, listening: true }
    case FIREBASE_DISCONNECTED: return { ...state, listening: false }

    default: return { ...state }
  }
}
