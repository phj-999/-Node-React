
//创建所有的reducer  在创建执行的action 通过不同dispatch传递不同的类型  再在页面中调用 
import * as actionTypes from '../contents/productContent';
//所有产品的reducer
export const productListReducer = (state={products:[]},action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_LIST_REQUEST:
            return {loading:true ,products:[]}
        
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return {loading: false, products:action.payload}

        case actionTypes.PRODUCT_LIST_FAIL:
            return {loading: false,error:action.payload}               
        
            default:
            return state;
    }
}

//单个产品的reducer
export const productDeatilsReducer = (state={product:{}},action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_DETAILS_REQUEST:
            return { loading:true,product:[] }

        case actionTypes.PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: action.payload}

        case actionTypes.PRODUCT_DETAILS_FAIL:
            return {loading:false, error: action.payload}
        
        default:
            return state
    }
}