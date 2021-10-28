import * as actionTypes from "../contents/userContents";
import axios from "axios";
//用户登录Action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//用户退出登录Action
export const logout =()=>{
  localStorage.removeItem('userInfo')
  dispatch({type:actionTypes.USER_LOGOUT})
}
//用户注册的action
export const register = (name,email,password)=>async(dispatch)=>{
  try {
    dispatch({type:actionTypes.USER_REGISTER_REQUEST})
    const config = {
      header:{
        'Content-Type':'application/json'
      }
    }
    const {data} = await axios.post('api/users',{name,email,password},config)
    dispatch({type:actionTypes.USER_REGISTER_SUCCESS,payload:data})
    dispatch({type:actionTypes.USER_LOGIN_SUCCESS,payload:data})
    localStorage.setItem('userInfo',JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
//用户详情action
//有getState是因为这里是用户详情，所以要获取登陆后的用户信息
export const getUserDetails = (id) => async(dispatch,getState)=>{
  try {
    dispatch({ type:actionTypes.USER_Details_REQUEST })
    
    const {userLogin:{userInfo}}=getState//这一步是获取用户登陆成功后的信息，要加token
   
    //下来要进入个人的私密路由，所以要加token
    const config = {
      header:{
        'Content-Type':'application/json',
        Authorization:`Bearer${userInfo.token}`
      }
    }

    const {data} = await axios.get(`api/users/${id}`,config)
    dispatch({type:actionTypes.USER_DETAILS_SUCCESS,payload:data})

  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

//更新用户详情的action
export const UpdateUserDetails = (user) => async(dispatch,getState)=>{
  try {
    dispatch({ type:actionTypes.USER_UPDATE_PROFILE_REQUEST})
    
    const {userLogin:{userInfo}}=getState//这一步是获取用户登陆成功后的信息，要加token
   
    //下来要进入个人的私密路由，所以要加token
    const config = {
      header:{
        'Content-Type':'application/json',
        Authorization:`Bearer${userInfo.token}`
      }
    }

    const {data} = await axios.put(`api/users/profile`,user,config)
    dispatch({type:actionTypes.USER_UPDATE_PROFILE_SUCCESS,payload:data})
    dispatch({ type:actionTypes.USER_LOGIN_SUCCESS,payload:data })
    localStorage.setItem('userInfo',JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}
