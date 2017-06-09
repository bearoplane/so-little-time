"use strict"

import { eventChannel, END } from 'redux-saga';
import { all, fork, call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'
import firebase from './firebaseInstance'

// Get actions types and some creators
import {
  actionTypes, // Awkward to have this object here, but it works fine

  receiveTodo,

  createTodoSuccess,
  createTodoFailed,

  updateTodoSuccess,
  updateTodoFailed,

  deleteTodoSuccess,
  deleteTodoFailed,

  fetchTodosSuccess,
  fetchTodosFailed,

  firebaseConnected,
  firebaseDisconnected
} from './actions'
const {
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,

  FETCH_TODOS,

  FIREBASE_LISTEN,
  FIREBASE_UNLISTEN
} = actionTypes

// Some convenience functions for firebase access
function* remove(item) {
  const ref = firebase.database().ref(`/todos/${item.id}`)

  yield call([ref, ref.remove])
}
function* create(item) {
  const ref = firebase.database().ref('/todos')

  const result = yield call([ref, ref.push], item)

  return result.key
}
function* update(item) {
  const ref = firebase.database().ref(`/todos/${item.id}`)

  yield call([ref, ref.update], item)
}
function* getAll() {
  const ref = firebase.database().ref('/todos')

  const data = yield call([ref, ref.once], 'value');

  return data.val();
}

export function* watchCreateTodo(action) {
  console.log('watchCreateTodo')
  const { todo } = action
  const tmpId = todo.id
  try {
    const newKey = yield call(create, todo)
    // This is weird, because we are overwriting the temp object
    // We need the old ID, aka the ID of the todo that was dispatched
    // from the component
    yield put(createTodoSuccess(todo, tmpId, newKey))
  }
  catch (error) {
    yield put(createTodoFailed(error, todo))
  }
}
export function* watchUpdateTodo(action) {
  const { todo } = action
  try {
    yield call(update, todo)
    yield put(updateTodoSuccess(todo))
  }
  catch (error) {
    yield put(updateTodoFailed(error, todo))
  }
}
export function* watchDeleteTodo(action) {
  const { todo } = action
  try {
    yield call(remove, todo)
    yield put(deleteTodoSuccess(todo))
  }
  catch (error) {
    yield put(deleteTodoFailed(error, todo))
  }
}

export function* watchFetchTodos(action) {
  try {
    const todos = yield call(getAll)
    yield put(fetchTodosSuccess(todos))
  }
  catch (error) {
    yield put(fetchTodosFailed(error))
  }
}


export function firebaseChannel() {
  return eventChannel(emitter => {
    const iv = firebase.database().ref('/todos').on('child_added',
    // make sure to overwrite with the correct id
      s => emitter({
        [s.key]: {
          ...s.val(),
          id: s.key
        }
      })
    )
    // The subscriber must return an unsubscribe function
    return () => {
      // yield put(firebaseUnlisten())
      emitter(END)
    }
  })
}
export function* watchFirebaseListen() {
  const chan = yield call(firebaseChannel)
  try {
    while (true) {
      let todo = yield take(chan)
      yield put(receiveTodo(todo))
    }
  } finally {
    console.log('Firebase connection terminated')
  }
}

export function* watchFirebaseUnlisten(action) {
  console.log('watchFirebaseUnlisten')
  try {
    firebase.database().ref('/todos').off('child_added')
    yield put(firebaseDisconnected())
  }
  catch (error) {
    console.log('Error unlistening to Firebase')
  }
}

export default function* rootSaga() {
  yield [
    takeEvery('CREATE_TODO', watchCreateTodo),
    takeEvery('UPDATE_TODO', watchUpdateTodo),
    takeEvery('DELETE_TODO', watchDeleteTodo),

    takeLatest('FETCH_TODOS', watchFetchTodos),

    takeEvery('FIREBASE_LISTEN', watchFirebaseListen),
    takeEvery('FIREBASE_UNLISTEN', watchFirebaseUnlisten)
  ]
}
