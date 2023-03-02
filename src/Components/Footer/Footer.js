import React from 'react'
import './Footer.css'
import { PropTypes } from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
function Footer(props) {
  let count = props.Tasks.reduce((sum, current) => (current.type === 'view' ? sum + 1 : sum + 0), 0)
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter Sort={props.Sort} sortChange={props.sortChange} />
      <button className="clear-completed" onClick={props.clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  Sort: [{ name: 'All', active: true }],
  sortChange: () => {},
  clearCompleted: () => {},
  Tasks: [
    {
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
  ],
}

Footer.propTypes = {
  Sort: PropTypes.array,
  sortChange: PropTypes.func,
  clearCompleted: PropTypes.func,
  Tasks: PropTypes.array,
}

export default Footer
