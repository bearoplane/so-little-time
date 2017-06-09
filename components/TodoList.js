import React from 'react'
import PropTypes from 'prop-types'

import { List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'

import CheckboxBlank from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import Checkbox from 'material-ui/svg-icons/toggle/check-box'
import DeleteIcon from 'material-ui/svg-icons/action/delete'

import TodoItem from './TodoItem'

class TodoList extends React.PureComponent {
  render() {
    const { todos, toggleDone, deleteTodo } = this.props

    // Build Todos list if todos exist and are loaded
    const todosList = !Object.keys(todos) ?
      'Empty' :
      Object.keys(todos).map(key => (
        <TodoItem
          key={key}
          todo={ todos[key] }
          toggleDone={ toggleDone }
          deleteTodo={ deleteTodo }
        />
      ))

    return (
      <List>{ todosList }</List>
    )
  }
}

TodoList.PropTypes = {
  todos: PropTypes.object.isRequired,
  toggleDone: PropTypes.func.isRequired
}

export default TodoList
