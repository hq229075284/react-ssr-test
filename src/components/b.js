import React from 'react'
import './b.scss'

export default function (props) {
  console.log('render b')
  function click() {
    console.log('click to a')
    props.history.push('/a')
  }
  return <div className="b">
    this is b
    <button onClick={click}>to a</button>
  </div>
}