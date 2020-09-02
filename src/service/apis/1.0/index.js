import ApiRequest from "../../request/ApiRequest";
import { urls } from "./urls";

class Apis {
  constructor() {}
  login = data => ApiRequest.post(urls.LOGIN, data);

  /**
   * 产品模块-产品列表 Api 
   */
  //产品列表   &companyTypeId=''&packageState=''&search=''
  productlist = data=>ApiRequest.get(`${urls.PRODUCTLIST}?page=${data.page}&limit=${data.limit}&companyTypeId=${data.companyTypeId}&packageState=${data.packageState}&search=${data.search}`);
  //产品分类列表
  productclassify = data=>ApiRequest.get(`${urls.PRODUCTCLASSIFY}?page=${data.page}&limit=${data.limit}`);
  //产品列表删除
  deleteproductlist = data=> ApiRequest.put(`${urls.DELETEPRODUCTLIST}`,data);
  //新增产品
  addproductlist = data=> ApiRequest.post(`${urls.ADDPRODUCTLIST}`,data);
  //编辑产品
  editproductlist = data => ApiRequest.put(`${urls.EDITPRODUCTLIST}`,data);
  // 开票额度
  getdictlistbytype = data => ApiRequest.get(`${urls.GETDICTLISTBYTYPE}?type=add_product_quota_type`);

  /**
   * 产品模块-产品分类 Api 
   */
  //编辑分类
  updatecompanytype = data=> ApiRequest.put(`${urls.UPDATECOMPANYTYPE}`,data);
  //新增分类
  addcompanytype = data=>ApiRequest.post(`${urls.ADDCOMPANYTYPE}`,data);
  //删除分类
  deletecompanytype = data => ApiRequest.put(`${urls.DELETECOMPANYTYPE}`,data);

  /**
   * 订单模块 Api
   */
  //订单列表
  orderlist = data => ApiRequest.get(`${urls.ORDERLIST}?page=${data.page}&limit=${data.limit}&status=${data.status}&companyTypeId=${data.companyTypeId}&payType=${data.payType}&startDate=${data.startDate}&endDate=${data.endDate}&search=${data.search}`);
  //订单详情
  orderdetail = data => ApiRequest.get(`${urls.ORDERDETAIL}?orderId=${data.orderId}`);
  //订单记录
  orderrecord = data => ApiRequest.get(`${urls.ORDERRECORD}?orderId=${data.orderId}&page=${data.page}&limit=${data.limit}`)
  //确认收款
  comfirmofflinepay = data => ApiRequest.post(`${urls.COMFIRMOFFLINEPAY}`,data);
  //添加备注
  addremark = data=> ApiRequest.put(`${urls.ADDREMARK}`,data);
  //订单修改
  uptorder = data=> ApiRequest.put(`${urls.UPTORDER}`,data);
  //定单数
  getordercount = data => ApiRequest.get(`${urls.GETORDERCOUNT}`);
  //订单驳回
  rejects = data => ApiRequest.put(`${urls.REJECTS}`,data);

  /**
   * 公司 API
   */
  //公司列表
  companyweblist = data=> ApiRequest.get(`${urls.COMPANYWEBLIST}?page=${data.page}&limit=${data.limit}&companyStatus=${data.companyStatus}&companyTypeId=${data.companyTypeId}&establishBeginTime=${data.establishBeginTime}&establishEndTime=${data.establishEndTime}&search=${data.search}`);
  //公司详情
  companydetailweb = data=> ApiRequest.get(`${urls.COMPANYDETAILWEB}?companyId=${data.companyId}`);
  //公司操作-基本信息,对接人信息
  getbasiccompany = data=> ApiRequest.get(`${urls.GETBASICCOMPANY}?companyId=${data.companyId}`);
  //公司操作-操作记录
  getcompanyoperaterecord = data=> ApiRequest.get(`${urls.GETCOMPANYOPERATERECORD}?companyId=${data.companyId}`);
  //公司操作头部返回信息
  companyoperatedetail = data=> ApiRequest.get(`${urls.COMPANYOPERATEDETAIL}?companyId=${data.companyId}`);
  //审核通过
  companyoperatepass = data=> ApiRequest.put(`${urls.COMPANYOPERATEPASS}`,data);
  //审核不通过
  companyoperatenopass = data=> ApiRequest.put(`${urls.COMPANYOPERATENOPASS}`,data);
  //复审-资料补全信息
  getcompletedata = data=>ApiRequest.get(`${urls.GETCOMPLETEDATA}?companyId=${data.companyId}`);
  //复审 --通过
  companyreviewoperatepass = data=>ApiRequest.put(`${urls.COMPANYREVIEWOPERATEPASS}`,data);
  //复审--不通过
  companyreviewoperatenopass = data=> ApiRequest.put(`${urls.COMPANYREVIEWOPERATENOPASS}`,data);

