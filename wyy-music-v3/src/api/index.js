import { HomeBanner, RecommendThePlayList, RecentPodcast, RecommendNewMusic, ExclusiveAndPoredOver, RecommendedMV } from './DiscovrMusic'
import { vipInfo } from './vip'
import { getSongById, getLyricById, getCheckMusic } from './Play'
import { SongListDetails, RankingList } from './RankingList'
import { CloudSearch, Search, DefaultSearch, HotSearch, DetailSearch, SuggestSearch, MultimatchSearch } from './Search'
import { getSongUrl } from './download'
import { phoneLogin, emailLogin, QRkey, QRcreate, QRcheck, loginStatus, logout } from './login'
import { userAccount, userDetail, userSubcount, userLevel, userBinding, userrePlacephone, userUpdate, userUpload } from './user'
import { playlistCatlist, playlistHot, topPlaylist, playlistHighquality, relatedPlaylist, playlistTrack, playlistHighqualityTags } from './playList'
import { artistList } from './singer'
/**
 * 个性推荐
 */
export const HomeBannerAPI = HomeBanner // 轮播图
export const RecommendThePlayListAPI = RecommendThePlayList // 推荐歌单
export const RecentPodcastAPI = RecentPodcast // 最近播客
export const RecommendNewMusicAPI = RecommendNewMusic // 最新音乐
export const ExclusiveAndPoredOverAPI = ExclusiveAndPoredOver // 独家放送
export const RecommendedMVAPI = RecommendedMV // 推荐MV

/**
 * 播放音乐
 */
export const getSongByIdAPI = getSongById // 歌曲 - 播放地址
export const getLyricByIdAPI = getLyricById // 歌曲 - 歌词数据
export const getCheckMusicAPI = getCheckMusic // 音乐可不可用
/**
 * 歌单
 */
export const RankingListAPI = RankingList // 排行榜入口
export const SongListDetailsAPI = SongListDetails // 歌单详情
export const playlistCatlistAPI = playlistCatlist // 歌单分类
export const playlistHotAPI = playlistHot // 热门歌单分类
export const topPlaylistAPI = topPlaylist // 歌单 ( 网友精选碟 )
export const playlistHighqualityTagsAPI = playlistHighqualityTags // 精品歌单标签列表
export const playlistHighqualityAPI = playlistHighquality // 精品歌单标签列表
export const relatedPlaylistAPI = relatedPlaylist // 相关歌单推荐
export const playlistTrackAPI = playlistTrack // 获取歌单所有歌曲

/**
 * 搜索
 */
export const CloudSearchAPI = CloudSearch // 搜索(详情)
export const SearchAPI = Search // 搜索(简约)
export const DefaultSearchAPI = DefaultSearch // 默认搜索关键词
export const HotSearchAPI = HotSearch // 热搜列表(简略)
export const DetailSearchAPI = DetailSearch // 热搜列表(详细)
export const SuggestSearchAPI = SuggestSearch // 搜索建议
export const MultimatchSearchAPI = MultimatchSearch // 搜索多重匹配

/**
 * 下载
 */
export const getSongUrlAPI = getSongUrl// 歌曲url

/**
 *登录
 */
export const loginStatusAPI = loginStatus // 登录状态
export const phoneLoginAPI = phoneLogin // 手机登录
export const emailLoginAPI = emailLogin // 邮箱登录
export const QRkeyAPI = QRkey // 二维码生成key
export const QRcreateAPI = QRcreate // 二维码生成接口
export const QRcheckAPI = QRcheck // 二维码检测扫码状态接口
export const logoutAPI = logout // 退出登录

/**
 * 用户信息
 */
export const userDetailAPI = userDetail // 用户详情
export const userAccountAPI = userAccount // 账号信息
export const userSubcountAPI = userSubcount // 获取用户信息
export const userLevelAPI = userLevel // 获取获取用户等级信息
export const userBindingAPI = userBinding // 获取用户绑定信息
export const userrePlacephoneAPI = userrePlacephone // 用户绑定手机
export const userUpdateAPI = userUpdate // 更新用户信息
export const userUploadAPI = userUpload // 更新头像

/**
 * vip信息
 */
export const vipInfoAPI = vipInfo // vip信息

/**
 * 歌手列表
 */
export const artistListAPI = artistList // 获取歌手列表
