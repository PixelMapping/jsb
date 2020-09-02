import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { orderTypes } from "../actions/orderAction";
// import { layoutPageTypes } from "../actions/layoutPageAction";
import { message } from "antd";
import Apis from "../../service/apis/1.0";



function* orderlist(action) {
  try {
   let data = yield call(Apis.orderlist,action.payload.data);

    yield put({ type:orderTypes.ORDERLIST_SUCCESS,data:data });

  } catch (error) {
    
  } finally {
    
  }
}

function* orderdetail(action) {
  try {
   let data = yield call(Apis.orderdetail,action.payload.data);
    yield put({ type:orderTypes.ORDERDETAIL_SUCCESS,data:data });

  } catch (error) {
    
  } finally {
    
  }
}

function* orderrecord(action) {
  try {
   let data = yield call(Apis.orderrecord,action.payload.data);
    yield put({ type:orderTypes.ORDERRECORD_SUCCESS,data:data });

  } catch (error) {
    
  } finally {
    
  }
}

function* comfirmofflinepay(action) {
  try {
   let data = yield call(Apis.comfirmofflinepay,action.payload.data);
    yield put({ type:orderTypes.COMFIRMOFFLINEPAY_SUCCESS,data:data });

  } catch (error) {
    
  } finally {
    
  }
}

function* addremark(action) {
  
  try {
   let data = yield call(Apis.addremark,action.payload.data);
    yield put({ type:orderTypes.ADDREMARK_SUCCESS,data:data });
    if(data.status == 200){
      message.success(data.message)
    }
  } catch (error) {
    
  } finally {
    
  }
}

function* uptorder(action) {
  
  try {
   let data = yield call(Apis.uptorder,action.payload.data);
    yield put({ type:orderTypes.UPTORDER_SUCCESS,data:data });
    if(data.status == 200){
      message.success(data.message)
    }
  } catch (error) {
    
  } finally {
    
  }
}

function* getordercount(action) {
  
  try {
   let data = yield call(Apis.getordercount,action.payload.data);
    yield put({ type:orderTypes.GETORDERCOUNT_SUCCESS,data:data });
    // if(data.status == 200){
    //   message.success(data.message)
    // }
  } catch (error) {
    
  } finally {
    
  }
}

function* reject(action) {
  
  try {
   let data = yield call(Apis.rejects,action.payload.data);
    yield put({ type:orderTypes.REJECT_SUCCESS,data:data });
     if(data.status == 200){
       message.success(data.message)
     }else{
      message.warning(data.message)
     }
  } catch (error) {
    
  } finally {
    
  }
}


export default function* watchAuthRoot() {
  yield takeLatest(orderTypes.ORDERLIST, orderlist);
  yield takeLatest(orderTypes.ORDERDETAIL, orderdetail);
  yield takeLatest(orderTypes.ORDERRECORD, orderrecord);
  yield takeLatest(orderTypes.COMFIRMOFFLINEPAY, comfirmofflinepay);
  yield takeLatest(orderTypes.ADDREMARK, addremark);
  yield takeLatest(orderTypes.UPTORDER, uptorder);
  yield takeLatest(orderTypes.GETORDERCOUNT, getordercount);
  yield takeLatest(orderTypes.REJECTS, reject);
}

//ORDERDETAIL
//ORDERRECORD_SUCCESS
//COMFIRMOFFLINEPAY
//ADDREMARK
//UPTORDER

//GETORDERCOUNT
//REJECT