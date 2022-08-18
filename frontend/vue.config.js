//const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: [
//     'vuetify'
//   ],
//   lintOnSave: false
// })

module.exports = {
  devServer: {
    https: true,
    // port: 8083,
    open: true,
    // proxy: {
    //   "/api/v1": {
    //     target: "https://localhost:8080/",
    //   },
    // },
    historyApiFallback: true,
    hot: true,
  },
  transpileDependencies: ["element-plus", "vuetify"],
  lintOnSave: false,
  outputDir: "../backend/src/main/resources/dist",
};
