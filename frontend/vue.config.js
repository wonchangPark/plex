const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ],
//   lintOnSave: false
// })

module.exports = {
  devServer: {
    https: false,
    port: 8083,
    open: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080/'
      }
    },
    historyApiFallback: true,
    hot: true
  },
  transpileDependencies: [
    'element-plus',
    'vuetify'
  ],
  lintOnSave: false,
  //outputDir: '../backend/src/main/resources/dist'

  chainWebpack: config => {
    /* disable insertion of assets as data urls b/c Phaser doesn't support it */
    const rules = ['images', 'media']

    rules.forEach(rule => {
      const ruleConf = config.module.rule(rule)
      ruleConf.type('asset/resource')
    })
  }
  
}

