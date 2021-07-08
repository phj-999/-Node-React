import * as actionTypes from './constants'

import {getTopBanners} from '@/services/recommend'

//再此处  因为已经拿到了数据  现在定义函数 要派发出去
const changeTopBannerAction=(res)=>({
    type: actionTypes.CHANGE_TOP_BANNERS,
    topBanners:res.banners 
})

//先此处
export const getTopBannerAction = () => {
    return dispatch =>{
        getTopBanners().then(res=>{
            console.log(res);
            dispatch(changeTopBannerAction(res))  //派发出去
        })
    }
}

//最后要dispatch这个函数