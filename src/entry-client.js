import { hydrate } from "react-dom";
import { createApp, createStore } from "./generate";
const store = createStore(window.__ssr__)
import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

const router = <BrowserRouter>
    <Route path="/">
        <Route path="a" getComponent={() => import('./components/a').default}></Route>
        <Route path="b" getComponent={() => import('./components/b').default}></Route>
    </Route>
</BrowserRouter>

hydrate(createApp(store, router), document.getElementById("root"));
