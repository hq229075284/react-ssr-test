# How to run

1. npm install
2. node server/index.js

Server default run in 8080 port

## Note

Q:如何让服务端识别组件的语法？

A:前后端代码分别配置一个webpack配置文件，将客户端代码编译成es5，将服务端代码语法转义成commonjs2（因为其中可能有部分是es6代码），然后在服务端通过`require`的方式引入入口文件，得到组件函数，再通过`React.renderToString`输出服务端的html片段

***

Q:如何处理路由？

A:在服务端仅支持Static路由,所以浏览器端只能使用Browser路由，因为Static路由依赖于请求的url，无法获取请求url中的hash值

***

Q:如何把后端的数据带到前端

A:后端在输出html文档时，会在文档中注入脚本，在window对象上添加一个特殊的属性用于记录服务端获取到的数据，一般这个数据和页面渲染所需的数据一致

***

Q:index.html中的资源如何添加

A:

***

Q:index.html中的资源如何添加

A:

***

Q:在开发环境下，如何实时编译和热更新

A:

***
