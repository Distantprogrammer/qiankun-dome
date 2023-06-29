// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')
// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)

// 向外共享路由对象
module.exports = router