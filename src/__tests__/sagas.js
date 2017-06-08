import { sendTodo, sendToFirebase } from '../sagas'
import { call } from 'redux-saga/effects'

test('sendTodo saga', () => {
  const todo = {}
  const gen = sendTodo(todo)

  expect(gen.next().value).toEqual(call(sendToFirebase, todo))

  expect(gen.next().done).toEqual(true)
})

test('', () => {

})
