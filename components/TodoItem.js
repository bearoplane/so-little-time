import React from 'react'
import PropTypes from 'prop-types'

import { List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

import CheckboxBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import Checkbox from 'material-ui/svg-icons/toggle/check-box'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

export default ({ todo, deleteTodo, toggleDone }) => {
  return (
    <ListItem
      primaryText={ todo.text }
      leftIcon={ todo.done ? <Checkbox /> : <CheckboxBlank /> }
      rightIconButton={ <IconButton onClick={ e => {
        // Although the Material-UI docs specify that the rightIconButton
        // will automatically NOT bubble up, it does for some reason...
        e.stopPropagation()
        deleteTodo(todo)
      } }><DeleteIcon /></IconButton> }
      onClick={ e => toggleDone(todo) }
    />
  )
}
