import { Map } from "immutable";
import * as actionTypes from './constants';

// 希望对象不可变 使用Map  转换成不可变对象
var defaultState = Map({
   currentSong:{}
})

function reducer(state=defaultState,action) {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_SONG:
            return state.set('currentSong',action.currentSong)
    
        default:
            return state;
    }
}

export default reducer