const { name } = require("./package");
module.exports = {
  publicPath: '/subapp/sub-monaco-editor',
  transpileDependencies: ['common'],
  lintOnSave: false,
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      "Access-Control-Allow-Origin": "*", //所有人都可以访问我的服务器
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      // library: `vue3App`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      // jsonpFunction: `webpackJsonp_${name}`, // webpack5v 移出掉了jsonpFunction这个属性： 意思就是打包之后就会变成自定义的变量名
    },
  },
};
