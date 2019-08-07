import React from 'react'
import ReactDom from 'react-dom'
import App from '../src/app'
if(process.env.NODE_ENV==="development"){
    // ReactDom.render(<App/>,document.getElementById('root'))
    ReactDom.hydrate(<App/>,document.getElementById('root'))
}else{
    ReactDom.hydrate(<App/>,document.getElementById('root'))
}