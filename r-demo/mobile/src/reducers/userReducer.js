import * as actionTypes from "../contents/userContents";

//用户登录reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { 
          loading: true
         };
    case actionTypes.USER_LOGIN_SUCCESS:
      return { 
          loading: false, 
          user: action.payload 
        };
    case actionTypes.USER_LOGIN_FAIL:
      return { 
          loading: false, 
          error: action.payload
        };
    case actionTypes.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

//用户注册的reducer
export const userLoginReducer = (state={},action)=>{
  switch (action.type) {
      case actionTypes.USER_REGISTER_REQUEST:
        return {loading:true}
    
      case actionTypes.USER_REGISTER_SUCCESS:
        return {loading:false,userInfo:action.payload}
      
      case actionTypes.USER_LOGIN_FAIL:
        return {loading:false, error:action.payload}

    default:
      return state;
  }
}

//用户详情reducer
export const userDetailsReducer = (state={user:{}},action)=>{
  switch (action.type) {
      case actionTypes.USER_DETAILS_REQUEST:
        //...state  是因为初始化的时候有个user对象，在这里需要做一个拷贝
        return {loading:true, ...state }
    
      case actionTypes.USER_DETAILS_SUCCESS:
        return {loading:false,user:action.payload}
      
      case actionTypes.USER_LOGIN_FAIL:
        return {loading:false, error:action.payload}

    default:
      return state;
  }
}

//更新用户详情的reducer
export const userUpdateProfileReducer = (state={},action)=>{
  switch (action.type) {
      case actionTypes.USER_UPDATE_PROFILE_REQUEST:
        //...state  是因为初始化的时候有个user对象，在这里需要做一个拷贝
        return { loading:true }
    
      case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
        return {loading:false,user:action.payload,success:true}
      
      case actionTypes.USER_UPDATE_PROFILE_FAIL:
        return {loading:false, error:action.payload}

      case actionTypes.USER_UPDATE_PROFILE_RESET:
        return {}

    default:
      return state;
  }
}