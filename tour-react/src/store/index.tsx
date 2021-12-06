import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";

const initialState = {
   //
  }  //每一个reducer对应一个state，所有的state组成一个initialState  


//const middleware = [//]

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(//applyMiddleware(...middleware)
    )
)

export default store;
