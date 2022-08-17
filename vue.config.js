const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    host: '127.0.0.1',
    port: 4399,
    open: true,
    proxy:{
    }
  },
  lintOnSave:false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/xtx-pc-client/'
    : '/'
})
