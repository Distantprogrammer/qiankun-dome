// websocket.js
const ws = require('nodejs-websocket')

const createServer = () => {
  let server = ws.createServer(connection => {
    // user++;
    // connection.nickname = "user" + user;
    // broadcast(connection.nickname + " comes in");
    connection.on('text', function (result) {
      broadcast(result)
      console.log('发送消息', result)
    })
    connection.on('connect', function (code) {
      console.log('开启连接', code)
    })
    connection.on('close', function (code) {
      console.log('关闭连接', code)
    })
    connection.on('error', function (code) {
      console.log('异常关闭', code)
    })
  }).listen(4201)
  function broadcast (str) {
    server.connections.forEach(function (connection) {
      connection.sendText(str);
    })
  }
  return server
}

module.exports = createServer()