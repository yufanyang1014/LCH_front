
const {NODE_ENV} = process.env;
const path = require('path');
const publicPath =  NODE_ENV==='production'? '//www.hzyork.com': '/';

const webpack = require('webpack');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productionGzipExtensions = ['js', 'css']


module.exports = {
  devServer: {
    publicPath,
    open: true,
    proxy: {
      '/api': {
        target: 'http://121.40.188.9:40000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '',
        },
        cookiePathRewrite: {
          '/': '/api/',
        },
      },
      '/data': {
        target: 'http://www.weather.com.cn',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/data/': '',
        },
        cookiePathRewrite: {
          '/': '/data/',
        },
      },
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
