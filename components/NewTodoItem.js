import React from 'react'

class NewTodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  onAddTodo = (e) => {
    const { addTodo } = this.props
    const { value } = this.state

    const todo = {
      text: value,
      done: false,
      timestamp: +new Date
    }
console.log('todo', todo)
    addTodo(todo)
  }

  render() {
    const { value } = this.state

    return (
      <div>
        <input onChange={this.handleChange} type="text" value={value} />
        <button onClick={ this.onAddTodo }>add</button>
      </div>
    )
  }
}

export default NewTodoItem
