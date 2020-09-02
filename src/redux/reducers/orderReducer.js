import { handleActions } from "redux-actions";
import { orderTypes } from "../actions/orderAction";
import moment from "moment";
import { Map, fromJS, merge } from "immutable";

const initState = fromJS({
  orderlist:[]
});

const orderReducer = handleActions(
  {
    [orderTypes.ORDERLIST_SUCCESS]: (state, action) => {
      return state.merge({
        orderlist: action.data
      });
    },
    //ORDERDETAIL
    [orderTypes.ORDERDETAIL_SUCCESS]: (state, action) => {
      return state.merge({
        orderdetail: action.data
      });
    },
    //ORDERRECORD_SUCCESS
    [orderTypes.ORDERRECORD_SUCCESS]: (state, action) => {
      return state.merge({
        orderrecord: action.data
      });
    },
    //COMFIRMOFFLINEPAY
    [orderTypes.COMFIRMOFFLINEPAY_SUCCESS]: (state, action) => {
      return state.merge({
        comfirmofflinepay: action.data
      });
    },
    //ADDREMARK
    [orderTypes.ADDREMARK_SUCCESS]: (state, action) => {
      return state.merge({
        addremark: action.data
      });
    },
    //UPTORDER
    [orderTypes.UPTORDER_SUCCESS]: (state, action) => {
      return state.merge({
        uptorder: action.data
      });
    },

    [orderTypes.GETORDERCOUNT_SUCCESS]: (state, action) => {
      return state.merge({
        getordercount: action.data
      });
    },
    [orderTypes.REJECT_SUCCESS]: (state, action) => {
      return state.merge({
        reject: action.data
      });
    },
  },
  initState
);

export default orderReducer;

//GETORDERCOUNT
//REJECT