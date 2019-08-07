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

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('../dist_server/index').default


// app.use(async function(ctx,next){
//     const middleware=await koaWP
//     return middleware(ctx,next)
// });
app.use(koaStatic(path.join(__dirname, '../')))
app.use(async function (ctx) {
    if (ctx.url === "/") {
        ejs.renderFile(
            path.join(__dirname, '../dist_server/index.html'),
            {
                reactComponents: ReactDOMServer.renderToString(React.createElement(App,null))
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