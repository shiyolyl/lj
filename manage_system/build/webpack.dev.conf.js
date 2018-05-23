var utils = require('./utils')
//使用webpack
var webpack = require('webpack')
//使用config/index.js
var config = require('../config')
//使用webpack配置合并插件
var merge = require('webpack-merge')
//加载webpack.base.conf基础配置
var baseWebpackConfig = require('./webpack.base.conf')
//使用html-webpack-plugin插件，可以帮我们自动生成html并且注入到.html文件中
var HtmlWebpackPlugin = require('html-webpack-plugin')
//使用友好提示的错误插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
//将热加载相对路径添加到webpack.base.conf的对应entry前
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
//将我们webpack.dev.conf.js的配置和webpack.base.conf.js的配置合并
module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    //definePlugin接受字符串插入到代码中，所以你需要的话可以写上js的字符串
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    //热加载插件在页面变更的时候只会重绘对应的页面模块，不会重绘整个文件
    new webpack.HotModuleReplacementPlugin(),
    //使用NoEmitOnErrorsPlugin后页面中的报错不会阻塞，但是会在编译结束后报错
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //将index.html作为入口,注入html代码后生产index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
