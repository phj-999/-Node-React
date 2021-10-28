import * as actionTypes from "../contents/cartConstents";
import axios from "axios";
//两个参数，产品数量和产品id
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/$/{id}`);
  dispatch({
    type: actionTypes.CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  //还要把信息存到本地存储，这样用户在返回的时候就依然存在不用再次请求
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//删除产品action
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//保存收货地址action
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

//保存支付方法的action
export const savePaymentMethods =(data)=>{
  dispatch({
    type:actionTypes.CART_SAVE_PAYMENT_METHOD,
    payload:data
  })
  localStorage.setItem('paymentMethod',JSON.stringify(data))
} 