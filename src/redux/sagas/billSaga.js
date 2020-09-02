import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { billTypes } from "../actions/billAction";
// import { layoutPageTypes } from "../actions/layoutPageAction";
import { message } from "antd";
import Apis from "../../service/apis/1.0";



function* invoicepage(action) {
    try {
     let data = yield call(Apis.invoicepage,action.payload.data);
  
      yield put({ type:billTypes.INVOICEPAGE_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* applyinvoicepage(action) {
    try {
     let data = yield call(Apis.applyinvoicepage,action.payload.data);
  
      yield put({ type:billTypes.APPLYINVOICEPAGE_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* billinfo(action) {
    try {
     let data = yield call(Apis.billinfo,action.payload.data);
  
      yield put({ type:billTypes.BILLINFO_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* auditpass(action) {
    try {
     let data = yield call(Apis.auditpass,action.payload.data);
  
      yield put({ type:billTypes.AUDITPASS_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* invoicecompletion(action) {
    try {
     let data = yield call(Apis.invoicecompletion,action.payload.data);
  
      yield put({ type:billTypes.INVOICECOMPLETION_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* express(action) {
    try {
     let data = yield call(Apis.express,action.payload.data);
  
      yield put({ type:billTypes.EXPRESS_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* reject(action) {
    try {
     let data = yield call(Apis.reject,action.payload.data);
  
      yield put({ type:billTypes.REJECT_SUCCESS,data:data });
        if(data.rel){
          window.history.back(-1);
        }

    } catch (error) {
    } finally {
      
    }
  }

  function* viewinvoice(action) {
    try {
     let data = yield call(Apis.viewinvoice,action.payload.data);
      yield put({ type:billTypes.VIEWINVOICE_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* countstatus(action) {
    try {
     let data = yield call(Apis.countstatus,action.payload.data);
      yield put({ type:billTypes.COUNTSTATUS_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }





export default function* watchAuthRoot() {
  yield takeLatest(billTypes.INVOICEPAGE, invoicepage);
  yield takeLatest(billTypes.APPLYINVOICEPAGE, applyinvoicepage);
  yield takeLatest(billTypes.BILLINFO, billinfo);
  yield takeLatest(billTypes.AUDITPASS, auditpass);
  yield takeLatest(billTypes.INVOICECOMPLETION, invoicecompletion);
  yield takeLatest(billTypes.EXPRESS, express);
  yield takeLatest(billTypes.REJECT, reject);
  yield takeLatest(billTypes.VIEWINVOICE, viewinvoice);
  yield takeLatest(billTypes.COUNTSTATUS, countstatus);
}


// INVOICEPAGE:"INVOICEPAGE",
    // INVOICEPAGE_SUCCESS:"INVOICEPAGE_SUCCESS",
    //APPLYINVOICEPAGE
//BILLINFO

// BILLINFO
//AUDITPASS
//INVOICECOMPLETION_SUCCESS
//EXPRESS
//REJECT
//VIEWINVOICE

//COUNTSTATUS

