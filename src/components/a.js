import React from 'react'

export default function (props) {
  function click() {
    props.history.push('/b')
  }
  return <div>
    this is a
    <button onClick={click}>to b</button>
  </div>
}