  //  //设立
  companyoperateestablish = data=> ApiRequest.put(`${urls.COMPANYOPERATEESTABLISH}`,data);
  //  //驳回
  companyoperatereject = data=> ApiRequest.put(`${urls.COMPANYOPERATEREJECT}`,data);
  //  //锁定
  companyoperatebilllock = data=> ApiRequest.put(`${urls.COMPANYOPERATEBILLLOCK}`,data);
  //发消息给客户
  sendnotice = data=> ApiRequest.post(`${urls.SENDNOTICE}`,data);
  //修改对接人信息
  updatedock =data=> ApiRequest.put(`${urls.UPDATEDOCK}`,data);

  // //名称审核
  nameexamine = data => ApiRequest.put(`${urls.NAMEEXAMINE}`,data);
  // //工商阶段完成
  businessexamine = data => ApiRequest.put(`${urls.BUSINESSEXAMINE}`,data);
  // //银行开户完成
  accountexamine = data => ApiRequest.put(`${urls.ACCOUNTEXAMINE}`,data);
  // //税务认证
  taxexamine = data => ApiRequest.put(`${urls.TAXEXAMINE}`,data);
  //设立资料选项
  getdatatype = data => ApiRequest.get(`${urls.GETDATATYPE}?companyId=${data.companyId}`);
  //增加上传项
  adddatatype = data => ApiRequest.post(`${urls.ADDDATATYPE}`,data);
  //勾选//取消
  checkdatatype = data => ApiRequest.put(`${urls.CHECKDATATYPE}`,data);
  //查看上传资料
  datalist = data => ApiRequest.get(`${urls.DATALIST}?companyId=${data.companyId}`);
  //一键通知
  notice = data => ApiRequest.put(`${urls.NOTICE}`,data);
  //工商信息
  getdata = data => ApiRequest.get(`${urls.GETDATA}?id=${data.id}`);
  //更新营业执照图片地址
  updatelicense = data => ApiRequest.put(`${urls.UPDATELICENSE}`,data);
  //发票统计信息
  getinvoiceinfo = data => ApiRequest.get(`${urls.GETINVOICEINFO}?companyId=${data.companyId}`);
  //获取行业下拉
  industrylist = data => ApiRequest.get(`${urls.INDUSTRYLIST}?companyId=${data.companyId}`);
  //修改公司基本信息
  updatebasiccompany = data => ApiRequest.put(`${urls.UPDATEBASICCOMPANY}`,data);
  //通知记录
  noticelist = data => ApiRequest.get(`${urls.NOTICELIST}?businessId=${data.businessId}&page=${data.page}&limit=${data.limit}`);
  //添加信息
  uptbelonger = data => ApiRequest.put(`${urls.UPTBELONGER}`,data);
  //公司数据
  getcompanystatusnum = data => ApiRequest.get(`${urls.GETCOMPANYSTATUSNUM}`);
  //更新工商信息
  updateinfo = data => ApiRequest.put(`${urls.UPDATEINFO}`,data);



