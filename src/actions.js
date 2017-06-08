// This action is for receiving todos from firebase 'child_added',
//  both for initial load and for the listener
const RECEIVE_TODO = 'RECEIVE_TODOS'

const CREATE_TODO = 'CREATE_TODO'
const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS'
const CREATE_TODO_FAILED = 'CREATE_TODO_FAILED'

const UPDATE_TODO = 'UPDATE_TODO'
const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
const UPDATE_TODO_FAILED = 'UPDATE_TODO_FAILED'

const DELETE_TODO = 'DELETE_TODO'
const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
const DELETE_TODO_FAILED = 'DELETE_TODO_FAILED'

const FETCH_TODOS = 'FETCH_TODOS'
const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS'
const FETCH_TODOS_FAILED = 'FETCH_TODOS_FAILED'

const FIREBASE_LISTEN = 'FIREBASE_LISTEN'
const FIREBASE_UNLISTEN = 'FIREBASE_UNLISTEN'

const FIREBASE_CONNECTED = 'FIREBASE_CONNECTED'
const FIREBASE_DISCONNECTED = 'FIREBASE_DISCONNECTED'

export const actionTypes = {
  RECEIVE_TODO,

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

  FIREBASE_LISTEN,
  FIREBASE_UNLISTEN,

  FIREBASE_CONNECTED,
  FIREBASE_DISCONNECTED
}

function action(type, payload = {}) {
  return {type, ...payload}
}

// Todo actions
export const receiveTodo = (todo) => action(RECEIVE_TODO, { todo })

export const createTodo = (todo) => action(CREATE_TODO, { todo })
// This next one is a bit Awkward
// I was having trouble managing with .push() to get a Firebase generated key then updating
// so I just create a temp ID, then replace it with the real one when it comes back from Firebase
export const createTodoSuccess = (todo, oldKey, newKey) => action(CREATE_TODO_SUCCESS, { todo, oldKey, newKey })
export const createTodoFailed = (error, todo) => action(CREATE_TODO_FAILED, { error, todo })

export const updateTodo = (todo) => action(UPDATE_TODO, { todo })
export const updateTodoSuccess = (todo) => action(UPDATE_TODO_SUCCESS, { todo })
export const updateTodoFailed = (error, todo) => action(UPDATE_TODO_FAILED, { error, todo })

export const deleteTodo = (todo) => action(DELETE_TODO, { todo })
export const deleteTodoSuccess = (todo) => action(DELETE_TODO_SUCCESS, { todo })
export const deleteTodoFailed = (error, todo) => action(DELETE_TODO_FAILED, { error, todo })

export const fetchTodos = () => action(FETCH_TODOS)
export const fetchTodosSuccess = (todos) => action(FETCH_TODOS_SUCCESS, { todos })
export const fetchTodosFailed = (error) => action(FETCH_TODOS_FAILED, { error })

// Firebase actions
export const firebaseListen = () => {
  console.log('bout to listen')
  return action(FIREBASE_LISTEN)
}
export const firebaseUnlisten = () => action(FIREBASE_UNLISTEN)

export const firebaseConnected = () => action(FIREBASE_CONNECTED)
export const firebaseDisconnected = () => action(FIREBASE_DISCONNECTED)
