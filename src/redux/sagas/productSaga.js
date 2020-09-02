import { call, put, takeLatest, select } from "redux-saga/effects";
import { push } from "connected-react-router";
import { productTypes } from "../actions/productAction";
// import { layoutPageTypes } from "../actions/layoutPageAction";
import { message } from "antd";
import Apis from "../../service/apis/1.0";



function* productlist(action) {
  console.log(action.payload)
  try {
   let data = yield call(Apis.productlist,action.payload.data);
   console.log("产品列表",data)
    yield put({ type:productTypes.PRODUCTLIST_SUCCESS,data:data });

  } catch (error) {
    console.log(error)
  } finally {
    
  }
}

function* productclassify(action){
  // console.log("产品分类列表**********",action)
  try {
    let data = yield call(Apis.productclassify,action.payload.data);
    // console.log("产品分类列表",data)
     yield put({ type:productTypes.PRODUCTCLASSIFY_SUCCESS,data:data });
 
   } catch (error) {
    //  console.log("列表",error)
   } finally {
     
   }
}

function* deleteproductlist(action){
  try{
    let data = yield call(Apis.deleteproductlist,action.payload.data);
    yield put({ type:productTypes.DELETEPRODUCTLIST_SUCCESS,data:data });
    // console.log("删除信息:",data)
    message.success(data.message)
  }
  catch(error){

  }
}

function* addproductlist(action){
  try{
    let data = yield call(Apis.addproductlist,action.payload.data);
    yield put({ type:productTypes.ADDPRODUCTLIST_SUCCESS,data:data });
    if(data.status == 200){
      message.success(data.message)
    }
  }
  catch(error){

  }
}

function* editproductlist(action){
  try{
    let data = yield call(Apis.editproductlist,action.payload.data);
    yield put({ type:productTypes.EDITPRODUCTLIST_SUCCESS,data:data });
    if(data.status == 200){
      message.success(data.message)
    }
  }
  catch(error){

  }
}

function* getdictlistbytype(action){
  try{
    let data = yield call(Apis.getdictlistbytype);
    yield put({ type:productTypes.GETDICTLISTBYTYPE_SUCCESS,data:data });
    console.log("开票额度",data)
  }
  catch(error){
    console.log("开票额度",error)
  }
}

function* updatecompanytype(action){
  try{
    let data = yield call(Apis.updatecompanytype,action.payload.data);
    yield put({ type:productTypes.GETDICTLISTBYTYPE_SUCCESS,data:data });
    if(data.status == 200){
      message.success(data.message)
    }
  }
  catch(error){
   
  }
}
function* addcompanytype(action){
  try{
    let data = yield call(Apis.addcompanytype,action.payload.data);
    yield put({ type:productTypes.ADDCOMPANYTYPE_SUCCESS,data:data });
    if(data.status == 200){
      message.success(data.message)
    }
  }
  catch(error){
   
  }
}

function* deletecompanytype(action){
  try{
    let data = yield call(Apis.deletecompanytype,action.payload.data);
    yield put({ type:productTypes.DELETECOMPANYTYPE_SUCCESS,data:data });
    // if(data.status == 200){
    //   message.success(data.message)
    // }
  }
  catch(error){
   
  }
}

export default function* watchAuthRoot() {
  yield takeLatest(productTypes.PRODUCTLIST, productlist);
  yield takeLatest(productTypes.PRODUCTCLASSIFY, productclassify)
  yield takeLatest(productTypes.DELETEPRODUCTLIST, deleteproductlist);
  yield takeLatest(productTypes.ADDPRODUCTLIST, addproductlist);
  yield takeLatest(productTypes.EDITPRODUCTLIST, editproductlist);
  yield takeLatest(productTypes.GETDICTLISTBYTYPE, getdictlistbytype);
  yield takeLatest(productTypes.UPDATECOMPANYTYPE, updatecompanytype);
  yield takeLatest(productTypes.ADDCOMPANYTYPE, addcompanytype);
  yield takeLatest(productTypes.DELETECOMPANYTYPE, deletecompanytype);
}

// ADDPRODUCTLIST_SUCCESS
//EDITPRODUCTLIST_SUCCESS
//GETDICTLISTBYTYPE
//UPDATECOMPANYTYPE
//ADDCOMPANYTYPE
//DELETECOMPANYTYPE_SUCCESS