  /**
   * 法人库
   */
  //省市区
  getregionbypid = data => ApiRequest.get(`${urls.GETREGIONBYPID}?pId=${data.pId}`);
  //法人库列表
  legallist = data => ApiRequest.get(`${urls.LEGALLIST}?page=${data.page}&limit=${data.limit}&search=${data.search}&startDate=${data.startDate}&endDate=${data.endDate}`)
  //法人详情
  legaldetail = data => ApiRequest.get(`${urls.LEGALDETAIL}?legalId=${data.legalId}`);
  //法人详情下的公司列表
  getcompanybylegalid = data => ApiRequest.get(`${urls.GETCOMPANYBYLEGALID}?legalId=${data.legalId}&page=${data.page}&limit=${data.limit}`);
  //锁定法人
  locklegal  = data =>ApiRequest.put(`${urls.LOCKLEGAL}`,data);
  //获取经办人列表
  getmanagerlist = data => ApiRequest.get(`${urls.GETMANAGERLIST}`);



  /**
   * 发票
   */
  //发票列表-已开票
  invoicepage = data=> ApiRequest.get(`${urls.INVOICEPAGE}?page=${data.page}&limit=${data.limit}&invoiceType=${data.invoiceType}&companyType=${data.companyType}&startDate=${data.startDate}&endDate=${data.endDate}`) ;
  //发票申请列表
  applyinvoicepage = data=>ApiRequest.get(`${urls.APPLYINVOICEPAGE}?page=${data.page}&limit=${data.limit}&invoiceType=${data.invoiceType}&billStatus=${data.billStatus}&companyType=${data.companyType}&startDate=${data.startDate}&endDate=${data.endDate}`);
  //发票详情
  billinfo = data => ApiRequest.get(`${urls.BILLINFO}?billId=${data.billId}`);
  //发票审核通过
  auditpass = data => ApiRequest.post(`${urls.AUDITPASS}`,data);
  //开票
  invoicecompletion = data => ApiRequest.post(`${urls.INVOICECOMPLETION}`,data);
  //邮寄
  express = data => ApiRequest.post(`${urls.EXPRESS}`,data);
  //驳回
  reject = data => ApiRequest.post(`${urls.REJECT}`,data);
  //查看发票
  viewinvoice = data => ApiRequest.get(`${urls.VIEWINVOICE}?billId=${data.billId}`);
  //发票列表统计不同状态数量
  countstatus = data => ApiRequest.get(`${urls.COUNTSTATUS}`);

  /**
   * 字典列表
   */
  //归属人
  getdictlistbyvalue = data => ApiRequest.get(`${urls.GETDICTLISTBYVALUE}?type=${data.type}`);




  /**
   * 用户
   */
  userpage = data => ApiRequest.get(`${urls.USERPAGE}?page=${data.page}&limit=${data.limit}&startDate=${data.startDate}&endDate=${data.endDate}&search=${data.search}`);
  //删除
  remove = data => ApiRequest.delete(`${urls.REMOVE}`,data);
  //用户详细信息
  userinfo = data => ApiRequest.get(`${urls.USERINFO}?userId=${data.userId}`);
  recomendpage  = data => ApiRequest.get(`${urls.RECOMENDPAGE}?page=${data.page}&limit=${data.limit}&userId=${data.userId}`);
  //用户详情订单列表
  userorderlist = data => ApiRequest.get(`${urls.USERORDERLIST}?page=${data.page}&limit=${data.limit}&userId=${data.userId}`);
  //启用/冻结
  isusing = data => ApiRequest.put(`${urls.ISUSING}`,data);
  //编辑客服
  editmanage = data => ApiRequest.put(`${urls.EDITMANAGE}`,data);
  //新增客服
  addmanage = data => ApiRequest.post(`${urls.ADDMANAGE}`,data)
   


  //客服列表
  managerpage = data => ApiRequest.get(`${urls.MANAGERPAGE}?page=${data.page}&limit=${data.limit}&search=${data.search}`);

  /**
   * 行业类型
   */
  //行业类型列表
  industrypage = data => ApiRequest.get(`${urls.INDUSTRYPAGE}?page=${data.page}&limit=${data.limit}&companyTypeId=${data.companyTypeId}&search=${data.search}`);
  //新增行业类别
  addindustry = data => ApiRequest.post(`${urls.ADDINDUSTRY}`,data);
  //修改
  uptindustry = data => ApiRequest.put(`${urls.UPTINDUSTRY}`,data);
  //删除
  delindustry = data => ApiRequest.delete(`${urls.DELINDUSTRY}`,data)





