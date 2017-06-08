import * as actions from '../actions'

const types = actions.actionTypes

const todo = {

}

test('receiveTodos action creator', () => {
  const expected = {
    type: types.RECEIVE_TODO,
    todo
  }
  const res = actions.receiveTodo(todo)

  expect(res).toEqual(expected)
})
