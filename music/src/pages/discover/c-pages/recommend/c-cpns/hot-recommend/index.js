/**
 * @description 热门推荐
 */

import React, {
    memo,
    useEffect
} from 'react'

import {
    useSelector,
    shallowEqual,
    useDispatch
} from 'react-redux'

import {
    HOT_RECOMMEND_LIMIT
} from '@/common/contants.js'

import HYThemeHeaderRCM from '@/components/theme-header-rcm'
import HYSongsCover from '@/components/songs-cover'

import {
    getHotRecommendAction
} from '../../store/actionCreatiors'
import {
    HotRecommendWrapper
} from './style'

export default memo(function HYHotRecommend() {

 const state = useSelector(state => ({
     hotRecommends: state.getIn(['recommend','hotRecommends'])
 }),shallowEqual) 
 // console.log(state);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getHotRecommendAction(HOT_RECOMMEND_LIMIT))
    }, [dispatch])

    return ( 
        <HotRecommendWrapper >
        <HYThemeHeaderRCM title = '热门推荐'
         keywords = {['华语', '流行', '民谣', '电子']}/> 
       <div className='recommend-list'>
           {
            state.hotRecommends.map((item,index)=>{
                return <HYSongsCover key={item.id} info={item}/>
            })
           }
       </div>
        </HotRecommendWrapper>
    )
})