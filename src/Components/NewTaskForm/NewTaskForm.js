import React from 'react'
import { PropTypes } from 'prop-types'

import Style from './NewTaskForm.module.css'
const NewTaskForm = (props) => {
  let state = {}
  function handleSubmit(e) {
    e.preventDefault()
    if (state.min && state.sec && state.name) {
      props.addTask(state)
      e.preventDefault()
      e.target.reset()
      console.log(state)
    } else {
      console.log('no', state)
    }
  }

  function handleInputChange(e) {
    const target = e.target
    const value = target.value
    const name = target.name

    parseInt(value) ? (state[name] = value / 1) : null
    name === 'name' ? (state[name] = value) : null
  }
  function InputTime(props) {
    return (
      <input
        className={Style.inputTime}
        min={props.min}
        max={props.max}
        type="number"
        name={props.name}
        placeholder={props.name}
        onChange={handleInputChange}
      ></input>
    )
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className={Style.new_todo}
          placeholder="What needs to be done?"
          onChange={handleInputChange}
          autoFocus
        ></input>
        {<InputTime name="min" min={0} max={60} />}
        {<InputTime name="sec" min={0} max={60} />}
        <button className={Style.hidden} type="submit">
          Submit
        </button>
      </form>
    </header>
  )
}

NewTaskForm.defaultProps = {
  addTask: () => {},
}

NewTaskForm.propTypes = {
  addTask: PropTypes.func,
}

export default NewTaskForm
