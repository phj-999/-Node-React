import * as actionTypes from "../contents/cartConstents";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case actionTypes.CART_ADD_ITEM:
      const item = action.payload;
      //查询商品id并和 传进来的item = action.payload的id做匹配
      const existItem = state.cartItems.find((x) => x.id === item.product);
      if (existItem) {
        return {
          ...state,
          //存在的话进行更新更替
          //用existItem.product更新 x.product或者沿用之前的x
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          //不存在就加进去
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case actionTypes.CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case actionTypes.CART_SAVE_PAYMENT_METHOD:
      return {...state, paymentMethod: action.payload}
      
    default:
      return state;
  }
};
