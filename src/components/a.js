import React from 'react'
import './a.scss'

export default function (props) {
  function click() {
    props.history.push('/b')
  }
  return <div className="a">
    this is a
    <button onClick={click}>to b</button>
  </div>
}