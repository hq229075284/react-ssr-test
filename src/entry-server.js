import { actions, createStore, routes, createApp } from './export'
import { StaticRouter } from 'react-router-dom'
import React from 'react'
// import Loadable from 'react-loadable';

export { createStore }
export const createWrapperWithApp = ({ extractor, req = { url: '/' }, modules = [], store = null }) => {
  // const extractor = new ChunkExtractor({ statsFile })
  const jsx = extractor.collectChunks(createApp(store, <StaticRouter location={req.url} context={{}}>
    {routes}
  </StaticRouter>))
  return jsx
}

export default function Adapter(props){
  return createApp(props.store, <StaticRouter location={props.req.url} context={{}}>
    {routes}
  </StaticRouter>)
}
// export const createWrapperWithApp = ({ req = { url: '/' }, modules = [], store = null }) => <Loadable.Capture report={moduleName => modules.push(moduleName)}>
//   {
//     createApp(store, <StaticRouter location={req.url} context={{}}>
//       {routes}
//     </StaticRouter>)
//   }
// </Loadable.Capture>
