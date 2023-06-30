// 导入 mysql 模块
const mysql = require('mysql')
// 创建数据库连接对象
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'tsg123..',
  database: 'nodetest',
})
//可以添加一段测试代码
db.getConnection((err) => {
  if (err) {
    console.log("连接失败" + err.message);
    return;
  }
  console.log("连接成功");
});

module.exports = db
