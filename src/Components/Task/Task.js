import React from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { PropTypes } from 'prop-types'

import './Task.css'
import Timer from '../Timer/Timer'

const Task = (props) => {
  function keyDown(e) {
    if (e.key === 'Enter') {
      props.onTypeChange(props.task.id, 'view')
      props.onEdited(props.task.id, e.target.value)
    }
  }

  function Check() {
    props.onTypeChange(props.task.id, props.task.type === 'completed' ? 'view' : 'completed')
  }

  function Edit() {
    props.onTypeChange(props.task.id, 'editing')
  }

  function Destroy() {
    props.onDeleted(props.task.id)
  }

  return (
    <li className={props.task.type ? props.task.type : null}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onClick={Check}
          onChange={() => {}}
          checked={props.task.type === 'completed'}
        ></input>
        <label>
          <span className="description">
            {props.task.description}
            {props.task.type !== 'completed' ? (
              <Timer timer={props.task.timer} onEditTime={props.onEditTime} task={props.task} onStart={props.onStart} />
            ) : null}
          </span>
          <span className="created">
            {formatDistanceToNow(
              new Date(
                props.task.time.year,
                props.task.time.month,
                props.task.time.date,
                props.task.time.hours,
                props.task.time.minutes,
                props.task.time.seconds
              )
            )}
          </span>
        </label>
        <button className="icon icon-edit" onClick={Edit}></button>
        <button onClick={Destroy} className="icon icon-destroy"></button>
      </div>
      {props.task.type === 'editing' ? (
        <input type="text" className="edit" defaultValue={props.task.description} onKeyDown={keyDown}></input>
      ) : null}
    </li>
  )
}
Task.defaultProps = {
  task: {
    id: 0,
    type: 'view',
    description: 'Loading',
    time: {
      year: 2023,
      month: 1,
      date: 10,
      hours: 12,
      minutes: 12,
      seconds: 12,
    },
  },
  onTypeChange: () => {},
  onDeleted: () => {},
  onEdited: () => {},
}
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    description: PropTypes.string,
    time: PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
      date: PropTypes.number,
      hours: PropTypes.number,
      minutes: PropTypes.number,
      seconds: PropTypes.number,
    }),
  }),
  onTypeChange: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
}

export default Task
