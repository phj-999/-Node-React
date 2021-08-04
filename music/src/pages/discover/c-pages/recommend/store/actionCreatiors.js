import * as actionTypes from "./constants";

import { 
  getTopBanner,
  getHotRecommends
} from "@/services/recommend";




const changeBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BNNAER,
  banners: res.banners
})

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result
})


export const getBanner = () => {
  return dispatch => {
    getTopBanner().then(res => {
      dispatch(changeBannerAction(res));
    })
  }
}


export const getHotRecommendAction =(limit)=>{
  return dispatch=>{
    getHotRecommends(limit).then(res=>{
     dispatch(changeHotRecommendAction(res))
    })
  }
}