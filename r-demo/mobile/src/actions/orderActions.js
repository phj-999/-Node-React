import * as actionTypes from "../contents/orderConntents";
import axios from 'axios'
//创建订单

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORDER_CREATE_REQUEST });
    //获取登陆成功后的信息
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/users/${id}`, config);
    dispatch({ type: actionTypes.ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
      dispatch({
          type:actionTypes.ORDER_CREATE_FAIL,
          payload:
          error.response && error.response.data.message ? error.response.data.message:error.message
      })
  }
};


//获取订单(通过id)
export const getOredrDetails  = (id )=>async(dispatch,getState)=>{
    try {
        dispatch({type:actionTypes.ORDER_CREATE_REQUEST})
        const {
            userLogin: { userInfo },
          } = getState();
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer${userInfo.token}`,
            },
          };
          const { data } = await axios.post(`/api/order/${id}`, config);
          dispatch({ type: actionTypes.ORDER_D_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type:actionTypes.ORDER_D_FAIL,
            payload:
            error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

//完成订单支付  更新订单的action
export const payOrder=(orderId,paymentResult) => async(dispatch,getState)=>{
  try {
    dispatch({type:actionTypes.ORDER_PAY_REQUEST})
    //获取登陆后的用户信息
    const {userLogin:{userInfo}}=getState()
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bear ${userInfo.token}`
      }
    }
    const {data} = await axios.put(`/api/orders/${orderId}/pay`,paymentResult,config)
    dispatch({type:actionTypes.ORDER_PAY_SUCCESS,payload:data})

  } catch (error) {
    const message=error.response && error.response.data.message ? error.response.data.message:error.message
    
    if (message==='为啥授权，无token') {
      dispatch(logout())
    }else{
    
    dispatch({
      type:actionTypes.ORDER_PAY_FAIL,
      payload:message    })}
  }
}