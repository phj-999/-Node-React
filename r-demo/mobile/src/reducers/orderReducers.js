import * as actionTypes from "../contents/orderConntents";

//创建订单
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_CREATE_SUCCESS:
      return { loading: false, orders: action.payload, success: true };
    case actionTypes.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.ORDER_PAY_RESET:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//获取订单
export const orderDetailsReducer = (
  state = { orderItems: [], loading: true, shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case actionTypes.ORDER_D_REQUEST:
      return { loading: true };

    case actionTypes.ORDER_D_SUCCESS:
      return { loading: false, order: action.payload, success: true };

    case actionTypes.ORDER_D_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//订单支付更新的reducer
export const orderPayReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_PAY_SUCCESS:
      return { loading: false, order: action.payload };
    case actionTypes.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.ORDER_PAY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
