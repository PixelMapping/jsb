import { combineReducers } from "redux";
import { connectRouter, LOCATION_CHANGE } from "connected-react-router/immutable";
import layoutPageReducer from "./layoutPageReducer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";
import companyReducer from "./companyReducer";
import billReducer from "./billReducer";
import userReducer from "./userReducer";
import industryReducer from "./industryReducer"

export default history =>
  combineReducers({
    router: connectRouter(history),
    layoutPageReducer,
    authReducer,
    productReducer,
    orderReducer,
    companyReducer,
    billReducer,
    userReducer,
    industryReducer
  });
