//检查Node和npm的版本
require('./check-versions')()
//获取config/indexjs的默认配置
var config = require('../config')
//如果node的环境无法判断当前是dev/product环境，使用config.dev.env.NODE_ENV作为当前的环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
//一个可以强制打开浏览器并跳转到指定url的插件
var opn = require('opn')
//node自带的文件路径工具
var path = require('path')
//node的框架
var express = require('express')
//webpack
var webpack = require('webpack')
//使用了proxyTable
var proxyMiddleware = require('http-proxy-middleware')
//使用dev环境的webpack配置
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
//如果没有指定运行端口，使用config.dev.port作为运行端口
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
//设置是否自动打开浏览器（config.dev.autoOpenBrowser=true），如果没有设置则为false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
//使用config.dev.proxyTable的配置作为proxyTable的代理配置
var proxyTable = config.dev.proxyTable

//使用express启动一个服务器
var app = express()
//启动webpack进行编译
var compiler = webpack(webpackConfig)
//启动webpack-dev-middleware，将编译后的文件暂存到内存中
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
//启动webpack-hot-middleware，也就是我们常说的热加载
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
//将proxyTable中的请求配置挂载到启动的express服务器上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
//使用connect-history-api-fallback匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
//将暂存到内存中的webpack编译后的文件挂到express服务器上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
//将热加载挂到express服务器上
app.use(hotMiddleware)

// serve pure static assets
//拼接static文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
//为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

//让我们这个express服务监听port的请求，并且将此服务作为dev-server.js的接口暴漏
var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
