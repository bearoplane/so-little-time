import { actionTypes } from '../actions'
const {
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

  FETCH_TODOS_SUCCESS
} = actionTypes;

/* todos: {
 *   data: { [key]: todo, [key]: todo, ... },
 *   deleted: { [key]: todo },
 *   updated: { [key]: todo }
 * }
 * `todos` and `firebase` could be broken into separate files,
 *  just leaving them together here
 */
/*
 * NB: Make sure to ...spread todos as they come here lookin like {[key]: todo}
 */
 const defaultState = {
   data: {},
   deleted: {},
   updated: {}
 }
export default function todos (state = defaultState, action) {
  // We have to share these among all of the cases in the switch statement
  let { type, todo, error } = action
  let newState, toDelete, toUpdate, toRevert, newData

  switch (type) {
    // the todo comes back as { [key]: data }, so we can ...spread it into state
    // Just a straight merge, gonna overwrite whats there (okay for now)
    case RECEIVE_TODO:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.todo
        }
      }
    case CREATE_TODO:
      // This is a bit weird, but when creating the object look like { ... }
      // whereas with RECEIVE_TODO, it looks like { key: { ... } }
      return {
        ...state,
        data: {
          ...state.data,
          [action.todo.id]: action.todo
        }
      }
    // move from `data` to `deleted` where it gets ignored (unless we revert)
    case DELETE_TODO:
      console.log("ABOUT TO DELETE!", state, action)
      // TODO: check if I need to object.assign or if I can just use the object
      newData = { ...state.data }
      toDelete = newData[action.todo.id]

      // TODO: make sure the todo exists before trying to delete
      delete newData[action.todo.id]

      return {
        ...state,
        data: {
          ...newData
        },
        deleted: toDelete
      }
    case UPDATE_TODO:
      // This is just gonna overwrite with new data, make sure the data is good!
      toUpdate = state.data[todo.id]
      // We want a new object so we can store the old one
      // this should merge the entity keys, not the entities
      // aka, { text, id, ... } not { [key]: toUpdate, [key]: todo }
      return {
        ...state,
        data: {
          ...state.data,
          [todo.id]: {
            ...toUpdate,
            ...todo
          }
        },
        updated: toUpdate
      }
    case CREATE_TODO_FAILED:
      // Clone to avoid side-effects, keep it PUUURE
      newState = { ...state }

      // TODO: make sure the todo exists before trying to remove it
      delete newState.data[todo.id]

      // remove todo from store
      return { ...newState }
    case DELETE_TODO_FAILED:
      toRevert = state.deleted

      // make sure the item exists in `deleted`
      if (toRevert && toRevert.hasOwnProperty(todo.id)) {
        return {
          ...state,
          data: {
            ...state.data,
            ...toRevert
          },
          deleted: {}
        }
      // If there was no `deleted` we can't revert (ideally this never happens!)
      } else {
        return {
          ...state
        }
      }
    case UPDATE_TODO_FAILED:
      toRevert = state.updated

      // make sure the item exists in `updated`
      if (toRevert && toRevert.hasOwnProperty(todo.id)) {
        return {
          ...state,
          data: {
            ...state.data,
            ...toRevert
          },
          updated: {}
        }
      // If there was no `updated` we can't revert (ideally this never happens!)
      } else {
        return {
          ...state
        }
      }

    // We already optimistically stored the todos, so on success we leave em,
    //  just update the flags
    case DELETE_TODO_SUCCESS:
    console.log('delete succeeded!')
      return {
        ...state,
        deleted: {}
      }
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        updated: {}
      }
    // This next one is a weird one
    // Because we don't have the ID from Firebase yet, we created a temp item
    // which we delete when we add the new one, causing the jitter
    // There is a solution to this but I don't have time to solve it
    case CREATE_TODO_SUCCESS:
      // First remove the temp one from the store
      newData = { ...state.data }

      delete newData[action.oldKey]

      return {
        ...state,
        data: {
          ...newData,
          [action.newKey]: {
            ...action.todo,
            id: action.newKey
          }
        }
      }
    case FETCH_TODOS_SUCCESS:
      // We get an object like { key: { ... }, key: { ... } } from Firebase
      // just assign them to data

      const populatedItems = Object.keys(action.todos).reduce((ret, key) => {
        ret[key] = {
          id: key,
          ...action.todos[key]
        }
        return ret
      }, {})

      return {
        ...state,
        data: populatedItems
      }
    default:
      return { ...state }
  }
}
