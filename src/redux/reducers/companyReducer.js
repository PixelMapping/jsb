import { handleActions } from "redux-actions";
import { companyTypes } from "../actions/companyAction";
import moment from "moment";
import { Map, fromJS, merge } from "immutable";

const initState = fromJS({
 
});

const companyReducer = handleActions(
  {
    [companyTypes.COMPANYWEBLIST_SUCCESS]: (state, action) => {
        return state.merge({
            companyweblist: action.data
        });
      },
      [companyTypes.COMPANYDETAILWEB_SUCCESS]: (state, action) => {
        return state.merge({
            companydetailweb: action.data
        });
      },
      [companyTypes.GETBASICCOMPANY_SUCCESS]: (state, action) => {
        return state.merge({
            getbasiccompany: action.data
        });
      },
      [companyTypes.GETCOMPANYOPERATERECORD_SUCCESS]: (state, action) => {
        return state.merge({
          getcompanyoperaterecord: action.data
        });
      },
      [companyTypes.COMPANYOPERATEDETAIL_SUCCESS]: (state, action) => {
        return state.merge({
          companyoperatedetail: action.data
        });
      },
      [companyTypes.COMPANYOPERATEPASS_SUCCESS]: (state, action) => {
        return state.merge({
          companyoperatepass: action.data
        });
      },
      [companyTypes.COMPANYOPERATENOPASS_SUCCESS]: (state, action) => {
        return state.merge({
          companyoperatenopass: action.data
        });
      },
      [companyTypes.GETCOMPLETEDATA_SUCCESS]: (state, action) => {
        return state.merge({
          getcompletedata: action.data
        });
      },
      [companyTypes.COMPANYREVIEWOPERATEPASS_SUCCESS]: (state, action) => {
        return state.merge({
          companyreviewoperatepass: action.data
        });
      },
      [companyTypes.COMPANYREVIEWOPERATENOPASS_SUCCESS]: (state, action) => {
        return state.merge({
          companyreviewoperatenopass: action.data
        });
      },

      [companyTypes.COMPANYOPERATEESTABLISH_SUCCESS]: (state, action) => {
        return state.merge({
          companyoperateestablish: action.data
        });
      },
      [companyTypes.COMPANYOPERATEREJECT_SUCCESS]: (state, action) => {
        return state.merge({
          companyoperatereject: action.data
        });
      },
      [companyTypes.COMPANYOPERATEBILLLOCK_SUCCESS]: (state, action) => {
        return state.merge({
          companyoperatebilllock: action.data
        });
      },
      //SENDNOTICE
      [companyTypes.SENDNOTICE_SUCCESS]: (state, action) => {
        return state.merge({
          sendnotice: action.data
        });
      },
      [companyTypes.UPDATEDOCK_SUCCESS]: (state, action) => {
        return state.merge({
          updatedock: action.data
        });
      },

      [companyTypes.GETREGIONBYPID_SUCCESS]: (state, action) => {
        return state.merge({
          getregionbypid: action.data
        });
      },

      [companyTypes.SGETREGIONBYPID_SUCCESS]: (state, action) => {
        return state.merge({
          sgetregionbypid: action.data
        });
      },


      [companyTypes.QGETREGIONBYPID_SUCCESS]: (state, action) => {
        return state.merge({
          qgetregionbypid: action.data
        });
      },
      [companyTypes.LEGALLIST_SUCCESS]: (state, action) => {
        return state.merge({
          legallist: action.data
        });
      },
      [companyTypes.LEGALDETAIL_SUCCESS]: (state, action) => {
        return state.merge({
          legaldetail: action.data
        });
      },

      [companyTypes.GETCOMPANYBYLEGALID_SUCCESS]: (state, action) => {
        return state.merge({
          getcompanybylegalid: action.data
        });
      },
      [companyTypes.LOCKLEGAL_SUCCESS]: (state, action) => {
        return state.merge({
          locklegal: action.data
        });
      },

      [companyTypes.NAMEEXAMINE_SUCCESS]: (state, action) => {
        return state.merge({
          nameexamine: action.data
        });
      },
      [companyTypes.BUSINESSEXAMINE_SUCCESS]: (state, action) => {
        return state.merge({
          businessexamine: action.data
        });
      },

      [companyTypes.ACCOUNTEXAMINE_SUCCESS]: (state, action) => {
        return state.merge({
          accountexamine: action.data
        });
      },
      [companyTypes.TAXEXAMINE_SUCCESS]: (state, action) => {
        return state.merge({
          taxexamine: action.data
        });
      },

      [companyTypes.GETDATATYPE_SUCCESS]: (state, action) => {
        return state.merge({
          getdatatype: action.data
        });
      },
      [companyTypes.ADDDATATYPE_SUCCESS]: (state, action) => {
        return state.merge({
          adddatatype: action.data
        });
      },
      [companyTypes.CHECKDATATYPE_SUCCESS]: (state, action) => {
        return state.merge({
          checkdatatype: action.data
        });
      },
      [companyTypes.DATALIST_SUCCESS]: (state, action) => {
        return state.merge({
          datalist: action.data
        });
      },
      [companyTypes.NOTICE_SUCCESS]: (state, action) => {
        return state.merge({
          notice: action.data
        });
      },
      [companyTypes.GETDATA_SUCCESS]: (state, action) => {
        return state.merge({
          getdata: action.data
        });
      },
      [companyTypes.UPDATELICENSE_SUCCESS]: (state, action) => {
        return state.merge({
          updatelicense: action.data
        });
      },

      [companyTypes.GETINVOICEINFO_SUCCESS]: (state, action) => {
        return state.merge({
          getinvoiceinfo: action.data
        });
      },
      [companyTypes.INDUSTRYLIST_SUCCESS]: (state, action) => {
        return state.merge({
          industrylist: action.data
        });
      },

      [companyTypes.UPDATEBASICCOMPANY_SUCCESS]: (state, action) => {
        return state.merge({
          updatebasiccompany: action.data
        });
      },

      [companyTypes.GETDICTLISTBYVALUE_SUCCESS]: (state, action) => {
        return state.merge({
          getdictlistbyvalue: action.data
        });
      },

      [companyTypes.GETMANAGERLIST_SUCCESS]: (state, action) => {
        return state.merge({
          getmanagerlist: action.data
        });
      },
      [companyTypes.NOTICELIST_SUCCESS]: (state, action) => {
        return state.merge({
          noticelist: action.data
        });
      },
      [companyTypes.UPTBELONGER_SUCCESS]: (state, action) => {
        return state.merge({
          uptbelonger: action.data
        });
      },

      [companyTypes.GETCOMPANYSTATUSNUM_SUCCESS]: (state, action) => {
        return state.merge({
          getcompanystatusnum: action.data
        });
      },
      [companyTypes.UPDATEINFO_SUCCESS]: (state, action) => {
        return state.merge({
          updateinfo: action.data
        });
      },

      [companyTypes.PACKAGEZIP_SUCCESS]: (state, action) => {
        return state.merge({
          packagezip: action.data
        });
      },
  
  },
  initState
);

export default companyReducer;

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