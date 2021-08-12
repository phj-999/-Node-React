import { Map } from "immutable";
import * as actionTypes from './constants';

var defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],

  topUpLists: {},
  topNewLists: {},
  topOriginLists: {},

})

export default (state = defaultState, action) => {
    switch(action.type) {
      case actionTypes.CHANGE_TOP_BNNAER:
        return state.set("topBanners", action.banners);
     
      case actionTypes.CHANGE_HOT_RECOMMEND:
        return state.set('hotRecommends', action.hotRecommends)

      case actionTypes.CHANGE_NEW_ALBUM:
        return state.set('newAlbums', action.newAlbums)

      case actionTypes.CHANGE_UP_LIST:
        return state.set("topUpLists", action.topUpList);

      case actionTypes.CHANGE_NEW_LIST:
        return state.set("topNewLists", action.topNewList);

      case actionTypes.CHANGE_ORIGIN_LIST:
        return state.set("topOriginLists", action.topOriginList);
      

      default:
        return state;
    }
  }
