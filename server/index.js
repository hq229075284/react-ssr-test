var fs = require("fs");
const path = require('path')
const Koa = require('koa')

const __DEV__ = process.env.NODE_ENV !== 'production'

// const koaWebpack = require('koa-webpack');


// var cfs = require("../cfs");
// let serverMiddleware, clientMiddleware

const _res = (context) => ({
  end: (content) => {
    context.body = content;
  },
  getHeader: context.get.bind(context),
  setHeader: context.set.bind(context),
  // writeHead: context.writeHead.bind(context),
  // write: context.write.bind(context),
})

let serverMiddleware, koaServerMiddleware, clientFs = fs

async function prepare(){
  if (__DEV__) {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const MemoryFileSystem = require("memory-fs");
    const webpackHotMiddleware = require("webpack-hot-middleware")
    const webpackHotClient = require("webpack-hot-client")
    const clientCompiler = webpack(require('../webpack.client.config.js'))
    
    await new Promise(resolve => {
      const _client = webpackHotClient(clientCompiler, {})
      _client.server.on('listening', () => { resolve() })
    })
    
    clientFs = new MemoryFileSystem();
    // clientCompiler.outputFileSystem = clientFs
    const clientMiddleware = webpackDevMiddleware(clientCompiler, { fs: clientFs, publicPath: '/client/' })
    koaClientMiddleware = async (ctx, next) => { await clientMiddleware(ctx.req, _res(ctx), next) }
  
    const serverCompiler = webpack(require('../webpack.server.config.js'))
    // const serverFs = new MemoryFileSystem();
    // serverCompiler.outputFileSystem = serverFs
    const serverMiddleware = webpackDevMiddleware(serverCompiler, { index: false, writeToDisk: true })
    koaServerMiddleware = async (ctx, next) => { await serverMiddleware(ctx.req, _res(ctx), next) }
  }
}

function startup({ PORT = 8080 } = {}) {
  const app = new Koa()
  if (__DEV__) {
    app.use(koaClientMiddleware)
    app.use(async function (ctx, next) {
      ctx.clientLocals = ctx.res.locals
      ctx.res.locals = undefined
      await next()
    })
    app.use(koaServerMiddleware)
    app.use(async function (ctx, next) {
      ctx.serverLocals = ctx.res.locals
      ctx.res.locals = undefined
      await next()
    })
  } else {
    const koaStatic = require('koa-static')
    app.use(koaStatic(path.join(__dirname, '../dist'), {
      defer: true
    }))
  }
  app.use(async function (ctx, next) {
    // const { default: Adapter, createStore } = require('../dist/server/index')
    // const assetsByChunkName = ctx.state.webpackStats.toJson().assetsByChunkName;
    // cfs.writeFile(path.join(__dirname,'../log/client.log.js'),JSON.stringify(ctx.clientLocals.webpackStats.toJson(),null,4))
    // cfs.writeFile(path.join(__dirname,'../log/server.log.js'),JSON.stringify(ctx.serverLocals.webpackStats.toJson(),null,4))

    // const dist=path.resolve(__dirname,'../dist')
    // const html=clientFs.readFileSync(path.resolve(dist,'index.html'),'utf-8')

    const ext = path.extname(ctx.url)
    if (!ext) {
      await provideHtml(ctx)
    }
    // await next()
  })

  app.listen(PORT, function () {
    console.log('listen at ' + PORT)
  })
}

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

function getDist() {
  return path.resolve(__dirname, '../dist')
}

async function provideHtml(ctx) {
  const React = require('react')
  const ReactDOMServer = require('react-dom/server');
  const { ChunkExtractor } = require('@loadable/server')

  // const modules = []

  const dist = getDist()
  
  const nodeExtractor = new ChunkExtractor({
    // stats: require('../dist/server/loadable-stats.json'),
    stats: JSON.parse(clientFs.readFileSync(path.join(dist,'client/loadable-stats.json'),'utf-8')),
    entrypoints: 'index',
    publicPath: '/client/'
  })

  const { default: Adapter, createStore } = require('../dist/server/index')

  const serverData = await getData()
  const store = createStore({
    saveData: serverData
  })

  const jsx = nodeExtractor.collectChunks(React.createElement(Adapter, { store, req: ctx.req }, null))

  let html = clientFs.readFileSync(path.resolve(dist, './index.html'), "utf-8")
  html = html
    .replace('<!-- reactComponents -->', ReactDOMServer.renderToString(jsx))
    .replace('<!-- ssrData -->', JSON.stringify({ saveData: serverData }))
    .replace('<!-- ssr_Css -->', nodeExtractor.getStyleTags())
    .replace('<!-- ssr_Scirpts -->', nodeExtractor.getScriptTags())

  ctx.status = 200
  ctx.set('content-type', 'text/html')
  ctx.body = html
}

prepare().then(startup)