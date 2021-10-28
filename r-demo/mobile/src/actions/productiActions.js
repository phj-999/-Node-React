import * as actionTypes from "../contents/productContent";

//thunk其实就是把dispatch方法进行封装，返回一个promise  不是action对象

//获取所有产品action
export const lisitProducts = () => async (dispatch) => {
  try {
    dispatch({ 
        type: actionTypes.PRODUCT_LIST_REQUEST 
    });
    const { data } = await axios.get("/api/products");
    dispatch({ 
        type: actionTypes.PRODUCT_LIST_SUCCESS, 
        palyod: data 
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      palyod: error.reponse && error.reponse.data.message 
      ?error.reponse.data.message:error.message
    });
  }
};

//获取单个产品action
export const listProductDetails = (id) => async(dispatch) => {
  try {
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_REQUEST
    })
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
      type:actionTypes.PRODUCT_DETAILS_SUCCESS,
      payload:data
    })
  } catch (error) {
    dispatch({
      type:actionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
    })
  }
}