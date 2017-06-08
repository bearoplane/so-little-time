import { map } from 'lodash'
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'

import withRedux from 'next-redux-wrapper'
import configureStore from '../src/store'
import * as actions from '../src/actions'

import Link from 'next/link'
import Head from 'next/head'
import TodoItem from '../components/TodoItem'
import NewTodoItem from '../components/NewTodoItem'

const isLoaded = function () {
  if (!arguments || !arguments.length) {
    return true
  }

  return map(arguments, a => a !== undefined).reduce((a, b) => a && b)
}
const isEmpty = data => data === {}

class Index extends React.Component {
  static getInitialProps({store, isServer, pathname, query}) {
    store.dispatch(actions.fetchTodos())

console.log('loaded!')
    return {
      data: {}
    }

  }

  componentWillMount = () => {
    console.log('will mount')
    this.props.firebaseListen()
  }
  componentWillUnmount = () => {
    this.props.firebaseUnlisten()
  }

  addTodo = (todo) => {
    // unless you add more than one todo per millisecond... we should be okay
    // for the purposes of this app
    const id = +new Date
    console.log('adding todo', todo)
    this.props.createTodo({
      id,
      ...todo
    })
  }

  toggleDone = (todo) => () => {
    const newTodo = {
      ...todo,
      done: !todo.done
    }
    this.props.updateTodo(newTodo)
  }

  deleteTodo = (todo) => () => {
    this.props.deleteTodo(todo)
  }

  render() {
    const { firebase, todos } = this.props;

    // Build Todos list if todos exist and are loaded
    const todosList = !isLoaded(todos)
      ? 'Loading'
      : isEmpty(todos)
        ? 'Todo list is empty'
        : Object.keys(todos).map(key => (
          <TodoItem
            key={key}
            data={todos[key]}
            toggleDone={this.toggleDone}
            deleteTodo={this.deleteTodo}
          />
        ))

    return (
      <div>
        <ol>{ todosList }</ol>

        <div>
          <NewTodoItem
            addTodo={this.addTodo}
          />
        </div>
      </div>
    )
  }
}

export default withRedux(
  configureStore,
  state => ({
    todos: state.todos.data,
    removed: state.todos.removed,
    updated: state.todos.updated,
    connected: state.firebase.connected
  }),
  dispatch => bindActionCreators(actions, dispatch)
)(Index)
