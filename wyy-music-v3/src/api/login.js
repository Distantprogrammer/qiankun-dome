import request from '@/utils/request'
// 登录状态
export const loginStatus = function (cookie) {
  return request({
    url: `/login/status?timerstamp=${Date.now()}`,
    method: 'post',
    data: {
      cookie
    }
  })
}

// 使用post
// 1. 手机登录 必选参数 :phone: 手机号码password: 密码

// 获取登录状态
export function phoneLogin (data) {
  return request({
    url: '/login/cellphone',
    method: 'POST',
    data
  })
}

// 2. 邮箱登录 必选参数 : email: 163 网易邮箱 password: 密码
export function emailLogin (data) {
  return request({
    url: '/login/cellphone',
    method: 'POST',
    data
  })
}

/***
 * 3. 二维码登录 QR code
 */
//  1. 二维码 key 生成接口 说明: 调用此接口可生成一个 key
export function QRkey () {
  return request({
    url: `/login/qr/key?timerstamp=${Date.now()}`
  })
}
//  2. 二维码生成接口 必选参数: key,由第一个接口生成   说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
export function QRcreate (key) {
  return request({
    url: `/login/qr/create?key=${key}&qrimg=true&timerstamp=${Date.now()}`
    // method: 'POST',
    // data
  })
}
// 3. 二维码检测扫码状态接口 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
export function QRcheck (key) {
  return request({
    url: `/login/qr/check?key=${key}&timerstamp=${Date.now()}`
    // method: 'POST',
    // data
  })
}
// 4. 游客登录 说明 : 直接调用此接口, 可获取游客cookie

// 刷新登录 ,返回内容包含新的cookie(不支持刷新二维码登录的cookie)

// 退出登录
export function logout () {
  return request({
    url: '/logout'
  })
}
