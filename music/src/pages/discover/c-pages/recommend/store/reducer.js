import { Map } from "immutable";
import * as actionTypes from './constants';

var defaultState = Map({
  topBanners: [],
  hotRecommends: []
})

export default (state = defaultState, action) => {
    switch(action.type) {
      case actionTypes.CHANGE_TOP_BNNAER:
        return state.set("topBanners", action.banners);
     
      case actionTypes.CHANGE_HOT_RECOMMEND:
        return state.set('hotRecommends', action.hotRecommends)

      default:
        return state;
    }
  }
