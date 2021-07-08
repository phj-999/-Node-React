
import React, { memo,useEffect } from 'react';
import { useSelector,shallowEqual,useDispatch } from 'react-redux';
//import {connect} from 'react-redux'
import { getTopBannerAction } from '../../store/actionCreatiors';

import {
    BannerWrapper,
    BannerLeft,
    BannerRight,
    BannerControl
} from './style'

export default memo(function HYTopBanner() {
       //组件和redux关联 获取数据进行操作
       const dispatch = useDispatch()

       //拿到数据
       //useSelector有两个参数  性能没有connect好
      const {topBanners} = useSelector(state => ({
          //topBanners:state.get(recommend).get('topBanners')
          //两个get可以合成一个
          topBanners: state.getIn(['recommend','topBanners'])
      },shallowEqual))
   
       //发送网络请求
       useEffect(() => {
           dispatch(getTopBannerAction)
       }, [dispatch])
   
    return (
        <BannerWrapper>
            <div className='banner wrap-v2'>
                <BannerLeft></BannerLeft>
                <BannerRight></BannerRight>
            </div>
        </BannerWrapper>
    )
})

