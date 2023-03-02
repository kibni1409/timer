import React from 'react'

import NewTaskForm from './Components/NewTaskForm/NewTaskForm'
import TaskList from './Components/TaskList/TaskList'
import Footer from './Components/Footer/Footer'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Tasks: [
        {
          id: 0,
          type: 'completed',
          description: 'Completed task',
          time: {
            year: 2023,
            month: 1,
            date: 10,
            hours: 13,
            minutes: 49,
            seconds: 15,
          },
          timer: 42000,
          start: false,
        },
        {
          id: 1,
          type: 'view',
          description: 'Editing task',
          time: {
            year: 2023,
            month: 1,
            date: 5,
            hours: 13,
            minutes: 49,
            seconds: 15,
          },
          timer: 12000,
          start: false,
        },
        {
          id: 2,
          type: 'view',
          description: 'Completed task',
          time: {
            year: 2023,
            month: 1,
            date: 9,
            hours: 13,
            minutes: 49,
            seconds: 15,
          },
          timer: 12000,
          start: false,
        },
      ],
      idTasks: 3,
      Sort: [
        { name: 'All', active: true },
        { name: 'Active', active: false },
        { name: 'Completed', active: false },
      ],
    }

    this.onTypeChange = this.onTypeChange.bind(this)
    this.onEdited = this.onEdited.bind(this)
    this.onDeleted = this.onDeleted.bind(this)
    this.addTask = this.addTask.bind(this)
    this.sortChange = this.sortChange.bind(this)
    this.clearCompleted = this.clearCompleted.bind(this)
    this.onEditTime = this.onEditTime.bind(this)
    this.onStart = this.onStart.bind(this)
  }

  onTypeChange(id, type) {
    this.setState(({ Tasks }) => {
      const res = Tasks.map((el) => (el.id === id ? (el.type = type) : el.type))

      return {
        ...res,
      }
    })
  }

  onEdited(id, message) {
    this.setState(({ Tasks }) => {
      const res = Tasks.map((el) => (el.id === id ? (el.description = message) : el.description))

      return {
        ...res,
      }
    })
  }

  onDeleted(id) {
    this.setState(({ Tasks }) => {
      const idx = Tasks.findIndex((el) => el.id === id)

      const res = [...Tasks.slice(0, idx), ...Tasks.slice(idx + 1)]

      return {
        Tasks: res,
      }
    })
  }

  addTask(task) {
    this.setState(({ Tasks }) => {
      let data = new Date()
      let newTime = {
        year: data.getFullYear(),
        month: data.getMonth(),
        date: data.getDate(),
        hours: data.getHours(),
        minutes: data.getMinutes(),
        seconds: data.getSeconds(),
      }

      const newTask = {
        id: this.state.idTasks,
        type: 'view',
        description: task.name,
        time: newTime,
        timer: task.min * 60000 + task.sec * 1000,
      }

      const res = [...Tasks]

      res.push(newTask)
      return {
        Tasks: res,
        idTasks: this.state.idTasks + 1,
      }
    })
  }

  sortChange(name) {
    this.setState(({ Sort }) => {
      const res = Sort.map((el) => (el.name === name ? (el.active = true) : (el.active = false)))

      return {
        ...res,
      }
    })
  }

  clearCompleted() {
    this.setState(({ Tasks }) => {
      let res = []
      Tasks.map((el) => (el.type !== 'completed' ? res.push(el) : null))
      return {
        Tasks: res,
      }
    })
  }

  onEditTime(id, time) {
    this.setState(({ Tasks }) => {
      const res = Tasks.map((el) => (el.id === id ? (el.timer = time) : el.timer))

      return {
        ...res,
      }
    })
  }

  onStart(id, bool) {
    this.setState(({ Tasks }) => {
      const res = Tasks.map((el) => (el.id === id ? (el.start = bool) : el.timer))

      return {
        ...res,
      }
    })
  }

  render() {
    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <TaskList
          Tasks={this.state.Tasks}
          onTypeChange={this.onTypeChange}
          onDeleted={this.onDeleted}
          onEdited={this.onEdited}
          Sort={this.state.Sort}
          onEditTime={this.onEditTime}
          onStart={this.onStart}
        />
        <Footer
          Sort={this.state.Sort}
          sortChange={this.sortChange}
          clearCompleted={this.clearCompleted}
          Tasks={this.state.Tasks}
        />
      </div>
    )
  }
}

export default App
