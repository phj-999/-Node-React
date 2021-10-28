/**
 * createStore创建一个store做管理
   combineReducers 组合成一个大的reducer对象
   applyMiddleware 使用中间件react thunk   把redux变成异步
   composeWithDevTools 拓展  在谷歌浏览器可以查看redux
   react-redux 桥梁  react和redux
 */
import { createStore, combineReducers, applyMiddleware } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productListReducer,productDeatilsReducer } from "../reducers/productReducers";
import {cartReducer} from '../reducers/cartReducers';
import { userDetailsReducer, userLoginReducer,userLoginReducer, userUpdateProfileReducer } from "../reducers/userReducer";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from "../reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDeatils:productDeatilsReducer,
  cart:cartReducer,
  userLogin: userLoginReducer,
  userRegister: userLoginReducer,
  userDetails:userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  orderCreate:orderCreateReducer,//创建订单
  orderDetails:orderDetailsReducer,
  orderPay:orderPayReducer
})  //里面有不同类型的reducer组成一个reducer  

//获取本地存储的商品信息 有的话转成对象 没的话就还是空数组
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
//获取本地存储用户登录信息
const userInfoFronLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null
//获取本地存储的用户收货地址信息
const shippingAddressStorage = localStorage.getItem('shippingAddress')
//初始化state
const initialState = {
  cart: {cartItems:cartItemsFromLocalStorage,shippingAddress:shippingAddressStorage },
  userLogin:{userInfo:userInfoFronLocalStorage},
}  //每一个reducer对应一个state，所有的state组成一个initialState

const middleware = [thunk]  //设置成数组，含有多个中间件

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store