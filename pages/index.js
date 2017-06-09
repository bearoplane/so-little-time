import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import withRedux from 'next-redux-wrapper'
import configureStore from '../src/store'
import * as actions from '../src/actions'

import TodoList from '../components/TodoList'
import NewTodoItem from '../components/NewTodoItem'

import {deepOrange500} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

// TODO: find out if this goes here or in the appWrapper component??
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
try {
    injectTapEventPlugin();
} catch(e) {}

class Index extends React.Component {
  static getInitialProps({store, isServer, pathname, query}) {
    if (isServer) {
      store.dispatch(actions.fetchTodos())
    }

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

  addTodo = (text) => {
    // unless you add more than one todo per millisecond... we should be okay
    // for the purposes of this app
    const id = +new Date

    this.props.createTodo({
      id,
      text,
      done: false,
      timestamp: +new Date
    })
  }

  toggleDone = (todo) => {
    this.props.updateTodo({
      ...todo,
      done: !todo.done
    })
  }

  deleteTodo = (todo) => {
    this.props.deleteTodo(todo)
  }

  render() {
    const { todos } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <TodoList
            todos={todos}
            toggleDone={this.toggleDone}
            deleteTodo={this.deleteTodo}
          />

          <NewTodoItem
            addTodo={this.addTodo}
          />
        </div>
      </MuiThemeProvider>
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
