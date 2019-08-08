import { Route } from 'react-router-dom'
import React from 'react'
import loadable from '@loadable/component'
// import a from './components/a'
// import b from './components/b'
// <Route path="/a" component={a}></Route>
// <Route path="/b" component={b}></Route>
export default <Route path="/">
  <Route path="/a" component={loadable(() => import('./components/a'))}></Route>
  <Route path="/b" component={loadable(() => import('./components/b'))}></Route>
</Route>