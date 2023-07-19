const fsFn = require("../FS/index.js");

// 获取文件目录
exports.readFileList = (req, res) => {
  const data = fsFn.readFileList(req.query.location);
  res.send({
    status: 0,
    message: "获取文件目录成功！",
    data: data,
  });
};
// 获取文件内容
exports.readFile = (req, res) => {
  fsFn.readFile(req.query.location)
    .then((data) => {
      res.send({
        status: 0,
        message: "获取文件内容成功！",
        data: data,
      });
    })
    .catch((error) => {
      res.send({
        status: 1,
        message: "读取文件出错",
        data: error,
      });
    });
};
// 写入（添加文件）文件内容
exports.writeFile = (req, res) => {
  fsFn.writeFile(req.body.location,req.body.text)
    .then((data) => {
      res.send({
        status: 0,
        message: "修改文件内容成功！",
        data: data,
      });
    })
    .catch((error) => {
      res.send({
        status: 1,
        message: "修改文件出错",
        data: error,
      });
    });
};
// 删除文件
exports.unlink = (req, res) => {
  fsFn.unlink(req.body.location)
    .then((data) => {
      res.send({
        status: 0,
        message: "删除文件成功！",
        data: data,
      });
    })
    .catch((error) => {
      res.send({
        status: 1,
        message: "删除文件出错",
        data: error,
      });
    });
};
// 删除文件夹
exports.deleteFolder = (req, res) => {
  fsFn.deleteFolder(req.body.location)
    .then((data) => {
      res.send({
        status: 0,
        message: "删除文件成功！",
        data: data,
      });
    })
    .catch((error) => {
      res.send({
        status: 1,
        message: "删除文件出错",
        data: error,
      });
    });
};
// 新建文件夹
exports.createFolder = (req, res) => {
  fsFn.createFolder(req.body.location)
    .then((data) => {
      res.send({
        status: 0,
        message: "删除文件成功！",
        data: data,
      });
    })
    .catch((error) => {
      res.send({
        status: 1,
        message: "删除文件出错",
        data: error,
      });
    });
};
