import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon, Cascader } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import userAction from "../../redux/actions/userAction";

const { Option } = Select;
const { RangePicker } = DatePicker
//USERINFO

@connect(
    ({ userReducer }) => ({ userReducer }),
    {
        userinfo: userAction.userinfo,
        userorderlist: userAction.userorderlist,
        recomendpage: userAction.recomendpage  
    }
)
class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 筛选属性
            page:{
                page:1,
                limit:100,
                userId:""
            },
            userinfo: "",
            searchValue: "",
            routerList: [
                {
                    name: "首页",
                    url: "/"
                },
                {
                    name: "用户管理",
                    url: "/order"
                },
                {
                    name: "用户详情",
                    url: "/order"
                }
            ],
            columns: [
                {
                    title: '订单号',
                    dataIndex: 'orderNo',
                    key: 'orderNo',
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '产品名称',
                    dataIndex: 'packageName',
                    key: 'packageName',
                },
                {
                    title: '实际支付',
                    key: 'amount',
                    dataIndex: 'amount',
                    
                },
                {
                    title: '支付方式',
                    key: 'payType',
                    // dataIndex: 'state',
                    render: (text, record) => {
                        if(record.payType == 1){
                            return <span>支付宝</span>
                        }
                        if(record.payType == 2){
                            return <span>线下支付</span>
                        }
                        if(record.payType == 3){
                            return <span>微信支付</span>
                        }
                        if(record.payType == 4){
                            return <span>余额支付</span>
                        }
                    }
                },
                {
                    title: '订单状态',
                    key: 'status',
                    // dataIndex: 'states',
                    render: (text, record) => {
                        if(record.status == 1){
                            return <span>未付款</span>
                        }
                        if(record.status == 2){
                            return <span>已支付</span>
                        }
                        if(record.status == 3){
                            return <span>已取消</span>
                        }
                        if(record.status == 4){
                            return <span>审核中</span>
                        }
                    }
                },
                {
                    title: '下单时间',
                    key: 'createTime',
                    dataIndex:"createTime"
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <Link to={`/orderDetail/${record.orderId}`}>
                        查看详情
                    </Link>
                    ),
                },
            ],
            columns1: [
                {
                    title: '注册时间',
                    dataIndex: 'crtTime',
                    key: 'crtTime',
                },{
                    title: '姓名',
                    key: 'name',
                    render:(text,record)=>(
                    <span>{record.name}</span>

                    )
                        
                },{
                    title: '账号',
                    dataIndex: 'loginName',
                    key: 'loginName',
                },{
                    title: '公司',
                    dataIndex: 'companyCount',
                    key: 'companyCount',
                },{
                    title: '开票数量',
                    dataIndex: 'invoiceCount',
                    key: 'invoiceCount',
                },{
                    title: '已开票金额',
                    dataIndex: 'invoiceMoney',
                    key: 'invoiceMoney',
                }
            ],
            data: [
               
            ],
            visible: false,
            editVisible: false
        };
    }

    componentWillMount() {
        // this.props.
        // this.props.match.params.id
        this.props.userinfo({
            userId: this.props.match.params.id
        })
        //table
        this.setState({
            page:{
                page:1,
                limit:100,
                userId: this.props.match.params.id
            }
        },()=>{

            this.props.userorderlist(this.state.page)
            this.props.recomendpage(this.state.page)
        })
        
    }
    componentWillReceiveProps(nextProps) {
        
        if (nextProps.userReducer.getIn(["userinfo"])) {
            this.setState({
                userinfo: nextProps.userReducer.getIn(["userinfo", "data"])
            })
        }

        //table
        if(nextProps.userReducer.getIn(["userorderlist"])){

          this.setState({
              data: nextProps.userReducer.getIn(["userorderlist","data","rows"])
          })
        }

        if(nextProps.userReducer.getIn(["recomendpage"])){

            this.setState({
                data1: nextProps.userReducer.getIn(["recomendpage","data","rows"])
            })
          }
    }


    render() {
        let { routerList, searchValue, userinfo } = this.state;
        // let { orderState, orderType, payType, createTime } = this.state.select

        return (
            <div className="product-container">
                {/* 产品列表 */}
                {/* 头部 */}
                <BreadeHeader routerList={routerList} />
                {/* 内容部分 */}
                <div className="userContent">
                    {/* top1 */}
                    <div className="userContent-base">
                        <div>
                            <img src={userinfo.photo} alt="" />
                        </div>
                        <div>
                            <p>{userinfo.phone}</p>
                            <p>注册时间: {userinfo.crtTime}
                                <span>最近登录时间: {userinfo.lastLoginTime} </span>
                                <span>推荐人: {userinfo.recommend} </span>
                            </p>
                        </div>
                        <div>
                            <span className="btn-diy">

                                {/* <Button onClick={this.editShowModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>修改</Button> */}

                            </span>
                            {/* <Button onClick={this.showDeleteConfirm} type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>锁定</Button> */}
                        </div>
                    </div>
                    {/* 基本信息 */}
                    <div className="userBase">
                        <p>基本信息</p>
                        <div className="userBase-content">
                            {/* 基本信息3列 */}
                            <div>
                                <span>手机号: {userinfo.phone}</span><br />
                                <span>微信号: {userinfo.wechat}</span>
                            </div>
                            <div>
                                <span>姓名: {userinfo.name}</span><br />
                                <span>联系地址: {userinfo.contactAddress}</span>
                            </div>
                            <div>
                                <span>法人邮箱: {userinfo.email}</span><br />
                                <span>注册时间: {userinfo.crtTime}</span>
                            </div>
                        </div>
                    </div>
                    {/* 订单,记录 */}
                    <div className="orderList">
                        <p>订单记录</p>
                        <div className="orderList-content">
                            {/*  */}
                            <Table bordered columns={this.state.columns} dataSource={this.state.data} />
                        </div>
                    </div>
                    <div className="orderList">
                        <p>他的下级</p>
                        <div className="orderList-content">
                            {/*  */}
                            <Table bordered columns={this.state.columns1} dataSource={this.state.data1} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default UserDetail;
