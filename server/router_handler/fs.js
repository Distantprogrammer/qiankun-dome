const fsFn = require('../FS/index.js');


// 获取用户基本信息的处理函数
exports.readFileList = (req, res) => {
console.log(fsFn);
    const data = fsFn.readFileList(req.query.location)
    res.send({
      status: 0,
      message: '获取文件目录成功！',
      data:data,
  })
}
