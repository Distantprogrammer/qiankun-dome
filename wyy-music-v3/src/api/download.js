
import request from '@/utils/request'

// 获取音乐 url  新版 必选参数 : id : 音乐 id level: 播放音质等级, 分为 standard => 标准, exhigh=>极高, lossless=>无损, hires=>Hi-Res
export const getSongUrl = (params) =>
  request({
    url: '/song/url/v1',
    params
  })
