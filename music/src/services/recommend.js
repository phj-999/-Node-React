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

 // 新碟、专辑
 export function getNewAlbum(limit, offset) {
  return request({
    url: "/top/album",
    params: {
      limit,
      offset
    }
  })
}

//推荐榜单
export function getTopList(idx) {
  return request({
    url: "/top/list",
    params: {
      idx
    }
  })
}