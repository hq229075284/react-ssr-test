const path = require('path')

// const koaWebpack = require('koa-webpack');
// const koaWP = koaWebpack({
//     devMiddleware:{
//         publicPath:'/'
//     },
//     config:require('../webpack.server.config.js')
// });

const Koa = require('koa')
const koaStatic = require('koa-static')
const fs = require('fs')
const app = new Koa()

const React = require('react')
const ReactDOMServer = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server')
// const { createStore, createWrapperWithApp } = require('../dist/server/index')
const { default: Adapter, createStore } = require('../dist/server/index')

function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = []
      for (let i = 0; i < 5; i++) {
        result.push(Math.floor(Math.random() * 1000))
      }
      resolve(result)
    }, 1000)
  })
}
// app.use(async function(ctx,next){
//     const middleware=await koaWP
//     return middleware(ctx,next)
// });
app.use(koaStatic(path.join(__dirname, '../dist'), {
  defer: true
}))
app.use(async function (ctx) {
  if (!path.extname(ctx.url)) {
    const serverData = await getData()
    const store = createStore({
      saveData: serverData
    })
    let html = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
    // const modules = []
    const nodeExtractor = new ChunkExtractor({
      statsFile: path.join(__dirname, '../dist/server/loadable-stats.json'),
      entrypoints: 'index',
      publicPath:'./client/'
    })
    // const extractor = new ChunkExtractor({ statsFile: path.join(__dirname, '../dist/loadable-stats.json') })
    // const jsx = createWrapperWithApp({
    //   store,
    //   modules,
    //   req: ctx.req,
    //   extractor
    // })
    const jsx = nodeExtractor.collectChunks(React.createElement(Adapter, { store, req: ctx.req }, null))
    html = html
      .replace('<!-- reactComponents -->', ReactDOMServer.renderToString(jsx))
      .replace('<!-- ssrData -->', JSON.stringify({ saveData: serverData }))
      .replace('<!-- ssr_Scirpts -->', nodeExtractor.getScriptTags())
    // console.log(nodeExtractor.getScriptTags())

    ctx.status = 200
    ctx.set('content-type', 'text/html')
    ctx.body = html
  }
})

app.listen('8080', function () {
  console.log('listen at 8080')
})