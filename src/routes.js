import { Route } from 'react-router-dom'
import React from 'react'
import loadable from '@loadable/component'
// import a from './components/a'
// import b from './components/b'
// <Route path="/b" component={b}></Route>
// <Route path="/a" component={a}></Route>
export default <Route path="/">
  <Route path="/a" component={loadable(() => import(/* webpackChunkName:"ca" */'./components/a'))}></Route>
  <Route path="/b" component={loadable(() => import(/* webpackChunkName:"cb" */'./components/b'))}></Route>
</Route>