import React, { memo } from 'react';

import HYTopBanner from './c-cpns/top-banner'
import HYHotRecommend from './c-cpns/hot-recommend/index'
import HYNewAlbum from './c-cpns/new-album/index'
import HYRecomendRanking from './c-cpns/recommend-ranking'

import {
    RecommendWraper,
    Content,
    RecommendLeft,
    RecommendRight
  } from "./style";

//import { useSelector,shallowEqual,useDispatch } from 'react-redux';
//import {connect} from 'react-redux'
//import { getTopBannerAction } from './store/actionCreatiors';

// function HYRecommend(props) {
//     const {getBanners, topBanners} = props
//     useEffect(() => {
//         getBanners()
//     }, [getBanners])

//     return (
//          <div>
//              HYRecommend: {topBanners.length}
//          </div>
//             )
// }
// //拿到轮播图
// const mapStateToProps = state =>({
//     topBanners: state.recommend.topBanners
// })
// //调用   分发
// const mapDispatchToProps = dispatch =>({
//     getBanners : () => {
//         dispatch(getTopBannerAction())
//     }                       //action派发出去了  执行actionCreatiors.js中的代码
// })

// //做映射connect (mapStateToProps, mapDispatchToProps)形成高阶组件 在包裹HYRecommend
// export default connect (mapStateToProps, mapDispatchToProps) (memo(HYRecommend))

/**
 * 
 * @param {*}重构 redux Hooks的使用  相当于不用写mapStateToProps 、mapDispatchToProps、 connect
 * @returns 
 */



export default memo(function HYRecommend() {
    //抽取到c-cpns/top-banners/index.js    
        return (
    <RecommendWraper>
      <HYTopBanner/>
      <Content className="wrap-v2">
        <RecommendLeft>
        <HYHotRecommend/>
        <HYNewAlbum/>
        <HYRecomendRanking/>
        </RecommendLeft>
        <RecommendRight>
         222
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
})
             