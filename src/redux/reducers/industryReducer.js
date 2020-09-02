import { handleActions } from "redux-actions";
import { industryTypes } from "../actions/industryAction";
import moment from "moment";
import { Map, fromJS, merge } from "immutable";

const initState = fromJS({
    
});

const industryReducer = handleActions(
  {
    [industryTypes.INDUSTRYPAGE_SUCCESS]: (state, action) => {
        return state.merge({
            industrypage: action.data
        });
      },

      [industryTypes.ADDINDUSTRY_SUCCESS]: (state, action) => {
        return state.merge({
            addindustry: action.data
        });
      },

      [industryTypes.UPTINDUSTRY_SUCCESS]: (state, action) => {
        return state.merge({
            uptindustry: action.data
        });
      },

      [industryTypes.DELINDUSTRY_SUCCESS]: (state, action) => {
        return state.merge({
            delindustry: action.data
        });
      },
  },
  initState
);

export default industryReducer;

//INDUSTRYPAGE

//ADDINDUSTRY

//UPTINDUSTRY

//DELINDUSTRY

