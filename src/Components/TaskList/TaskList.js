// eslint-disable-next-line import/order
import Task from '../Task/Task'

import React from 'react'
import './TaskList.css'
import { PropTypes } from 'prop-types'

const TaskList = (props) => {
  let typeSort = props.Sort.find((el) => el.active === true)

  let ElementsTasks

  // eslint-disable-next-line default-case
  switch (typeSort.name) {
    case 'All':
      ElementsTasks = props.Tasks.map((el) => el)
      break
    case 'Active':
      ElementsTasks = props.Tasks.filter((el) => el.type === 'view')
      break
    case 'Completed':
      ElementsTasks = props.Tasks.filter((el) => el.type === 'completed')
      break
  }

  let NewElementsTasks = ElementsTasks.map((el) => (
    <Task
      task={el}
      key={el.id}
      onTypeChange={props.onTypeChange}
      onDeleted={props.onDeleted}
      onEdited={props.onEdited}
      onEditTime={props.onEditTime}
      onStart={props.onStart}
    />
  ))

  return (
    <div>
      <ul className="todoList">{NewElementsTasks}</ul>
    </div>
  )
}

TaskList.propTypes = {
  Tasks: PropTypes.arrayOf(PropTypes.object),
  onTypeChange: PropTypes.func,
  onDeleted: PropTypes.func,
  onEdited: PropTypes.func,
  Sort: PropTypes.arrayOf(PropTypes.object),
}

TaskList.defaultProps = {
  Tasks: [
    {
      id: 0,
      type: 'view',
      description: 'Loading',
      time: {
        year: 2023,
        month: 1,
        date: 10,
        hours: 13,
        minutes: 49,
        seconds: 15,
      },
    },
  ],
  onTypeChange: () => {},
  onDeleted: () => {},
  onEdited: () => {},
  Sort: [{ name: 'All', active: true }],
}

export default TaskList
