import {combineReducers} from 'redux-immutable'  //合并多个reducer得API

import {reducer as recommendReducer} from '../pages/discover/c-pages/recommend/store/index'

const cReducer = combineReducers({
    recommend: recommendReducer
})

export default cReducer