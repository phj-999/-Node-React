import * as actionTypes from "./constants";

import { 
  getTopBanner,
  getHotRecommends,
  getNewAlbum,
  getTopList
} from "@/services/recommend";



//轮播图
const changeBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BNNAER,
  banners: res.banners
})

export const getBanner = () => {
  return dispatch => {
    getTopBanner().then(res => {
      dispatch(changeBannerAction(res));
    })
  }
}

// 热门推荐
const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result
})

export const getHotRecommendAction =(limit)=>{
  return dispatch=>{
    getHotRecommends(limit).then(res=>{
     dispatch(changeHotRecommendAction(res))
    })
  }
}

// 新碟上架
const changeNewAlbumAction = (res)=> ({
  type: actionTypes.CHANGE_NEW_ALBUM,
  newAlbums: res.albums
})

export const getNewAlbumAction = (limit) => {
  return dispatch => {
    getNewAlbum(10,0).then(res=>{
      dispatch(changeNewAlbumAction(res))
    })
  }
}

//榜单
const changeUpListAction = (res) => ({
  type: actionTypes.CHANGE_UP_LIST,
  topUpList: res.playlist
})

const changeNewListAction = (res) => ({
  type: actionTypes.CHANGE_NEW_LIST,
  topNewList: res.playlist
})

const changeOriginListAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_LIST,
  topOriginList: res.playlist
})

export const getTopData = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      switch (idx) {
        case 0:
          dispatch(changeNewListAction(res));
          break;
        case 2:
          dispatch(changeOriginListAction(res));
          break;
        case 3:
          dispatch(changeUpListAction(res));
          break;
        default:
          console.log("其他数据处理");
      }
    })
  }
}