import React from 'react'
import PropTypes from 'prop-types'

import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class NewTodoItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (e) => {
    console.log('hey there', e.target.value)
    this.setState({ value: e.target.value });
  }

  render() {
    const { addTodo } = this.props
    const { value } = this.state

    return (
      <div>
        <TextField
          hintText="What do you need to do?"
          id="text-field-controlled"
          value={ value }
          onChange={this.handleChange}
        />
        <FloatingActionButton onClick={ e => addTodo(value) } >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

NewTodoItem.PropTypes = {
  addTodo: PropTypes.func.isRequired
}

export default NewTodoItem
