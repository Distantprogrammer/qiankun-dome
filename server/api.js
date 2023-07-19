const app = require('./nodeConfig.js')
const routers = require('./routers/index')
app.use('/api', routers.user)
app.use('/api', routers.fs)
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use('/my', routers.userinfo)

  // // 执行websocket处理连接方法
require('./schema/websocket')
app.listen(4200, function () {
  console.log('http://127.0.0.1:4200');
})
