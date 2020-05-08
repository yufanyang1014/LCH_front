
const {NODE_ENV} = process.env;
const path = require('path');
const publicPath =  NODE_ENV==='production'? '//47.105.217.54': '/';

const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productionGzipExtensions = ['js', 'css']


module.exports = {
  devServer: {
    publicPath, // 静态资源获取路径
    open: true,
    proxy: {
      '/api': {
        target: 'http://118.31.47.53:8078',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '',
        },
        cookiePathRewrite: {
          '/': '/api/',
        },
      }
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  configureWebpack:{
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, '..', 'src'),
      },
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, 
        minChunkSize: 100
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
              drop_debugger: true, // 注释debugger
              drop_console: true, // 注释console
              pure_funcs:['console.log'] // 移除console
          },
        },
          sourceMap: false,
          parallel: true,
      }),
    ]
  }
}
