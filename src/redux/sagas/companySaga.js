import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { companyTypes } from "../actions/companyAction";
// import { layoutPageTypes } from "../actions/layoutPageAction";
import { message } from "antd";
import Apis from "../../service/apis/1.0";



function* companyweblist(action) {
    try {
     let data = yield call(Apis.companyweblist,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYWEBLIST_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* companydetailweb(action) {
    try {
     let data = yield call(Apis.companydetailweb,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYDETAILWEB_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* getbasiccompany(action) {
    try {
     let data = yield call(Apis.getbasiccompany,action.payload.data);
  
      yield put({ type:companyTypes.GETBASICCOMPANY_SUCCESS,data:data });
  
    } catch (error) {
    } finally {
      
    }
  }

  function* getcompanyoperaterecord(action) {
    try {
     let data = yield call(Apis.getcompanyoperaterecord,action.payload.data);
  
      yield put({ type:companyTypes.GETCOMPANYOPERATERECORD_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* companyoperatedetail(action) {
    try {
     let data = yield call(Apis.companyoperatedetail,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYOPERATEDETAIL_SUCCESS,data:data });
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* companyoperatepass(action) {
    try {
     let data = yield call(Apis.companyoperatepass,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYOPERATEPASS_SUCCESS,data:data });
      message.success(data.message)
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* companyoperatenopass(action) {
    try {
     let data = yield call(Apis.companyoperatenopass,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYOPERATENOPASS_SUCCESS,data:data });
      // message.success(data.message)
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* getcompletedata(action) {
    try {
     let data = yield call(Apis.getcompletedata,action.payload.data);
  
      yield put({ type:companyTypes.GETCOMPLETEDATA_SUCCESS,data:data });
      // message.success(data.message)
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* companyreviewoperatepass(action) {
    try {
     let data = yield call(Apis.companyreviewoperatepass,action.payload.data);
     action.payload.callback(data)
  
      yield put({ type:companyTypes.COMPANYREVIEWOPERATEPASS_SUCCESS,data:data });
      // message.success(data.message)
      if(data.status != 200){
        message.warning(data.message)
      }else{
        message.success(data.message)
      }
  
    } catch (error) {
      
    } finally {
      
    }
  }


  function* companyreviewoperatenopass(action) {
    try {
     let data = yield call(Apis.companyreviewoperatenopass,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYREVIEWOPERATENOPASS_SUCCESS,data:data });
      // message.success(data.message)
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* companyoperateestablish(action) {
    try {
     let data = yield call(Apis.companyoperateestablish,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYOPERATEESTABLISH_SUCCESS,data:data });
      // message.success(data.message)
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* companyoperatereject(action) {
    try {
     let data = yield call(Apis.companyoperatereject,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYOPERATEREJECT_SUCCESS,data:data });
      // message.success(data.message)
      if(data.status != 200){
        message.warning(data.message)
        window.location.reload()
      }else{
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* companyoperatebilllock(action) {
    try {
     let data = yield call(Apis.companyoperatebilllock,action.payload.data);
  
      yield put({ type:companyTypes.COMPANYOPERATEBILLLOCK_SUCCESS,data:data });
      message.success(data.message)
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* sendnotice(action) {
    try {
     let data = yield call(Apis.sendnotice,action.payload.data);
  
      yield put({ type:companyTypes.SENDNOTICE_SUCCESS,data:data });
      message.success(data.message)
  
    } catch (error) {
      
    } finally {
      
    }
  }

  function* updatedock(action) {
    try {
     let data = yield call(Apis.updatedock,action.payload.data);
  
      yield put({ type:companyTypes.UPDATEDOCK_SUCCESS,data:data });
      message.success(data.message)
      
    } catch (error) {
      
    } finally {
      
    }
  }

  function* getregionbypid(action) {
    try {
     let data = yield call(Apis.getregionbypid,action.payload.data);
  
      yield put({ type:companyTypes.GETREGIONBYPID_SUCCESS,data:data });
      
    } catch (error) {
      
    } finally {
      
    }
  }

  function* sgetregionbypid(action) {
    try {
     let data = yield call(Apis.getregionbypid,action.payload.data);
  
      yield put({ type:companyTypes.SGETREGIONBYPID_SUCCESS,data:data });
      
    } catch (error) {
      
    } finally {
      
    }
  }

  function* qgetregionbypid(action) {
    try {
     let data = yield call(Apis.getregionbypid,action.payload.data);
  
      yield put({ type:companyTypes.QGETREGIONBYPID_SUCCESS,data:data });
      
    } catch (error) {
      
    } finally {
      
    }
  }

  function* legallist(action) {
    try {
     let data = yield call(Apis.legallist,action.payload.data);
  
      yield put({ type:companyTypes.LEGALLIST_SUCCESS,data:data });
      
    } catch (error) {
      
    } finally {
      
    }
  }

  function* legaldetail(action) {
    try {
     let data = yield call(Apis.legaldetail,action.payload.data);
  
      yield put({ type:companyTypes.LEGALDETAIL_SUCCESS,data:data });
      
    } catch (error) {
      
    } finally {
      
    }
  }

  function* getcompanybylegalid(action) {
    try {
     let data = yield call(Apis.getcompanybylegalid,action.payload.data);
  
      yield put({ type:companyTypes.GETCOMPANYBYLEGALID_SUCCESS,data:data });
      
    } catch (error) {
      
    } finally {
      
    }
  }

  function* locklegal(action) {
    try {
     let data = yield call(Apis.locklegal,action.payload.data);
      yield put({ type:companyTypes.LOCKLEGAL_SUCCESS,data:data });
      message.success(data.message)
    } catch (error) {
      
    } finally {
      
    }
  }



  function* nameexamine(action) {
    try {
     let data = yield call(Apis.nameexamine,action.payload.data);
      yield put({ type:companyTypes.NAMEEXAMINE_SUCCESS,data:data });
      // message.success(data.message)
    } catch (error) {
      
    } finally {
      
    }
  }
  function* businessexamine(action) {
    try {
     let data = yield call(Apis.businessexamine,action.payload.data);
      yield put({ type:companyTypes.BUSINESSEXAMINE_SUCCESS,data:data });
      // message.success(data.message)
    } catch (error) {
      
    } finally {
      
    }
  }
  function* accountexamine(action) {
    try {
     let data = yield call(Apis.accountexamine,action.payload.data);
      yield put({ type:companyTypes.ACCOUNTEXAMINE_SUCCESS,data:data });
      // message.success(data.message)
    } catch (error) {
      
    } finally {
      
    }
  }
  function* taxexamine(action) {
    try {
     let data = yield call(Apis.taxexamine,action.payload.data);
      yield put({ type:companyTypes.TAXEXAMINE_SUCCESS,data:data });
      // message.success(data.message)
    } catch (error) {
      
    } finally {
      
    }
  }

  function* getdatatype(action) {
    try {
     let data = yield call(Apis.getdatatype,action.payload.data);
      yield put({ type:companyTypes.GETDATATYPE_SUCCESS,data:data });
      // message.success(data.message)
    } catch (error) {
      
    } finally {
      
    }
  }

  function* adddatatype(action) {
    try {
     let data = yield call(Apis.adddatatype,action.payload.data);
      yield put({ type:companyTypes.ADDDATATYPE_SUCCESS,data:data });
      // message.success(data.message)
      if(data.status != 200){
        message.warning(data.message)
      }else{
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* checkdatatype(action) {
    try {
     let data = yield call(Apis.checkdatatype,action.payload.data);
      yield put({ type:companyTypes.CHECKDATATYPE_SUCCESS,data:data });
      if(data.status != 200){
        message.warning(data.message)
      }else{
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* datalist(action) {
    try {
     let data = yield call(Apis.datalist,action.payload.data);
      yield put({ type:companyTypes.DATALIST_SUCCESS,data:data });
      // message.success(data.message)
    } catch (error) {
      
    } finally {
      
    }
  }

  function* notice(action) {
    try {
     let data = yield call(Apis.notice,action.payload.data);
      yield put({ type:companyTypes.NOTICE_SUCCESS,data:data });
      if(data.status != 200){
        message.warning(data.message)
      }else{
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }
  function* getdata(action) {
    try {
     let data = yield call(Apis.getdata,action.payload.data);
      yield put({ type:companyTypes.GETDATA_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* updatelicense(action) {
    try {
     let data = yield call(Apis.updatelicense,action.payload.data);
      yield put({ type:companyTypes.UPDATELICENSE_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }
  function* getinvoiceinfo(action) {
    try {
     let data = yield call(Apis.getinvoiceinfo,action.payload.data);
      yield put({ type:companyTypes.GETINVOICEINFO_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* industrylist(action) {
    try {
     let data = yield call(Apis.industrylist,action.payload.data);
      yield put({ type:companyTypes.INDUSTRYLIST_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* updatebasiccompany(action) {
    try {
     let data = yield call(Apis.updatebasiccompany,action.payload.data);
      yield put({ type:companyTypes.UPDATEBASICCOMPANY_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* getdictlistbyvalue(action) {
    try {
     let data = yield call(Apis.getdictlistbyvalue,action.payload.data);
      yield put({ type:companyTypes.GETDICTLISTBYVALUE_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }
  function* getmanagerlist(action) {
    try {
     let data = yield call(Apis.getmanagerlist,action.payload.data);
      yield put({ type:companyTypes.GETMANAGERLIST_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }
  //通知记录
  function* noticelist(action) {
    try {
     let data = yield call(Apis.noticelist,action.payload.data);
      yield put({ type:companyTypes.NOTICELIST_SUCCESS,data:data });
      // if(data.status != 200){
      //   message.warning(data.message)
      // }else{
      //   message.success(data.message)
      // }
    } catch (error) {
      
    } finally {
      
    }
  }
  //uptbelonger
  function* uptbelonger(action) {
    try {
     let data = yield call(Apis.uptbelonger,action.payload.data);
      yield put({ type:companyTypes.UPTBELONGER_SUCCESS,data:data });
      if(data.status != 200){
        message.warning(data.message)
      }else{
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }

  function* getcompanystatusnum(action) {
    try {
     let data = yield call(Apis.getcompanystatusnum,action.payload.data);
      yield put({ type:companyTypes.GETCOMPANYSTATUSNUM_SUCCESS,data:data });
    
    } catch (error) {
      
    } finally {
      
    }
  }

  function* updateinfo(action) {
    try {
     let data = yield call(Apis.updateinfo,action.payload.data);
      yield put({ type:companyTypes.UPDATEINFO_SUCCESS,data:data });
      if(data.status != 200){
        message.warning(data.message)
      }else{
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }

  
  function* packagezip(action) {
    try {
     let data = yield call(Apis.packagezip,action.payload.data);
      yield put({ type:companyTypes.PACKAGEZIP_SUCCESS,data:data });
      if(data.status != 200){
        message.warning(data.message)
      }else{
        message.success(data.message)
      }
    } catch (error) {
      
    } finally {
      
    }
  }


export default function* watchAuthRoot() {
  yield takeLatest(companyTypes.COMPANYWEBLIST, companyweblist);
  yield takeLatest(companyTypes.COMPANYDETAILWEB, companydetailweb);
  yield takeLatest(companyTypes.GETBASICCOMPANY, getbasiccompany);
  yield takeLatest(companyTypes.GETCOMPANYOPERATERECORD, getcompanyoperaterecord);
  yield takeLatest(companyTypes.COMPANYOPERATEDETAIL, companyoperatedetail);
  yield takeLatest(companyTypes.COMPANYOPERATEPASS, companyoperatepass);
  yield takeLatest(companyTypes.COMPANYOPERATENOPASS, companyoperatenopass);

  yield takeLatest(companyTypes.GETCOMPLETEDATA, getcompletedata);
  yield takeLatest(companyTypes.COMPANYREVIEWOPERATEPASS, companyreviewoperatepass);
  yield takeLatest(companyTypes.COMPANYREVIEWOPERATENOPASS, companyreviewoperatenopass);

  yield takeLatest(companyTypes.COMPANYOPERATEESTABLISH, companyoperateestablish);
  yield takeLatest(companyTypes.COMPANYOPERATEREJECT, companyoperatereject);
  yield takeLatest(companyTypes.COMPANYOPERATEBILLLOCK, companyoperatebilllock);
  yield takeLatest(companyTypes.SENDNOTICE, sendnotice);
  yield takeLatest(companyTypes.UPDATEDOCK, updatedock);
  yield takeLatest(companyTypes.GETREGIONBYPID, getregionbypid);
  yield takeLatest(companyTypes.SGETREGIONBYPID, sgetregionbypid);
  yield takeLatest(companyTypes.QGETREGIONBYPID, qgetregionbypid);
  yield takeLatest(companyTypes.LEGALLIST, legallist);
  yield takeLatest(companyTypes.LEGALDETAIL, legaldetail);
  yield takeLatest(companyTypes.GETCOMPANYBYLEGALID, getcompanybylegalid);
  yield takeLatest(companyTypes.LOCKLEGAL, locklegal);

  yield takeLatest(companyTypes.NAMEEXAMINE, nameexamine);
  yield takeLatest(companyTypes.BUSINESSEXAMINE, businessexamine);
  yield takeLatest(companyTypes.ACCOUNTEXAMINE, accountexamine);
  yield takeLatest(companyTypes.TAXEXAMINE, taxexamine);
  yield takeLatest(companyTypes.GETDATATYPE, getdatatype);
  yield takeLatest(companyTypes.ADDDATATYPE, adddatatype);
  yield takeLatest(companyTypes.CHECKDATATYPE, checkdatatype);
  yield takeLatest(companyTypes.DATALIST, datalist);
  yield takeLatest(companyTypes.NOTICE, notice);
  yield takeLatest(companyTypes.GETDATA, getdata);
  yield takeLatest(companyTypes.UPDATELICENSE, updatelicense);
  yield takeLatest(companyTypes.GETINVOICEINFO, getinvoiceinfo);
  yield takeLatest(companyTypes.INDUSTRYLIST, industrylist);
  yield takeLatest(companyTypes.UPDATEBASICCOMPANY, updatebasiccompany);
  yield takeLatest(companyTypes.GETDICTLISTBYVALUE, getdictlistbyvalue);
  yield takeLatest(companyTypes.GETMANAGERLIST, getmanagerlist);
  yield takeLatest(companyTypes.NOTICELIST, noticelist);
  yield takeLatest(companyTypes.UPTBELONGER, uptbelonger);
  yield takeLatest(companyTypes.GETCOMPANYSTATUSNUM, getcompanystatusnum);
  yield takeLatest(companyTypes.UPDATEINFO, updateinfo);
  yield takeLatest(companyTypes.PACKAGEZIP, packagezip);
}


//ADDDATATYPE
//CHECKDATATYPE
//DATALIST
//NOTICE
//GETDATA
//UPDATELICENSE
//GETINVOICEINFO
//INDUSTRYLIST
//UPDATEBASICCOMPANY
//GETDICTLISTBYVALUE
//GETMANAGERLIST
//NOTICELIST

//UPTBELONGER

//GETCOMPANYSTATUSNUM_SUCCESS
//UPDATEINFO


//PACKAGEZIP

