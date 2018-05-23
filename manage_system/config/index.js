// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
	//生产环境的配置
    build: {
    	//使用config/prod.env.js中定义的编译环境
        env: require('./prod.env'),
        //编译输入的index.html文件
        index: path.resolve(__dirname, '../dist/index.html'),
        //编译输出的静态资源根路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        //编译输出的静态资源的二级目录
        assetsSubDirectory: 'static',
        //编译发布上线路径的根目录，可配置为资源服务器域名或CDN域名
        assetsPublicPath: './',
        //是否开启cssSourceMap
        productionSourceMap: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        //是否开启gzip
        productionGzip: false,
        //需要使用gzip压缩的文件扩展名
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    //开发环境的配置
    dev: {
    	//使用config/dev.env.js
        env: require('./dev.env'),
        //运行测试页面的端口
        port: 8080,
        //是否在启动后，打开浏览器
        autoOpenBrowser: true,
        //编译输出的二级目录
        assetsSubDirectory: 'static',
        //编译发布上线路径的根目录，可配置为资源服务器域名或CDN域名
        assetsPublicPath: '/',
        //需要procyTable代理的接口（可跨域）
        proxyTable: {
            '/api':{
                target:'http://192.168.3.39:4545/ytgs',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            },
            // '/ms':{
            //     target: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
            //     changeOrigin: true
            // }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        //是否启用cssSourceMap
        cssSourceMap: false
    }
}
