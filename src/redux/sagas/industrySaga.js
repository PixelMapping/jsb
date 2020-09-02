//industryReducer

import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { industryTypes } from "../actions/industryAction";
import { message } from "antd";
import Apis from "../../service/apis/1.0";



function* industrypage(action) {
    try {
     let data = yield call(Apis.industrypage,action.payload.data);
  
      yield put({ type:industryTypes.INDUSTRYPAGE_SUCCESS,data:data });
  
    } catch (error) {
      console.log(error)
    } finally {
      
    }
  }

  function* addindustry(action) {
    try {
     let data = yield call(Apis.addindustry,action.payload.data);
  
      yield put({ type:industryTypes.ADDINDUSTRY_SUCCESS,data:data });
  
    } catch (error) {
      console.log(error)
    } finally {
      
    }
  }

  function* uptindustry(action) {
    try {
     let data = yield call(Apis.uptindustry,action.payload.data);
  
      yield put({ type:industryTypes.UPTINDUSTRY_SUCCESS,data:data });
  
    } catch (error) {
      console.log(error)
    } finally {
      
    }
  }

  function* delindustry(action) {
    try {
     let data = yield call(Apis.delindustry,action.payload.data);
  
      yield put({ type:industryTypes.DELINDUSTRY_SUCCESS,data:data });
  
    } catch (error) {
      console.log(error)
    } finally {
      
    }
  }




export default function* watchAuthRoot() {
  yield takeLatest(industryTypes.INDUSTRYPAGE, industrypage);
  yield takeLatest(industryTypes.ADDINDUSTRY, addindustry);
  yield takeLatest(industryTypes.UPTINDUSTRY, uptindustry);
  yield takeLatest(industryTypes.DELINDUSTRY, delindustry);
  
}

//INDUSTRYPAGE

//ADDINDUSTRY

//UPTINDUSTRY

//DELINDUSTRY


