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
const ejs = require('ejs')
const app = new Koa()

const ReactDOMServer = require('react-dom/server');
const { createStore, createApp } = require('../dist_server/index').default

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
app.use(koaStatic(path.join(__dirname, '../')))
app.use(async function (ctx) {
  const serverData = await getData()
  const store = createStore({
    saveData: serverData
  })
  if (!path.extname(ctx.url)) {
    ejs.renderFile(
      path.join(__dirname, '../dist_server/index.html'),
      {
        reactComponents: ReactDOMServer.renderToString(createApp(store)),
        ssrData: JSON.stringify({
          saveData: serverData
        })
      },
      { debug: false },
      function (err, html) {
        if (err) throw err
        ctx.status = 200
        ctx.set('content-type', 'text/html')
        ctx.body = html
      }
    )
  }
})

app.listen('8080', function () {
  console.log('listen at 8080')
})