// React-redux-firebase needs you to manually include XMLHttpRequest
//  seems fishy but it works
/*
import { XMLHttpRequest } from 'xmlhttprequest'
if (typeof global === 'object')
  global.XMLHttpRequest = XMLHttpRequest
*/
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import rootReducer from './reducers/index'

export default function configureStore (initialState, history) {
  const devTools = (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') ?
    window.devToolsExtension() :
    f => f

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
