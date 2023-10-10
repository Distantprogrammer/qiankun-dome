import request from '@/utils/request'

// 登录状态
export const vipInfo = function () {
  return request({
    url: '/vip/info'
  })
}
