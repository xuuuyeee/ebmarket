const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 4399,
    open: true,
    proxy: {}
  },
  lintOnSave: false,
  publicPath: '/'
})
