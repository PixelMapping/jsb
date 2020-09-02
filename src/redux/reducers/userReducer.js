import { handleActions } from "redux-actions";
import { userTypes } from "../actions/userAction";
import moment from "moment";
import { Map, fromJS, merge } from "immutable";

const initState = fromJS({
    
});

const userReducer = handleActions(
  {
    [userTypes.USERPAGE_SUCCESS]: (state, action) => {
      return state.merge({
        userpage: action.data
      });
    },
    [userTypes.REMOVE_SUCCESS]: (state, action) => {
      return state.merge({
        remove: action.data
      });
    },

    [userTypes.MANAGERPAGE_SUCCESS]: (state, action) => {
      return state.merge({
        managerpage: action.data
      });
    },

    [userTypes.USERINFO_SUCCESS]: (state, action) => {
      return state.merge({
        userinfo: action.data
      });
    },

    [userTypes.USERORDERLIST_SUCCESS]: (state, action) => {
      return state.merge({
        userorderlist: action.data
      });
    },
    [userTypes.RECOMENDPAGE_SUCCESS]: (state, action) => {
      return state.merge({
        recomendpage: action.data
      });
    },

    [userTypes.ISUSING_SUCCESS]: (state, action) => {
      return state.merge({
        isusing: action.data
      });
    },

    [userTypes.EDITMANAGE_SUCCESS]: (state, action) => {
      return state.merge({
        editmanage: action.data
      });
    },

    [userTypes.ADDMANAGE_SUCCESS]: (state, action) => {
      return state.merge({
        addmanage: action.data
      });
    },
 
  },
  initState
);

export default userReducer;


//
//DELETE

//MANAGERPAGE
//USERINFO
//USERORDERLIST
//ISUSING
//EDITMANAGE
//ADDMANAGE