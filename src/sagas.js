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

const basePath = '/todos'
const baseRef = firebase.database().ref(basePath)

const fb = {
  update: (item) => {
    return getRefById(item.id).update(item)
  },
  remove: (item) => {
    return getRefById(item.id).remove()
  },
  getAll: () => {
    return baseRef.once('child_added', snapshot => snapshot.val())
  },
  listen: () => {
    return baseRef.on('child_added', snapshot => snapshot.val())
  },
  unlisten: () => {
    return baseRef.off('child_added')
  }
}

function* remove(item) {
  const ref = firebase.database().ref(`${basePath}/${item.id}`)

  yield call([ref, ref.remove])
}
function* create(item) {
  const result = yield call([baseRef, baseRef.push], item)

  return result.key
}

function* getAll() {
  const data = yield call([baseRef, baseRef.once], 'value');

  return data.val();
}

export function* watchCreateTodo(action) {
  console.log('watchCreateTodo')
  const { todo } = action
  const tmpId = todo.id
  try {
    const newKey = yield call(create, todo)
    yield put(createTodoSuccess(todo, tmpId, newKey))
  }
  catch (error) {
    yield put(createTodoFailed(error, todo))
  }
}
export function* watchUpdateTodo(action) {
  console.log('watchUpdateTodo')
  const { todo } = action
  try {
    yield call(fb.update, todo)
    yield put(updateTodoSuccess(todo))
  }
  catch (error) {
    yield put(updateTodoFailed(error, todo))
  }
}
export function* watchDeleteTodo(action) {
  console.log('watchDeleteTodo')
  const { todo } = action
  try {
    yield call(remove, todo)
    console.log('DONE!')
    yield put(deleteTodoSuccess(todo))
  }
  catch (error) {
    yield put(deleteTodoFailed(error, todo))
  }
}

export function* watchFetchTodos(action) {
  console.log('watchFetchTodos')
  try {
    const todos = yield call(getAll)
    console.log('todos', todos)
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

/*
export function* watchFirebaseListen(action) {
  console.log('watchFirebaseListen')
  try {
    yield put(firebaseConnected())
    while (true) {
      console.log('looping')
      let todo = yield take(fb.listen)
      yield put(receiveTodo(todo))
    }
  } finally {
    console.log('Firebase connection terminated')
    yield put(firebaseDisconnected())
  }
}
*/
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
