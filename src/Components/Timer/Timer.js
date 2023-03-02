import { useState } from 'react'

import Style from './Timer.module.css'

const Timer = (props) => {
  let value = props.timer
  let [timerID, setTimer] = useState(0)
  let [start, setStart] = useState(false)
  let timeMin = Math.floor(value / 60000)
  let timeSec = Math.floor((value % 60000) / 1000)

  function Start() {
    let startID = setInterval(() => {
      props.onEditTime(props.task.id, value - 1000)
      setStart(true)
      value -= 1000
    }, 1000)
    setTimer(startID)
  }

  if (value === 0) {
    clearInterval(timerID)
  }

  function Pause() {
    clearInterval(timerID)
    setStart(false)
  }

  return (
    <div className={Style.timer}>
      <span className={Style.display}>
        {value !== 0 ? (
          !start ? (
            <button onClick={Start} className={Style.icon_play}></button>
          ) : (
            <button onClick={Pause} className={Style.icon_pause}></button>
          )
        ) : null}
        {timeMin >= 1 ? (timeMin < 10 ? '0' + timeMin + ' : ' : timeMin + ' : ') : '00 : '}
        {timeSec < 10 ? '0' + timeSec : timeSec}
      </span>
    </div>
  )
}

export default Timer
