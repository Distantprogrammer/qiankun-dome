/**
* 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
*/
const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 导入生成 Token 的包
const jwt = require('jsonwebtoken')
// 导入全局的配置文件
const config = require('../config')
// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 接收表单数据
  const userinfo = req.body
  console.log('注册了新用户', userinfo.username);
  // 判断数据是否合法
  // if (!userinfo.username || !userinfo.password) {
  //   return res.send({ status: 1, message: '用户名或密码不能为空！' })
  // }
  // 查询语句 useradmin表名
  const sql = `select * from useradmin where username=?`
  db.query(sql, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err)
    }
    // 用户名被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // 插入语句
    const sql = 'insert into useradmin set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.send({ status: 1, message: err.message })
      // SQL 语句执行成功，但影响行数不为 1 
      if (results.affectedRows !== 1) {
        return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      }
      // 注册成功
      // res.send({ status: 0, message: '注册成功！' })
      res.cc('注册成功！', 0)
    })
  })
}
// 登录的处理函数
exports.login = (req, res) => {
  const userinfo = req.body
  const sql = `select * from useradmin where username=?`
  db.query(sql, userinfo.username, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    // 执行 SQL 语句成功，但是查询到数据条数不等于 1
    if (results.length !== 1) return res.cc('登录失败！')
    // TODO：判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败！')
    // TODO：在服务器端生成 Token 的字符串
    const user = { ...results[0], password: '', user_pic: '' }
    console.log(user);
    // 对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
    // 调用 res.send() 将 Token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr,
    })
  })


}