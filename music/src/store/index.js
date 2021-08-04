import {compose, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import reducer from './reducer'  //导入合并的reducer

//让浏览器的redux调试其效果，不加这个的话用redux中的compose也可以，直接import导入，这个需要安装依赖
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//composeEnhancers把中间件包裹起来
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
  ));

export default store