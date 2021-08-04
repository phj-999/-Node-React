import request from './request'

export function getTopBanner() {
  //console.log('1111');
  return request({
    url: "/banner"
  })
}

export function getHotRecommends(limit) { 
  return request({
    url:'/personalized',
    params:{
      limit
    }
  })
 }