const router = require('express').Router()
const fs_handler = require('../router_handler/fs')

// 获取文件目录
router.get('/readFileList',fs_handler.readFileList)

module.exports = router
