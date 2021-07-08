
import * as actionTypes from './constants'

import { Map } from 'immutable'

const defaultState = Map({
    topBanners: []
})

function reducer(state=defaultState,action) { //函数名不一定要是reducer
    //处理action就行了  不要动state 不直接修改 state 中的字段，而是返回新对象
    switch (action.type) {
        case  actionTypes.CHANGE_TOP_BANNERS:
            return state.set("topBanners", action.topBanners);
    
        default:
            return state;//一定要返回旧的state  保证reducer的纯净性能
    }
}

export default reducer