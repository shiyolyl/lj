// https://github.com/shelljs/shelljs
//检查Node和npm版本
require('./check-versions')()
//将node的环境更改为生产模式
process.env.NODE_ENV = 'production'
//一个在命令行中显示加载样式的插件
var ora = require('ora')
//node中的路径模块
var path = require('path')
//命令行中文字显示颜色的插件
var chalk = require('chalk')
//使用shelljs插件，可以让我们在node环境的js中使用shell
var shell = require('shelljs')
//加载webpack
var webpack = require('webpack')
//加载config/index.js
var config = require('../config')
//加载生产环境配置文件
var webpackConfig = require('./webpack.prod.conf')

//使用ora打印出loading + log
var spinner = ora('building for production...')
//开始loading动画
spinner.start()

/*
 这一段代码就是在构建的时候，动态的生成生产环境下的文件。并删除之前构建的文件。用到了shell模块，以便在node环境中使用shell命令
 * */
//拼接编译输出文件路径
var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
//删除这个文件夹 （递归删除）
shell.rm('-rf', assetsPath)
//创建此文件夹
shell.mkdir('-p', assetsPath)
shell.config.silent = true
//复制static文件夹到我们的编译输出目录
shell.cp('-R', 'static/*', assetsPath)
shell.config.silent = false
//开始webpack的编译
webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  ))
})
