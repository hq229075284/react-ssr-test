const path = require('path')
const webpack = require('webpack')
const koaWebpack = require('koa-webpack');
var MemoryFileSystem = require("memory-fs");
// let serverMiddleware, clientMiddleware
var webpackDevMiddleware = require('webpack-dev-middleware')

const clientCompiler = webpack(require('../webpack.client.config.js'))
const clientFs = new MemoryFileSystem();
// clientCompiler.outputFileSystem = clientFs
const clientMiddleware = webpackDevMiddleware(clientCompiler, { fs: clientFs, index: '../index.html',serverSideRender:true })
const koaClientMiddleware = async (ctx, next) => { await clientMiddleware(ctx.req, ctx.res, next) }

const serverCompiler = webpack(require('../webpack.server.config.js'))
const serverFs = new MemoryFileSystem();
// serverCompiler.outputFileSystem = serverFs
const serverMiddleware = webpackDevMiddleware(serverCompiler, { fs: serverFs, index: '../index.html',serverSideRender:true })
const koaServerMiddleware = async (ctx, next) => { await serverMiddleware(ctx.req, ctx.res, next) }

// const waitWepbackReady=Promise.all([clientMiddleware(ctx.req, ctx.res, next),serverMiddleware(ctx.req, ctx.res, next)])

// const waitWepbackReady=Promise.all([
//   new Promise(resolve=>{
//     serverCompiler.watch({},()=>{
//       resolve()
//     })
//   }),
//   new Promise(resolve=>{
//     clientCompiler.watch({},()=>{
//       resolve()
//     })
//   })
// ])
// const getWebpackMiddleware = Promise.all([
//   koaWebpack({
//     devMiddleware: {
//       publicPath: '/server',
//       serverSideRender: true
//     },
//     compiler: serverCompiler,
//     hotClient: false,
//     config: {}
//   }),
//   koaWebpack({
//     devMiddleware: {
//       publicPath: '/client',
//       serverSideRender: true
//     },
//     hotClient: {},
//     compiler: clientCompiler,
//     config: {}
//   })
// ])

Promise.resolve().then(function () {
  // app.use(koaStatic(path.join(__dirname, '../dist'), {
  //   defer: true
  // }))
  app.use(koaClientMiddleware)
  app.use(koaServerMiddleware)
  // app.use(async function (ctx, next) {
  //   ctx.clientWebpackStats = clientCompiler.toJson()
  //   ctx.serverWebpackStats = serverCompiler.toJson()
  //   await next()
  // })
  app.use(async function (ctx) {
    // const { default: Adapter, createStore } = require('../dist/server/index')
    // const assetsByChunkName = ctx.state.webpackStats.toJson().assetsByChunkName;
    console.log(ctx.res.locals.webpackStats.toJson())
    if (true) creturn
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
        publicPath: './client/'
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
        .replace('<!-- ssr_Css -->', nodeExtractor.getStyleTags())
      // console.log(html)
      // console.log(nodeExtractor.getScriptTags())

      ctx.status = 200
      ctx.set('content-type', 'text/html')
      ctx.body = html
    }
  })

  app.listen('8080', function () {
    console.log('listen at 8080')
  })
})



const Koa = require('koa')
const koaStatic = require('koa-static')
const fs = require('fs')
const app = new Koa()

const React = require('react')
const ReactDOMServer = require('react-dom/server');
const { ChunkExtractor } = require('@loadable/server')

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

