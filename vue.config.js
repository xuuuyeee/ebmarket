const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    host: '127.0.0.1',
    port: 4399,
    open: true,
    proxy:{
      '':{
        target:'http://127.0.0.1:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
           '': ''
        }
      }
    }
  },
  lintOnSave:false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/xtx-pc-client/'
    : '/'
})
