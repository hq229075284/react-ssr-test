import * as generateApp from './generate'
import { StaticRouter, Route } from 'react-router-dom'
import React from 'react'
const createStaticRouter= (req) => <StaticRouter location={req.url}>
    <Route path="/">
        <Route path="a" getComponent={() => import('./components/a').default}></Route>
        <Route path="b" getComponent={() => import('./components/b').default}></Route>
    </Route>
</StaticRouter>

export  default {
    ...generateApp,
    createStaticRouter
}