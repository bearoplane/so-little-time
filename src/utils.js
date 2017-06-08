export const createReducers = (items) => (state, action) => {
  const type = action.type
  const keys = Object.keys(items)

  // If we have a handler for the action type, call that
  if (items.hasOwnProperty(type)) {
    return items[type](...arguments)
  }

  // We didn't hit any
  return { ...state }
}
