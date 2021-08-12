/**
 * 最新新碟
 */
export function getHotAlbums() {
    return request({
        url: '/album/newest'
    })
}


/**
 * 新碟上架services
 */
import request from './config'

export function getTopAlbums(limit) {
    return request ({
        url: '/top/album',
        params: {
            limit,
            offset
        }
    })
}