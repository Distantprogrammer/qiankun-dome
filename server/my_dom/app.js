const express = require('express')
//实例化一个express对象
const app = express()
// 用户信息验证规则模块
const joi = require('joi')
// express4版本中的“bodyParser”已被弃用报错
// const bodyParser = require('body-parser')
// const multipart = require('connect-multiparty')
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(multipart())
// https://zhuanlan.zhihu.com/p/404260350 解析
// 解决接收不到前端数据
app.use(express.json())
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
// app.use(cors())
app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}))
// 导入nodejs-websocket模块
// const io = require('nodejs-websocket')
// 设置允许跨域请求
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//   res.header('X-Powered-By', ' 3.2.1')
//   res.header('Content-Type', 'application/json;charset=utf-8')
//   next()
// })
// 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))


// 一定要在路由之前，封装 res.cc 函数
app.use((req, res, next) => {
  // status 默认值为 1，表示失败的情况
  // err 的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
      // message: err instanceof Error ? new Promise(err.message) : new Promise(err)
    })
  }
  next()
})
// 一定要在路由之前配置解析 Token 的中间件
// expressJWT is not a function
// 由于版本升级到了7.7.5，导入express-jwt的格式变了
// const expressJWT = require('express-jwt')
const { expressjwt: jwt } = require("express-jwt")
const config = require('./config')
// 发布者的格式是在配置express-jwt中间件的时候在{secret：加密的秘钥,的后面加上一个algorithms: ["HS256"]}就可以啦
app.use(jwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 导入并注册用户路由模块
const userRouter = require('./routers/user')
// 导入并使用用户信息路由模块
const userinfoRouter = require('./routers/userinfo')
app.use('/api', userRouter)
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', userinfoRouter)

  // // 执行websocket处理连接方法
require('./schema/websocket')
// io.createServer(connection => {
//   console.log('new connection...')
//   //处理客户端发送过来的消息	
//   connection.on("text", function (data) {
//     console.log("接收到的客户端消息:" + data);
//     connection.sendText("服务器端返回数据:" + data)

//     //监听关闭
//     connection.on("close", function (code, reason) {
//       console.log("Connection closed")
//     })
//     //监听异常
//     connection.on("error", () => {
//       console.log('服务异常关闭...')
//     })
//   })
// }).listen(3000)

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')

  // 未知错误
  res.cc(err)
})

app.listen(4200, function () {
  console.log('http://127.0.0.1:4200');
})

