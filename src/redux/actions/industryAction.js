import { createActions } from "redux-actions";

export const industryTypes = {
    //行业列表
    INDUSTRYPAGE: "INDUSTRYPAGE",
    INDUSTRYPAGE_SUCCESS: "INDUSTRYPAGE_SUCCESS",
    //新增
    ADDINDUSTRY:"ADDINDUSTRY",
    ADDINDUSTRY_SUCCESS:"ADDINDUSTRY_SUCCESS",
    //修改
    UPTINDUSTRY:"UPTINDUSTRY",
    UPTINDUSTRY_SUCCESS:"UPTINDUSTRY_SUCCESS",
    //删除
    DELINDUSTRY:"DELINDUSTRY",
    DELINDUSTRY_SUCCESS:"DELINDUSTRY_SUCCESS",
};

export default createActions({
    [industryTypes.INDUSTRYPAGE]: data => ({ data }),
    [industryTypes.ADDINDUSTRY]: data => ({ data }),
    [industryTypes.UPTINDUSTRY]: data => ({ data }),
    [industryTypes.DELINDUSTRY]: data => ({ data }),
});


//addindustry
