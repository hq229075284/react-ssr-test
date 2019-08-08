import { actions, createStore, routes, createApp } from './export'
import { StaticRouter } from 'react-router-dom'
import React from 'react'
// import Loadable from 'react-loadable';
import { ChunkExtractor } from '@loadable/server'

export { createStore }
export const createWrapperWithApp = ({ statsFile, req = { url: '/' }, modules = [], store = null }) => {
  const extractor = new ChunkExtractor({ statsFile })
  const jsx = extractor.collectChunks(createApp(store, <StaticRouter location={req.url} context={{}}>
    {routes}
  </StaticRouter>))
  return jsx
}
// export const createWrapperWithApp = ({ req = { url: '/' }, modules = [], store = null }) => <Loadable.Capture report={moduleName => modules.push(moduleName)}>
//   {
//     createApp(store, <StaticRouter location={req.url} context={{}}>
//       {routes}
//     </StaticRouter>)
//   }
// </Loadable.Capture>
