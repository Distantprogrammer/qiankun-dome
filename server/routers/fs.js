const router = require("express").Router();
const fs_handler = require("../router_handler/fs");

/**
 * 
 * @api {get} /api/readFileList 获取文件目录
 * @apiName 文件目录
 * @apiGroup 文件
 * @apiDescription 返回文件目录
 * @apiVersion  1.0.0
 * 
 * @apiParam {String} location='' 
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     location:B:\\tsg\\qiankun\\qiankun-example\\server
 * }
 * 
 * @apiSuccess {Number} status 0
 * @apiSuccess {Object} data 文件目录
 * @apiSuccessExample {type} Response-Example:
 * {
 *  status: 0,
 *  message: "获取文件目录成功！",
 *  data: [{
 *    "flag": true,
 *    "label": "server",
 *    "location": "B:\\\\tsg\\\\qiankun\\\\qiankun-example\\\\server\\.vscode\\launch.json",
 *    "id": "c4a880e2-05a7-4746-84a1-f5f5fa41dad7",
 *    "children": [{}]
 * }]
 * }
 * 
 */
router.get("/readFileList", fs_handler.readFileList);
// 获取文件内容
router.get("/readFile", fs_handler.readFile);
// 写入文件内容
router.post("/writeFile", fs_handler.writeFile);
// 删除文件
router.post("/unlink", fs_handler.unlink);
// 删除文件夹
router.post("/deleteFolder", fs_handler.deleteFolder);
// 新建文件夹
router.post("/createFolder", fs_handler.createFolder);

module.exports = router;
