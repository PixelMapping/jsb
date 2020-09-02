import { handleActions } from "redux-actions";
import { billTypes } from "../actions/billAction";
import moment from "moment";
import { Map, fromJS, merge } from "immutable";

const initState = fromJS({
    invoicepage:""
});

const billReducer = handleActions(
  {
    [billTypes.INVOICEPAGE_SUCCESS]: (state, action) => {
        return state.merge({
            invoicepage: action.data
        });
      },
     //APPLYINVOICEPAGE
     [billTypes.APPLYINVOICEPAGE_SUCCESS]: (state, action) => {
        return state.merge({
            applyinvoicepage: action.data
        });
      },

      [billTypes.BILLINFO_SUCCESS]: (state, action) => {
        return state.merge({
          billinfo: action.data
        });
      },

      [billTypes.AUDITPASS_SUCCESS]: (state, action) => {
        return state.merge({
          auditpass: action.data
        });
      },
      [billTypes.INVOICECOMPLETION_SUCCESS]: (state, action) => {
        return state.merge({
          invoicecompletion: action.data
        });
      },
      [billTypes.EXPRESS_SUCCESS]: (state, action) => {
        return state.merge({
          express: action.data
        });
      },
      [billTypes.REJECT_SUCCESS]: (state, action) => {
        return state.merge({
          reject: action.data
        });
      },
      [billTypes.VIEWINVOICE_SUCCESS]: (state, action) => {
        return state.merge({
          viewinvoice: action.data
        });
      },
      [billTypes.COUNTSTATUS_SUCCESS]: (state, action) => {
        return state.merge({
          countstatus: action.data
        });
      },
  },
  initState
);

export default billReducer;

//BILLINFO
//AUDITPASS
//INVOICECOMPLETION
//EXPRESS
//REJECT
//VIEWINVOICE
//COUNTSTATUS