  //经办资料下载
  packagezip = data => ApiRequest.get(`${urls.PACKAGEZIP}?companyId=${data.companyId}`)


  
  //首页信息
  indexInfo = data => ApiRequest.get(`${urls.INDEXINFO}`)



  //公司列表
  companyTypeWebList= data => ApiRequest.get(`/simpleTax/companyTypeWeb/companyTypeWebList?page=${data.page}&limit=${data.limit}`)
  

  //经营范围一级
  getCategoryList= data => ApiRequest.get(`/simpleTax/sBusinessWeb/getCategoryList?page=${data.page}&limit=${data.limit}&companyTypeId=${data.companyTypeId}`)
    
  //经营范围一级
  getBusinessList= data => ApiRequest.get(`/simpleTax/sBusinessWeb/getBusinessList?page=${data.page}&limit=${data.limit}&companyTypeId=${data.companyTypeId}&pid=${data.pid}`)

  //经营范围—类别新增
  categoryAdd = data => ApiRequest.post(`/simpleTax/sBusinessWeb/categoryAdd`,data);

  //经营范围-二级新增
  businessAdd = data => ApiRequest.post(`/simpleTax/sBusinessWeb/businessAdd`,data);

  //经营范围更新
  update = data => ApiRequest.put(`/simpleTax/sBusinessWeb/update`,data);

  //经营范围删除
  deleteCate = data => ApiRequest.put(`/simpleTax/sBusinessWeb/delete`,data);

  //获取菜单
  getUserAuthById= data => ApiRequest.get(`/simpleTax/menu/getUserAuthById?userId=${data.userId}`)

  //税金提醒列表
  remindTaxPage= data => ApiRequest.get(`/simpleTax/billWeb/remindTaxPage?page=${data.page}&limit=${data.limit}&startDate=${data.startDate}&endDate=${data.endDate}`)

  //税金提醒详情
  remindTaxInfo= data => ApiRequest.get(`/simpleTax/billWeb/remindTaxInfo?companyId=${data.companyId}&submitTime=${data.submitTime}&type=${data.type}`)

  //税金提醒详情季度
  quarterTaxPage= data => ApiRequest.get(`/simpleTax/billWeb/quarterTaxPage?page=${data.page}&limit=${data.limit}&quarter=${data.quarter}`) 
    
  //角色列表
  getGroupList= data => ApiRequest.get(`/simpleTax/group/getGroupList?page=${data.page}&limit=${data.limit}`)

  //新增角色
  group = data => ApiRequest.post(`/simpleTax/group/group`,data);

  //新增角色
  updGroup = data => ApiRequest.post(`/simpleTax/group/updGroup`,data);

  //删除角色
  delGroup = data => ApiRequest.delete(`/simpleTax/group/delGroup`,data);

  //获取菜单权限
  getMenus = data => ApiRequest.get(`/simpleTax/menu/getMenus`);

  //保存权限
  saveGroupMenuAuthy = data => ApiRequest.post(`/simpleTax/resourceAuthority/saveGroupMenuAuthy`,data);

  //获取绑定角色菜单权限
  getGroupMenuBind = data => ApiRequest.get(`/simpleTax/resourceAuthority/getGroupMenuBind?groupId=${data.groupId}`);

  //提交缴纳税金
  remind = data => ApiRequest.post(`/simpleTax/billWeb/remind`,data);

  //员工列表
  employeePage= data => ApiRequest.get(`/simpleTax/managerWeb/employeePage?page=${data.page}&limit=${data.limit}&search=${data.search}`) 

  //角色下拉列表
  groupList= data => ApiRequest.get(`/simpleTax/group/groupList`) 
 
  //员工绑定角色
  userGroup = data => ApiRequest.post(`/simpleTax/userGroup/userGroup`,data);
}

export default new Apis();
