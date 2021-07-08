import React, { memo } from 'react';

import HYTopBanner from './c-cpns/top-banner/index'
import {RecommendWrapper} from './style'
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

// //做映射
// export default connect (mapStateToProps, mapDispatchToProps) (memo(HYRecommend))

/**
 * 
 * @param {*}重构 redux Hooks的使用  相当于不用写mapStateToProps 、mapDispatchToProps、 connect
 * @returns 
 */

function HYRecommend(props) {
//抽取到c-cpns/top-banners/index.js


    return (
         <div>
             <RecommendWrapper>
                 <HYTopBanner/>
             </RecommendWrapper>
         </div>
            )
}


             


//做映射
export default(memo(HYRecommend))