import request from '@/utils/request'

// 获取用户详情 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
export const userDetail = function (uid) {
  return request({
    url: `/user/detail?uid=${uid}`
  })
}
// 获取账号信息  登录后调用此接口 ,可获取用户账号信息
export const userAccount = function () {
  return request({
    url: '/user/account',
    method: 'post'
  })
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const userSubcount = function () {
  return request({
    url: '/user/subcount',
    method: 'post'
  })
}
// 获取获取用户等级信息  登录后调用此接口 ,可获取用户账号信息
export const userLevel = function () {
  return request({
    url: '/user/level'
  })
}
// 获取用户绑定信息 必选参数 : uid : 用户 id
export const userBinding = function (uid) {
  return request({
    url: `/user/binding?${uid}`
  })
}
// 用户绑定手机 必选参数 : phone : 手机号 oldcaptcha: 原手机号码的验证 captcha:新手机号码的验证码
export const userrePlacephone = function (params) {
  return request({
    url: '/user/replacephone',
    params
  })
}
// 更新用户信息
export const userUpdate = function (params) {
  return request({
    url: '/user/update',
    params
  })
}
// 更新头像
export const userUpload = function (params) {
  return request({
    url: '/avatar/upload',
    params
  })
}
