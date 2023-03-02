import React from 'react'
import './TaskFilter.css'
import { PropTypes } from 'prop-types'
function TasksFilter(props) {
  const onChange = (e) => {
    props.sortChange(e.target.innerText)
  }

  let sortElement = props.Sort.map((el) => (
    <li key={el.name}>
      {el.active ? <button className="selected">{el.name}</button> : <button onClick={onChange}>{el.name}</button>}
    </li>
  ))
  return <ul className="filters">{sortElement}</ul>
}

TasksFilter.defaultProps = {
  Sort: [{ name: 'All', active: true }],
  sortChange: () => {},
}

TasksFilter.propTypes = {
  Sort: PropTypes.array,
  sortChange: PropTypes.func,
}

export default TasksFilter
