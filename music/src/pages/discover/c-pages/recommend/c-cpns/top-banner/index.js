import React, { memo, useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Carousel } from 'antd';

//import {connect} from 'react-redux'
import { getBanner } from '../../store/actionCreatiors';

import {
    BannerWrapper,
    BannerLeft,
    BannerRight,
    BannerControl
} from './style'

export default memo(function HYTopBanner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    //组件和redux关联 获取数据进行操作
     const dispatch = useDispatch()
       //拿到数据
       //useSelector有两个参数  性能没有connect好
       const state = useSelector(state => ({
        banners: state.getIn(["recommend", "topBanners"])
      }), shallowEqual)
   
      //拿到当前banner
      const bannerRef = useRef();
 
       //发送网络请求
       //[dispatch]表示依赖disptach发生改变，从而发生网络请求
       useEffect(() => {
        dispatch(getBanner());
      }, [dispatch]);    
   
      const bannerChange = useCallback((from, to) => {
        setTimeout(() => {
          setCurrentIndex(from);
        }, 0);
      }, []);

      const bgImage = state.banners[currentIndex] && (state.banners[currentIndex].imageUrl + "?imageView&blur=40x20")

      return (
        <BannerWrapper bgImage={bgImage}>
          <div className="banner wrap-v2">
            <BannerLeft>
              <Carousel autoplay effect="fade" beforeChange={bannerChange} ref={bannerRef}>
                {
                  state.banners.map((item, index) => {
                    return (
                      <div className="banner-item" key={item.imageUrl}>
                        <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                      </div>
                    )
                  })
                }
              </Carousel>
            </BannerLeft>
            <BannerRight>
              jkjkjkj
            </BannerRight>
            <BannerControl className="control">
              <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
              <button className="btn right" onClick={e => bannerRef.current.next()}></button>
            </BannerControl>
          </div>
        </BannerWrapper>
      )
    })
    
