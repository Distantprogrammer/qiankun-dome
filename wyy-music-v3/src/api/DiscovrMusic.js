import request from '@/utils/request'

// banner 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
// type:资源类型,对应以下类型,默认为 0 即 PC 0: pc 1: android 2: iphone 3: ipad
export const HomeBanner = (params) =>
  request({
    url: '/banner',
    params
  })

// 推荐歌单 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
export const RecommendThePlayList = (params) =>
  request({
    url: '/personalized',
    params
  })

// 推荐新音乐 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
export const RecommendNewMusic = (params) =>
  request({
    // method: 'GET',
    url: '/personalized/newsong',
    params
  })
// 独家放送列表
// limit : 返回数量 , 默认为 60
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0

/**
 * 登录后才可以获取
 */
// 最近播放-播客 可选参数 : limit : 返回数量 , 默认为 100
export const RecentPodcast = (params) =>
  request({
    url: '/record/recent/dj',
    params
  })

// 独家放送(入口列表) 说明 : 调用此接口 , 可获取独家放送
export const ExclusiveAndPoredOver = () =>
  request({
    url: '/personalized/privatecontent'
  })

// 推荐mv 说明 : 调用此接口 , 可获取推荐 mv
export const RecommendedMV = () =>
  request({
    url: '/personalized/mv'
  })
