import { handleActions } from "redux-actions";
import { productTypes } from "../actions/productAction";
import moment from "moment";
import { Map, fromJS, merge } from "immutable";

const initState = fromJS({
    productlist:[]
});

const productReducer = handleActions(
  {
    [productTypes.PRODUCTLIST_SUCCESS]: (state, action) => {
      return state.merge({
        productlist: action.data
      });
    },
    [productTypes.PRODUCTCLASSIFY_SUCCESS]: (state, action) => {
      return state.merge({
        productclassify: action.data
      });
    },
    [productTypes.DELETEPRODUCTLIST_SUCCESS]: (state, action) => {
      return state.merge({
        deleteproductlist: action.data
      });
    },
    // ADDPRODUCTLIST_SUCCESS
    [productTypes.ADDPRODUCTLIST_SUCCESS]: (state, action) => {
      return state.merge({
        addproductlist: action.data
      });
    },
    //EDITPRODUCTLIST
    [productTypes.EDITPRODUCTLIST_SUCCESS]: (state, action) => {
      return state.merge({
        addproductlist: action.data
      });
    },
    // GETDICTLISTBYTYPE
    [productTypes.GETDICTLISTBYTYPE_SUCCESS]: (state, action) => {
      return state.merge({
        getdictlistbytype: action.data
      });
    },
    //UPDATECOMPANYTYPE
    [productTypes.UPDATECOMPANYTYPE_SUCCESS]: (state, action) => {
      return state.merge({
        updatecompanytype: action.data
      });
    },
    //ADDCOMPANYTYPE
    [productTypes.ADDCOMPANYTYPE_SUCCESS]: (state, action) => {
      return state.merge({
        addcompanytype: action.data
      });
    },
    //DELETECOMPANYTYPE_SUCCESS
    [productTypes.DELETECOMPANYTYPE_SUCCESS]: (state, action) => {
      return state.merge({
        deletecompanytype: action.data
      });
    },
  },
  initState
);

export default productReducer;
