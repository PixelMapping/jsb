export const urls = {
  //登录
  LOGIN: "/jwt/token",


  /**
   * 产品模块-产品列表 Api 
   */
  //产品列表
  PRODUCTLIST:"/simpleTax/packageWeb/packageWebList",
  //新增产品
  ADDPRODUCTLIST:"/simpleTax/packageWeb/addPackageWeb",
  //编辑产品
  EDITPRODUCTLIST:"/simpleTax/packageWeb/updatePackageWeb",
  //删除产品
  DELETEPRODUCTLIST:"/simpleTax/packageWeb/deletePackageWeb",
  //产品分类列表
  PRODUCTCLASSIFY:"/simpleTax/companyTypeWeb/companyTypeWebList",
  //开票额度
  GETDICTLISTBYTYPE:"/simpleTax/dictWeb/getDictListByType",

  /**
   * 产品模块-产品分类 Api
   */

   //编辑分类
  UPDATECOMPANYTYPE:"/simpleTax/companyTypeWeb/updateCompanyType",
  //新增分类
  ADDCOMPANYTYPE :"/simpleTax/companyTypeWeb/addCompanyType",
  //删除分类
  DELETECOMPANYTYPE:"/simpleTax/companyTypeWeb/deleteCompanyType",

  /**
   * 订单模块
   */
  //订单列表
  ORDERLIST:"/simpleTax/orderWeb/orderList",
  //订单详情
  ORDERDETAIL:"/simpleTax/orderWeb/orderDetail",
  //订单记录
  ORDERRECORD:"/simpleTax/orderWeb/orderRecord",
  //确认收款
  COMFIRMOFFLINEPAY:"/simpleTax/comfirmOfflinePay",
  //添加备注
  ADDREMARK:"/simpleTax/orderWeb/addRemark",
  //订单修改
  UPTORDER:"/simpleTax/orderWeb/uptOrder",
  //订单数
  GETORDERCOUNT:"/simpleTax/orderWeb/getOrderCount",
  //驳回订单
  REJECTS:"/simpleTax/reject",

   /**
   * 公司模块
   */
  //公司列表
  COMPANYWEBLIST:"/simpleTax/companyWeb/companyWebList",
  //公司详情
  COMPANYDETAILWEB:"/simpleTax/companyWeb/companyDetailWeb",
  //公司操作-基本信息,对接人信息
  GETBASICCOMPANY:"/simpleTax/companyWeb/getBasicCompany",
  //公司操作-操作记录
  GETCOMPANYOPERATERECORD:"/simpleTax/companyWeb/getCompanyOperateRecord",
  //公司操作头部返回信息
  COMPANYOPERATEDETAIL:'/simpleTax/companyWeb/companyOperateDetail',
  //审核通过
  COMPANYOPERATEPASS:"/simpleTax/companyApp/companyOperatePass",
  //审核不通过
  COMPANYOPERATENOPASS:"/simpleTax/companyApp/companyOperateNoPass",
  ////复审-资料补全信息
  GETCOMPLETEDATA:"/simpleTax/companyWeb/getCompleteData",
  // //复审 --通过
  COMPANYREVIEWOPERATEPASS:"/simpleTax/companyApp/companyReviewOperatePass",
  //复审--不通过
  COMPANYREVIEWOPERATENOPASS:"/simpleTax/companyApp/companyReviewOperateNoPass",
  
  //设立
  COMPANYOPERATEESTABLISH:"/simpleTax/companyWeb/companyOperateEstablish",
  //驳回
  COMPANYOPERATEREJECT:"/simpleTax/companyWeb/companyOperateReject",
  //锁定
  COMPANYOPERATEBILLLOCK:"/simpleTax/companyWeb/companyOperateBillLock",
  //发消息给客户
  SENDNOTICE:"/simpleTax/messageWeb/sendNotice",
  //修改对接人信息
  UPDATEDOCK:"/simpleTax/companyWeb/updateDock",

  //名称审核
  NAMEEXAMINE:"/simpleTax/companyWeb/nameExamine",
  //工商阶段完成
  BUSINESSEXAMINE:"/simpleTax/companyWeb/businessExamine",
  //银行开户完成
  ACCOUNTEXAMINE:"/simpleTax/companyWeb/accountExamine",
  //税务认证
  TAXEXAMINE:"/simpleTax/companyWeb/taxExamine",
  //设立资料选项
  GETDATATYPE:"/simpleTax/dataWeb/getDataType",
  //增加上传项目
  ADDDATATYPE:"/simpleTax/dataWeb/addDataType",
  //勾选//取消
  CHECKDATATYPE:"/simpleTax/dataWeb/checkDataType",
  //查看上传资料
  DATALIST:"/simpleTax/dataWeb/dataList",
  //一键通知
  NOTICE:"/simpleTax/dataWeb/notice",
  //工商信息
  GETDATA:"/simpleTax/companyWeb/getData",
  //更新营业执照图片地址
  UPDATELICENSE:"/simpleTax/companyWeb/updateLicense",
  //发票统计信息
  GETINVOICEINFO:"/simpleTax/companyWeb/getInvoiceInfo",
  //获取行业下拉列
  INDUSTRYLIST:"/simpleTax/industryWeb/industryList",
  //修改公司基本信息
  UPDATEBASICCOMPANY:"/simpleTax/companyWeb/updateBasicCompany",
  //获取经办人列表
  GETMANAGERLIST:"/simpleTax/companyWeb/getManagerList",
  //通知记录
  NOTICELIST:"/simpleTax/messageWeb/noticeList",
  //添加信息
  UPTBELONGER :"/simpleTax/companyWeb/uptBelonger",
  //公司数据
  GETCOMPANYSTATUSNUM :"/simpleTax/companyWeb/getCompanyStatusNum",
//更新工商信息
  UPDATEINFO:"/simpleTax/companyWeb/updateInfo",
  

  /**
   * 法人库
   */
  //获取省市区
  GETREGIONBYPID:"/simpleTax/sAreaWeb/getRegionByPid",
  //法人库列表
  LEGALLIST :"/simpleTax/legalWeb/legalList",
  //法人详情
  LEGALDETAIL:"/simpleTax/legalWeb/legalDetail",
  //法人详情下的公司;列表
  GETCOMPANYBYLEGALID:"/simpleTax/companyWeb/getCompanyByLegalId",
  //锁定法人
  LOCKLEGAL:"/simpleTax/legalWeb/lockLegal",

  /**
   * 发票
   */
  //发票列表-已开票
  INVOICEPAGE:"/simpleTax/billWeb/invoicePage",
  //发票申请列表
  APPLYINVOICEPAGE:"/simpleTax/billWeb/applyInvoicePage",
  //发票详情
  BILLINFO:"/simpleTax/billWeb/billInfo",
  //发票审核通过
  AUDITPASS:"/simpleTax/billWeb/auditPass",
  //开票
  INVOICECOMPLETION:"/simpleTax/billWeb/invoiceCompletion",
  //邮寄
  EXPRESS:"/simpleTax/billWeb/express",
  //驳回
  REJECT:"/simpleTax/billWeb/reject",
  //查看发票
  VIEWINVOICE:"/simpleTax/billWeb/viewInvoice",
  //发票列表统计不同状态数量
  COUNTSTATUS:"/simpleTax/billWeb/countStatus",

  /**
   * 字典列表
   */
  GETDICTLISTBYVALUE:"/simpleTax/dictApp/getDictListByValue",


  /**
   * 用户
   */
  USERPAGE:"/simpleTax/userWeb/userPage",
  //删除
  REMOVE:"/simpleTax/userWeb/remove",
  //用户详情
  USERINFO:"/simpleTax/userWeb/userInfo",

  //用户详情
  RECOMENDPAGE:"/simpleTax/userWeb/recomendPage",
  //用户详情订单列表
  USERORDERLIST:"/simpleTax/orderWeb/userOrderList",
  //启用/冻结
  ISUSING:'/simpleTax/userWeb/isUsing',
  //编辑客服
  EDITMANAGE:"/simpleTax/userWeb/editManage",
  //新增客服
  ADDMANAGE:"/simpleTax/userWeb/addManage",

  //客服列表
  MANAGERPAGE:"/simpleTax/managerWeb/managerPage",



  /**
   * 行业类型
   */
  //行业类型列表
  INDUSTRYPAGE:"/simpleTax/industryWeb/industryPage",
  //新增行业类别
  ADDINDUSTRY:'/simpleTax/industryWeb/addIndustry',
  //修改
  UPTINDUSTRY:"/simpleTax/industryWeb/uptIndustry",
  //删除
  DELINDUSTRY:"/simpleTax/industryWeb/delIndustry",

  //首页数量
  INDEXINFO:"/simpleTax/userWeb/indexTopCount",

  //首页折线图
  INDEXCHART:"/simpleTax/userWeb/chart",






  //经办资料下载
  PACKAGEZIP:"/simpleTax/dataWeb/packageZip",
};
