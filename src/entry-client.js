import { hydrate, render } from "react-dom";
import { actions, createStore, routes, createApp } from './export'
import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
const store = createStore(window.__ssr__||{})
const app = createApp(store, <BrowserRouter>
  {routes}
</BrowserRouter>)

if(window.__ssr__){
  console.log('hydrate')
  loadableReady(() => {
    hydrate(app, document.getElementById("root"));
  })
}else{
  render(app, document.getElementById("root"));
}

