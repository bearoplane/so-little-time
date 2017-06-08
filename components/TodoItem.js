import React from 'react'
import Link from 'next/link'

class TodoItem extends React.Component {
  render() {
    const { data, toggleDone, deleteTodo } = this.props
    return (
      <li>
        <strong>{ data.text }</strong>
        <input type="checkbox" value={data.done} onChange={ toggleDone(data) } />
        <button onClick={ deleteTodo(data) }>Remove</button>
      </li>
    )
  }
}

export default TodoItem
