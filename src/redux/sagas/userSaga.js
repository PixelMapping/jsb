import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { userTypes } from "../actions/userAction";
// import { layoutPageTypes } from "../actions/layoutPageAction";
import { message } from "antd";
import Apis from "../../service/apis/1.0";



function* userpage(action) {
  try {
   let data = yield call(Apis.userpage,action.payload.data);
    yield put({ type:userTypes.USERPAGE_SUCCESS,data:data });

  } catch (error) {
    
  } finally {
    
  }
}

function* remove(action) {
    
    try {
     let data = yield call(Apis.remove,action.payload.data);
      yield put({ type:userTypes.REMOVE_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }
  

  function* managerpage(action) {
    
    try {
     let data = yield call(Apis.managerpage,action.payload.data);
      yield put({ type:userTypes.MANAGERPAGE_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* userinfo(action) {
    
    try {
     let data = yield call(Apis.userinfo,action.payload.data);
      yield put({ type:userTypes.USERINFO_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* userorderlist(action) {
    
    try {
     let data = yield call(Apis.userorderlist,action.payload.data);
      yield put({ type:userTypes.USERORDERLIST_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* recomendpage(action) {
    
    try {
     let data = yield call(Apis.recomendpage,action.payload.data);
      yield put({ type:userTypes.RECOMENDPAGE_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* isusing(action) {
    
    try {
     let data = yield call(Apis.isusing,action.payload.data);
      yield put({ type:userTypes.ISUSING_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* editmanage(action) {
    
    try {
     let data = yield call(Apis.editmanage,action.payload.data);
      yield put({ type:userTypes.EDITMANAGE_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* addmanage(action) {
    
    try {
     let data = yield call(Apis.addmanage,action.payload.data);
      yield put({ type:userTypes.ADDMANAGE_SUCCESS,data:data });
      if(data.status == 200){
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }



export default function* watchAuthRoot() {
  yield takeLatest(userTypes.USERPAGE, userpage);
  yield takeLatest(userTypes.REMOVE, remove);
  yield takeLatest(userTypes.MANAGERPAGE, managerpage);
  yield takeLatest(userTypes.USERINFO, userinfo);
  yield takeLatest(userTypes.USERORDERLIST, userorderlist);
  yield takeLatest(userTypes.RECOMENDPAGE, recomendpage);
  yield takeLatest(userTypes.ISUSING, isusing);
  yield takeLatest(userTypes.EDITMANAGE, editmanage);
  yield takeLatest(userTypes.ADDMANAGE, addmanage);
}

//DELETE
//MANAGERPAGE

//USERINFO

//USERORDERLIST

// ISUSING

//EDITMANAGE

//ADDMANAGE

