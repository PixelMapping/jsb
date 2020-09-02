import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Radio, Icon, Checkbox, message } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux";
import companyAction from "../../redux/actions/companyAction";
import NoPass from "./NoPass"
import TwoModal from "./TwoModal"
import Zmage from 'react-zmage'
const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const { confirm } = Modal
const { TextArea } = Input;
//companyreviewoperatepass


@connect(
    ({ companyReducer, productReducer }) => ({ companyReducer, productReducer }),
    {
        //复审通过-----
        companyreviewoperatepass: companyAction.companyreviewoperatepass,
        //复审不通过
        companyreviewoperatenopass: companyAction.companyreviewoperatenopass,
        //获取经办人列表
        getmanagerlist: companyAction.getmanagerlist
    }
)
class CompanyListOneRepeat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //基本信息/对接人信息
            baseInfo: "",
            headerData: "",
            getcompletedata: "",
            value: 1,
            visible: false,
            getmanagerlist: "",
            options: [
                { label: '选项1', value: 'Apple' },
                { label: '选项2', value: 'Pear' },
                { label: '选项3', value: 'Orange' },
            ],
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

    componentWillMount() {
        // 获取经办人列表
        this.props.getmanagerlist()
    }

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.baseInfo) {
            this.setState({
                baseInfo: nextProps.baseInfo
            }, () => {
                console.log("接受到的基本信息对接人信息", nextProps.baseInfo);
            })
        }

        if (nextProps.getcompanyoperaterecord) {
            console.log("接收到的操作记录", nextProps.getcompanyoperaterecord)
            let data = nextProps.getcompanyoperaterecord;
            for (let i = 0; i < data.length; i++) {
                data[i].key = i + 1;
            }
            this.setState({
                data
            })
        }
        if (nextProps.headerData) {
            console.log("接收到的头部操作信息", nextProps.headerData)
            this.setState({
                headerData: nextProps.headerData
            })

        }
        if (nextProps.getcompletedata) {
            console.log("接受到的资料补全信息", nextProps.getcompletedata)
            this.setState({
                getcompletedata: nextProps.getcompletedata
            })
        }
        //复审通过的结果
        if (nextProps.companyReducer.getIn(["companyreviewoperatepass"])) {
            console.log(nextProps.companyReducer.getIn(["companyreviewoperatepass"]))
            let data = nextProps.companyReducer.getIn(["companyreviewoperatepass"]);
            console.log("复审+++++++", data)
            if (data.status == 201) {
                // message.warning(data.message)
            } else {
                // this.props.changeState(3)
            }
        }

        //获取经办人列表
        if (nextProps.companyReducer.getIn(["getmanagerlist"])) {
            console.log("经办人列表", nextProps.companyReducer.getIn(["getmanagerlist", "data"]))
            this.setState({
                getmanagerlist: nextProps.companyReducer.getIn(["getmanagerlist", "data"])
            })
        }

    }
    // nopass = ()=>{
    //     // console.log("退出")
    //     // window.history.back(-1);  
    // }

    //复审通过
    companyreviewoperatepass = () => {
        this.setState({
            twoVisible: true
        })
    }

    twoHandleOk = e => {
        console.log("粑粑了累吧", e, this.state.baseInfo.companyId)
        let data = {};
        data.companyId = this.state.baseInfo.companyId;
        data.handleId = e.typeName;
        //经办人姓名
        this.state.getmanagerlist.map((item, key) => {
            if (item.value == e.typeName) {
                data.handleName = item.label
            }
        })
        //省名称
        data.provinceName = e.totalInvoice[0];
        // data.provinceId
        //市名称
        data.cityName = e.totalInvoice[1];
        //区名称
        data.areaName = e.totalInvoice[2];

        console.log("GGGG", data)

        // data.handleName

        this.props.companyreviewoperatepass(data, (data) => {
            console.log("执行完了", data);
            this.props.changeState(4)
        });
        // setTimeout(()=>{
        //     this.props.changeState(4)
        // },1000)
        this.setState({
            twoVisible: false
        })
    }
    twoHandleCancel = () => {
        this.setState({
            twoVisible: false
        })
    }













    //复审不通过 
    companyreviewoperatenopass = () => {
        console.log("复审不通过");
        // 触发 modal
        this.setState({
            visible: true,
        });

    }

    handleOk = e => {
        console.log("确定", e);
        this.props.companyreviewoperatenopass({
            companyId: this.state.baseInfo.companyId,
            content: e.content
        })
        this.setState({
            visible: false,
        }, () => {
            // window.history.back(-1); 
            setTimeout(() => {

                this.props.changeState("2-1")
            }, 1000)
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        let { routerList, baseInfo, headerData, getcompletedata } = this.state


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
                                    <Button onClick={this.companyreviewoperatepass} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button>
                                    {/* </Link> */}

                                    {/* <Button onClick={this.editShowModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button> */}
                                </span>
                                <Button onClick={this.companyreviewoperatenopass} type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>不通过</Button>
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
                                    <span>2020-02-16  15:26:26</span>
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
                                    <span>经办人 : {headerData.handleName}</span><br />
                                    <span>{headerData.handleTime}</span><br />
                                    <a href="#">经办资料下载</a>
                                </div>
                                <div>
                                    <span>已设立</span><br />
                                    <span>经办人 : {headerData.handleName}</span><br />
                                    <span>{headerData.handleTime}</span><br />
                                </div>
                            </div>
                            <p style={{ width: "52%" }} className="progress-line"></p>
                        </div>
                    </div>
                    {/* 资料补全信息 */}
                    <div className="addInfo">
                        <p>资料补全信息</p>
                        <div className="addInfo-content">
                            <span>是否加刻公章:</span> &nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <Radio.Group onChange={this.onChange} value={this.state.value}>
                            <Radio value={1}>是</Radio>
                            <Radio value={2}>否</Radio>
                        </Radio.Group> <br/> */}
                            <span>{getcompletedata.sealFlag == 1 ? "是" : "否"}</span><br />

                            <div style={{ marginTop: "10px" }}>
                                <span>经营范围:</span> &nbsp;&nbsp;&nbsp;&nbsp;
                            {/* <Checkbox.Group options={this.state.options} defaultValue={['Apple']}  /> */}
                                {getcompletedata.businessId ? getcompletedata.businessId.replace(/,/g, " ") : ""}
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <span>法人学历:&nbsp;&nbsp;&nbsp;&nbsp; {getcompletedata.education}</span>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <span>政治面貌: &nbsp;&nbsp;&nbsp;&nbsp;{getcompletedata.affiliation}</span>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <span>发票内容: &nbsp;&nbsp;&nbsp;&nbsp;{getcompletedata.invoiceContent}</span>
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                <span>发票类型: &nbsp;&nbsp;&nbsp;&nbsp;{getcompletedata.invoiceType}</span>
                            </div>
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
                            <Table pagination={false} size="small" bordered columns={this.state.columns} dataSource={this.state.data} />
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

                <TwoModal
                    title="经办人选择"
                    visible={this.state.twoVisible}
                    onOk={this.twoHandleOk}
                    onCancel={this.twoHandleCancel}
                    getmanagerlist={this.state.getmanagerlist}
                ></TwoModal>
            </div>
        );
    }
}

export default CompanyListOneRepeat;
