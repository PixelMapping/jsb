import React from "react";
import loadable from "@loadable/component";
import RouterView from "../components/layout/RouterView";
import NoFound from "../pages/NoFound";
import NoPermission from "../pages/NoPermission";
import Loading from "../components/layout/Loading";
// const Index = loadable(() => import("../pages/Index"), { fallback: <Loading /> });
//仪表盘
const Dashboard = loadable(() => import("../pages/dashboard/Dashboard"), { fallback: <Loading /> });
// 产品列表
const Product = loadable(()=> import("../pages/product/Product"),{fallback : <Loading/>});
//产品分类
const ProductClassify = loadable(()=> import("../pages/product/ProductClassify"), { fallback: <Loading/> });
//订单管理
const Order = loadable(()=> import("../pages/order/Order"), { fallback :<Loading/> });
//订单详情
const OrderDetail = loadable(()=> import("../pages/order/OrderDetail"), { fallback: <Loading/> });
//公司列表
const CompanyList = loadable(()=> import("../pages/company/CompanyList"), {fallback : <Loading/>});
//公司详情
const CompanyDetail = loadable(()=> import("../pages/company/CompanyDetail"), {fallback : <Loading/>});
//公司操作审核中 
const CompanyListOne = loadable(()=> import ("../pages/company/CompanyListOne"), {fallback: <Loading/>});
//公司操作设立中
const CompanyListTwo = loadable(()=> import ("../pages/company/CompanyListTwo"), {fallback: <Loading/>});
//公司操作已设立
const CompanyListThree = loadable(()=> import ("../pages/company/CompanyListThree"), {fallback: <Loading/>});
//法人库
const CorporateLibrary = loadable(()=> import("../pages/corporateLibrary/CorporateLibrary"), { fallback: <Loading/> });
//法人详情
const CorporateLibraryDetail = loadable(()=> import("../pages/corporateLibrary/CorporateLibraryDetail"), { fallback: <Loading/> });
//用户管理
const User = loadable(()=> import("../pages/user/User"), { fallback: <Loading/> });
//用户详情
const UserDetail = loadable(()=> import("../pages/user/UserDetail"), { fallback: <Loading/> });
// 申请列表
const ApplyBill = loadable(()=> import("../pages/bill/ApplyBill"), { fallback:<Loading/> });
//发票列表
const BillList = loadable(()=> import("../pages/bill/BillList"), { fallback: <Loading/> });
//发票详情
const BillDetail = loadable(()=> import("../pages/bill/BillDetail"), { fallback: <Loading/> });
//税金提醒列表
const Remind = loadable(()=> import("../pages/bill/Remind"), { fallback: <Loading/> });
//客服列表
const CustomerService = loadable(()=> import("../pages/CustomerService/CustomerService"), { fallback: <Loading/> });
//角色
const Role = loadable(()=> import("../pages/Role/Role"), { fallback: <Loading/> });
//员工
const Staff = loadable(()=> import("../pages/Staff/Staff"), { fallback: <Loading/> });

//行业类型
const Industry = loadable(()=> import("../pages/industry/Industry"),{ fallback: <Loading/> });
//经营范围
const Scope = loadable(()=> import("../pages/industry/scope"),{ fallback: <Loading/> });

// 注意区分前端路由和前端菜单是两个不同的东西
// 注：菜单和路由都是基于该路由数据生成
// 菜单可以不全部展示在页面上(隐藏)，但路由必须全部要定义
// 后期可以加入权限控制
const routes = [
  {
    key: "1",
    name: "仪表盘",
    path: "/",
    exact: true,
    component: Dashboard
  },
  {
    key: "2",
    name: "产品",
    path: "/product",
    exact: true,
    component: Product
  },
  {
    key:"3",
    name:"产品分类",
    path:"/productClassify",
    exact:true,
    component:ProductClassify
  },
  {
    key:"3",
    name:"订单管理",
    path:"/order",
    exact:true,
    component:Order
  },
  {
    key:"4",
    name:"订单详情",
    path:"/orderDetail/:id",
    exact:true,
    component:OrderDetail
  },
  {
    key:"5",
    name:"公司列表",
    path:"/companyList",
    exact:true,
    component:CompanyList
  },{
    key:"6",
    name:"公司操作审核中",
    path:"/companyListOne",
    exact:true,
    component:CompanyListOne
  },
  {
    key:"6",
    name:"公司操作设立中",
    path:"/companyListTwo",
    exact:true,
    component:CompanyListTwo
  },
  {
    key:"6",
    name:"公司操作已设立",
    path:"/companyListThree",
    exact:true,
    component:CompanyListThree
  },
  {
    key:"7",
    name:"法人库",
    path:"/corporateLibrary",
    exact:true,
    component:CorporateLibrary
  },
  {
    keyL:"8",
    name:"法人详情",
    path:"/corporateLibraryDetail/:id",
    exact:true,
    component:CorporateLibraryDetail
  },
  {
    key:"9",
    name:"用户管理",
    path:"/user",
    exact:true,
    component:User
  },
  {
    keyL:"10",
    name:"用户详情",
    path:"/userDetail/:id",
    exact:true,
    component:UserDetail
  },
  {
    key:"11",
    name:"申请列表",
    path:"/applyBill",
    exact:true,
    component:ApplyBill
  },
  {
    key:"12",
    name:"发票列表",
    path:"/billList",
    exact:true,
    component:BillList
  },
  {
    key:"13",
    name:"发票详情",
    path:"/billDetail/:id",
    exact:true,
    component:BillDetail
  },
  {
    key:"18",
    name:"税金提醒列表",
    path:"/remind/",
    exact:true,
    component:Remind
  },
  {
    key:"14",
    name:"客服列表",
    path:"/customerService",
    exact:true,
    component:CustomerService
  },{
    key:"15",
    name:"公司详情",
    path:"/companyDetail/:data",
    exact:true,
    component:CompanyDetail
  },
  //Industry
  {
    key:"16",
    name:"行业类型",
    path:"/industry",
    exact:true,
    component:Industry
  },
  {
    key:"17",
    name:"经营范围",
    path:"/scope",
    exact:true,
    component:Scope
  },
  {
    key:"19",
    name:"角色",
    path:"/role",
    exact:true,
    component:Role
  },
  {
    key:"20",
    name:"员工",
    path:"/staff",
    exact:true,
    component:Staff
  },
];

export default routes;
