import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import companyAction from "../../redux/actions/companyAction";
import NoPass from "./NoPass"
import Zmage from 'react-zmage'
const { TextArea } = Input;

const { Option } = Select;
const { RangePicker } = DatePicker
const { confirm } = Modal



@connect(
    ({ companyReducer, productReducer }) => ({ companyReducer, productReducer }),
    {
        companyoperatepass: companyAction.companyoperatepass,
        companyoperatenopass: companyAction.companyoperatenopass
    }
)
class CompanyListOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //基本信息/对接人信息
            baseInfo: "",
            //头部信息
            headerData: "",
            visible: false,

            routerList: [
                {
                    name: "首页",
                    url: "/"
                },
                {
                    name: "公司列表",
                    url: "/order"
                },
                {
                    name: "公司操作",
                    url: "/order"
                }
            ],

            columns: [
                {
                    title: '操作时间',
                    dataIndex: 'time',
                    key: 'time',
                    // render: text => text,
                },
                {
                    title: '操作记录',
                    dataIndex: 'content',
                    key: 'content',
                },
                {
                    title: '操作人',
                    dataIndex: 'name',
                    key: 'name',
                }
            ],
            data: [

            ],

        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.baseInfo) {
            this.setState({
                baseInfo: nextProps.baseInfo
            }, () => {
            })
        }

        if (nextProps.getcompanyoperaterecord) {
            let data = nextProps.getcompanyoperaterecord;
            for (let i = 0; i < data.length; i++) {
                data[i].key = i + 1;
            }
            this.setState({
                data
            })
        }
        if (nextProps.headerData) {
            this.setState({
                headerData: nextProps.headerData
            })

        }


    }

    //通过 
    companyoperatepass = () => {
        confirm({
            title: '是否确定审核通过?',
            content: '完成点击 是 ,未完成点击否',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                let data= this.props.companyoperatepass({
                    companyId: this.state.baseInfo.companyId
                });

                // 2-1
                //修改状态
                setTimeout(() => {
                    this.props.changeState("2-1");
                }, 1000)
            },
            onCancel: () => {

            },
        })





    }
    //不通过
    companyoperatenopass = () => {
        // 不通过触发modal框  
        this.setState({
            visible: true
        })

    }
    handleOk = e => {
        this.props.companyoperatenopass({
            companyId: this.state.baseInfo.companyId,
            content: e.content
        })
        this.setState({
            visible: false,
        }, () => {
            window.history.back(-1);
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };



    render() {
        let { routerList, baseInfo, headerData } = this.state
        return (
            <div>
                <BreadeHeader routerList={routerList}></BreadeHeader>
                <div className="one-content">
                    {/* name-title */}
                    <div className="name-content">
                        <div className="title">
                            <span>{headerData.companyName}</span>
                            <span>
                                {/* 通过不通过按钮组 */}
                                <span className="btn-diy">
                                    {/* <Link to="/companyListTwo"> */}
                                    <Button onClick={this.companyoperatepass} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button>
                                    {/* </Link> */}

                                    {/* <Button onClick={this.editShowModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button> */}
                                </span>
                                <Button onClick={this.companyoperatenopass} type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>不通过</Button>
                            </span>
                        </div>
                        <div className="title-detail">
                            <div>
                                <span>申请人 : {headerData.applyName}</span>
                                <span>申请时间 : {headerData.applyTime}</span>
                            </div>
                            <div>
                                <span>审核人 : {headerData.auditorName}</span>
                                <span>审核时间 : {headerData.auditorTime}</span>
                            </div>
                        </div>
                        {/* 状态 */}
                        <div className="state">
                            <p>状态</p>
                            <p>{headerData.companyStatus}</p>
                        </div>
                    </div>
                    {/* 设立流程 */}
                    <div className="process">
                        <p>设立流程</p>
                        <div className="pro-con">
                            <div className="progress">
                                <div>
                                    <span>申请</span><br />
                                    <span>申请人 : {headerData.applyName}</span><br />
                                    <span>{headerData.applyTime}</span>
                                </div>
                                <div>
                                    <span>审核</span><br />
                                    <span>审核人 : {headerData.auditorName}</span> <br />
                                    <span>{headerData.auditorTime}</span>
                                </div>
                                <div>
                                    <span>复审核</span><br />
                                    <span>审核人 : {headerData.auditorName}</span> <br />
                                    <span>{headerData.reviewTime}</span>
                                </div>
                                <div>
                                    <span>设立</span><br />
                                    <span>经办人 : {headerData.handleName}</span>
                                </div>
                                <div>
                                    <span>已设立</span><br />
                                    <span>经办人 : {headerData.handleName}</span>
                                </div>
                            </div>
                            <p style={{ width: "32%" }} className="progress-line"></p>
                        </div>
                    </div>
                    {/* 基本信息 */}
                    <div className="process base">
                        <p>基本信息
                            {/* <span onClick={this.props.updateBase} className="updateData">修改</span> */}
                            <Button size={"small"} onClick={this.props.updateBase} className="updateData" style={{ backgroundColor: "#17A2A9", color: "#FFF", marginTop: "7px" }}>修改</Button>
                        </p>
                        <div className="base-content">
                            <div>
                                <span>申请人 : {headerData.applyName}</span>
                                <span>公司名称 : {baseInfo.companyName}</span>
                                <span>纳税人类型 : {baseInfo.taxpayerType == 1 ? "一般纳税人" : "小规模纳税人"}</span>
                                <span>简税宝服务期限 : {baseInfo.serviceEndTime}</span>
                                <span>公司地区 : {baseInfo.companyRegion}</span>
                                <span>公司法人 : {baseInfo.companyLegalName}</span>
                                <span>法人证件 : {baseInfo.submitFlag == 1 ? "已提交" : "未提交"}</span>
                            </div>
                            <div>
                                <span>申请时间 : {baseInfo.applyTime}</span>
                                <span>公司类型 : {baseInfo.companyType}</span>
                                <span>增值税返还 : {baseInfo.vatReturn}</span>
                                <span>赠送时间 : {baseInfo.giveMonth}</span>
                                <span>公司行业 : {baseInfo.industryName}</span>
                                <span>法人手机 : {baseInfo.companyLegalPhone}</span>
                                <span>人脸验证 : {baseInfo.faceFlag == 1 ? "正确" : "失误"}</span>
                            </div>
                            <div>
                                {/* <span>审核状态 : </span> */}
                                {
                                    baseInfo.companyStatus == 1 ? <span>审核状态 : 待设立</span> : ""
                                }
                                {
                                    baseInfo.companyStatus == 2 ? <span>审核状态 : 审核中</span> : ""
                                }
                                {
                                    baseInfo.companyStatus == "2-1" ? <span>审核状态 : 复审中</span> : ""
                                }
                                {
                                    baseInfo.companyStatus == 3 ? <span>审核状态 : 设立中</span> : ""
                                }
                                {
                                    baseInfo.companyStatus == 4 ? <span>审核状态 : 已设立</span> : ""
                                }
                                <span>开票额度 : {baseInfo.quota}</span>
                                <span>注册资本 : {baseInfo.registeredCapital}</span>
                                <span>法人邮箱 : {baseInfo.companyLegalEmail}</span>
                                <span>开票开始时间 : {baseInfo.invoiceBeginTime}</span>
                                <span>开票截止时间 : {baseInfo.invoiceEndTime} </span>
                                <span> </span>
                            </div>
                        </div>
                        
                        {/* 身份证正反面 */}
                        <div className="base-pic">
                            <div className="fpic">
                                <Zmage
                                    src={baseInfo.cardZ}
                                    set={[{
                                        src: baseInfo.cardZ,
                                        alt: "身份证正面"
                                    }, {
                                        src: baseInfo.cardF,
                                        alt: "身份证反面"
                                    }]}
                                />
                                <p>身份证信息（点击查看）</p>
                            </div>
                        </div>
                    </div>
                    <div className="process base person">
                            <p>备注</p>
                            <TextArea disabled value={baseInfo.remark} />
                        </div>
                    {/* 对接人信息 */}
                    <div className="process base person">
                        <p>对接人信息
                             {/* <span className="updateData" onClick={this.props.updatedock}>修改</span>  */}
                            <Button size={"small"} onClick={this.props.updatedock} className="updateData" style={{ backgroundColor: "#17A2A9", color: "#FFF", marginTop: "7px" }}>修改</Button>
                        </p>
                        <div className="base-content person-content">
                            <div>
                                <span>对接人姓名 : {baseInfo.dockName}</span>
                                <span>对接人邮箱 : {baseInfo.dockEmail}</span>
                            </div>
                            <div>
                                <span>对接人身份证号 : {baseInfo.dockNum}</span>
                                <span>邮寄地址 : {baseInfo.address}</span>
                            </div>
                            <div>
                                <span>对接人手机 : {baseInfo.dockPhone}</span>
                            </div>
                        </div>


                    </div>

                    {/* 操作记录 */}
                    <div className="process">
                        <p>操作记录</p>
                        <div className="todo_table">
                            <Table size="small" bordered columns={this.state.columns} dataSource={this.state.data} />
                        </div>
                    </div>

                </div>

                <NoPass
                    title="不通过理由"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}

                >
                </NoPass>

            </div>
        );
    }
}

export default CompanyListOne;
