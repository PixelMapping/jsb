import { createActions } from "redux-actions";

export const billTypes = {
    //发票列表
    INVOICEPAGE: "INVOICEPAGE",
    INVOICEPAGE_SUCCESS: "INVOICEPAGE_SUCCESS",
    //发票申请列表
    APPLYINVOICEPAGE: "APPLYINVOICEPAGE",
    APPLYINVOICEPAGE_SUCCESS: "APPLYINVOICEPAGE_SUCCESS",
    //发票详情
    BILLINFO: "BILLINFO",
    BILLINFO_SUCCESS: "BILLINFO_SUCCESS",
    //发票审核通过
    AUDITPASS: "AUDITPASS",
    AUDITPASS_SUCCESS: "AUDITPASS_SUCCESS",
    // 开票
    INVOICECOMPLETION: "INVOICECOMPLETION",
    INVOICECOMPLETION_SUCCESS: "INVOICECOMPLETION_SUCCESS",
    //邮寄
    EXPRESS: "EXPRESS",
    EXPRESS_SUCCESS: "EXPRESS_SUCCESS",
    //驳回
    REJECT: "REJECT",
    REJECT_SUCCESS: "REJECT_SUCCESS",
    //查看发票
    VIEWINVOICE: "VIEWINVOICE",
    VIEWINVOICE_SUCCESS: "VIEWINVOICE_SUCCESS",
    //发票列表统计不同状态数量
    COUNTSTATUS: "COUNTSTATUS",
    COUNTSTATUS_SUCCESS: "COUNTSTATUS_SUCCESS",



};

export default createActions({
    [billTypes.INVOICEPAGE]: data => ({ data }),
    [billTypes.APPLYINVOICEPAGE]: data => ({ data }),
    [billTypes.BILLINFO]: data => ({ data }),
    [billTypes.AUDITPASS]: data => ({ data }),
    [billTypes.INVOICECOMPLETION]: data => ({ data }),
    [billTypes.EXPRESS]: data => ({ data }),
    [billTypes.REJECT]: data => ({ data }),
    [billTypes.VIEWINVOICE]: data => ({ data }),
    [billTypes.COUNTSTATUS]: data => ({ data }),
});

