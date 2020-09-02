import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon, Checkbox, Form, message } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import companyAction from "../../redux/actions/companyAction";
import Bohui from "./Bohui"
import SendMsg from "./SendMsg"
import BankOpen from "./BankOpen"
import Zmage from 'react-zmage'

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const { confirm } = Modal

// // //名称审核
// nameexamine = data => ApiRequest.put(`${urls.NAMEEXAMINE}`,data);
// // //工商阶段完成
// businessexamine = data => ApiRequest.put(`${urls.BUSINESSEXAMINE}`,data);
// // //银行开户完成
// accountexamine = data => ApiRequest.put(`${urls.ACCOUNTEXAMINE}`,data);
// // //税务认证
// taxexamine = data => ApiRequest.put(`${urls.TAXEXAMINE}`,data);
@connect(
    ({ companyReducer, productReducer }) => ({ companyReducer, productReducer }),
    {
        //设立通过-----
        companyoperateestablish: companyAction.companyoperateestablish,
        //驳回
        companyoperatereject: companyAction.companyoperatereject,
        //
        sendnotice: companyAction.sendnotice,

        nameexamine: companyAction.nameexamine,
        businessexamine: companyAction.businessexamine,
        accountexamine: companyAction.accountexamine,
        taxexamine: companyAction.taxexamine,
        //设立资料选项获取
        getdatatype: companyAction.getdatatype,
        //增加上传项
        adddatatype: companyAction.adddatatype,
        //勾选//取消
        checkdatatype: companyAction.checkdatatype,
        //获取上传资料
        datalist: companyAction.datalist,
        //一键通知
        notice: companyAction.notice,
        //获取经办人列表
        getmanagerlist: companyAction.getmanagerlist,
        //通知记录
        noticelist: companyAction.noticelist
    }
)
class CompanyListTwos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //基本信息/对接人信息
            baseInfo: "",
            headerData: "",
            twoVisible: false,
            //流程状态
            firstVisi: true,
            getcompletedata: "",
            getmanagerlist: "",
            twoVisible: false,
            noticelist: [],
            datalist: [],
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
            noticelistColumns: [
                {
                    title: '标题',
                    dataIndex: 'title',
                    key: 'title',
                    // render: text => text,
                },
                {
                    title: '内容',
                    dataIndex: 'content',
                    key: 'content',
                    width: "50%"
                },
                {
                    title: '发送时间',
                    dataIndex: 'sendTime',
                    key: 'sendTime',
                },
                {
                    title: '读取时间',
                    dataIndex: 'readTime',
                    key: 'readTime',
                },

                // {
                //     title: '发送人',
                //     dataIndex: 'crtName',
                //     key: 'crtName',
                // },
                {
                    title: '是否读取',
                    key: 'readFlag',
                    render: (text, record) => {
                        if (record.readFlag == 0) {
                            return <span>未读</span>
                        } else {
                            return <span>已读</span>
                        }
                    }
                }
            ],




            data: [

            ],
            plainOptions: [
                // "1、名称审核完成",
                // "2、工商阶段完成",
                // "3、银行开户完成"
                // 4. 税务认证
                {
                    label: '名称审核完成',
                    value: 0
                }
            ],
            plainOptions1: [
                {
                    label: '工商阶段完成',
                    value: 1,
                }
            ],
            plainOptions2: [
                {
                    label: '银行开户完成',
                    value: 2,
                }
            ],
            plainOptions3: [
                {
                    label: '税务认证',
                    value: 3,
                }
            ],
            checkedList: [],
            checkedList1: [],
            checkedList2: [],
            checkedList3: [],
            piclistOptions: [

            ],
            piclist: [],
            visible: false,
            bohuiVisible: false,
            bankOpenVisible: false,
            ischecked: [],
            allChecked: [],
        }
    }


    onChange = checkedList => {
        if (checkedList[0] == 0) {
            confirm({
                title: '是否确定名称审核已完成?',
                content: '完成点击 是 ,未完成点击否',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: () => {
                    this.setState({
                        checkedList
                    }, () => {
                        //名称审核
                        this.props.nameexamine({
                            companyId: this.state.baseInfo.companyId
                        })
                    })
                },
                onCancel: () => {
                    this.setState({
                        checkedList: []
                    })
                },
            })
        }
        if (checkedList[0] == 1) {
            confirm({
                title: '是否确定工商阶段已完成?',
                content: '完成点击 是 ,未完成点击否',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: () => {
                    this.setState({
                        checkedList1: checkedList
                    }, () => {
                        //工商阶段完成
                        this.props.businessexamine({
                            companyId: this.state.baseInfo.companyId
                        })

                    })
                },
                onCancel: () => {
                    this.setState({
                        checkedList1: []
                    })
                },
            })

        }
        if (checkedList[0] == 2) {
            this.setState({
                checkedList2: checkedList,
                bankOpenVisible: true
            })
        }
        if (checkedList[0] == 3) {
            confirm({
                title: '是否确定税务认证已完成?',
                content: '完成点击 是 ,未完成点击否',
                okText: '是',
                okType: 'danger',
                cancelText: '否',
                onOk: () => {
                    this.setState({
                        checkedList3: checkedList
                    }, () => {
                        //税务认证接口
                        this.props.taxexamine({
                            companyId: this.state.baseInfo.companyId
                        })
                    })
                },
                onCancel: () => {
                    this.setState({
                        checkedList3: []
                    })
                },
            })
        }

    };
    onChangepiclist = piclist => {
        //    修改要上传的资料项
        this.props.checkdatatype({
            id: piclist.toString(),
            companyId: this.state.baseInfo.companyId
        })

        setTimeout(() => {
            this.props.getdatatype({
                companyId: this.state.baseInfo.companyId
            })
        }, 300)
        // this.setState({
        //     ischecked:piclist
        // })
    }

    //增加上传设立资料
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    //  银行开户信息
    bankOpenHandleOk = e => {
        this.setState({
            bankOpenVisible: false
        })
        //触发接口
        this.props.accountexamine(Object.assign(e, { companyId: this.state.baseInfo.companyId }))
    }
    bankOpenHandleCancel = () => {
        this.setState({
            bankOpenVisible: false,
            checkedList2: []
        })
    }



    handleOk = e => {
        this.props.form.validateFields((err, values) => {
            if (err) return;//检查Form表单填写的数据是否满足rules的要求
            this.setState({
                visible: false,
            });
            this.props.adddatatype({
                companyId: this.state.baseInfo.companyId,
                list: [values]
            })
            setTimeout(() => {
                // this.props.changeState(3)
                this.props.getdatatype({
                    companyId: this.state.baseInfo.companyId
                })
            }, 500)

            this.props.form.resetFields()

        })
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    // 下面是驳回的弹框方法
    bohuiHandleOk = e => {
        let data = e;
        data.id = data.id.toString();
        this.setState({
            bohuiVisible: false
        }, () => {
            //触发驳回的方法
            this.props.companyoperatereject(
                Object.assign({ companyId: this.state.baseInfo.companyId }, data)
            )
        })

    };

    bohuiHandleCancel = e => {
        this.setState({
            bohuiVisible: false
        });
    };

    //下载附件
    download = (value) => {
        var link = document.createElement('a');
        link.setAttribute("download", "");
        link.href = value.url;
        link.click();
    }

    componentWillMount() {
        // 获取经办人列表
        this.props.getmanagerlist();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.baseInfo) {
            this.setState({
                baseInfo: nextProps.baseInfo
            }, () => {
                if (nextProps.baseInfo.progress == 2) {
                    // 设置名称审核选中
                    this.setState({
                        checkedList: [0]
                    })
                }
                if (nextProps.baseInfo.progress == 3) {
                    // 设置名称审核选中
                    this.setState({
                        checkedList: [0],
                        checkedList1: [1]
                    })
                }
                if (nextProps.baseInfo.progress == 4) {
                    // 设置名称审核选中
                    this.setState({
                        checkedList: [0],
                        checkedList1: [1],
                        checkedList2: [2]
                    })
                }
                if (nextProps.baseInfo.progress == 5) {
                    // 设置名称审核选中
                    this.setState({
                        checkedList: [0],
                        checkedList1: [1],
                        checkedList2: [2],
                        checkedList3: [3]
                    })
                }
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

        //通过
        // if (nextProps.companyReducer.getIn(["companyoperateestablish"])) {
        //     let data = nextProps.companyReducer.getIn(["companyoperateestablish"]);
        //     if (data.status !== 200) {
        //         // message.warning(data.message)
        //     } else {
        //         // message.success(data.message)
        //         // this.props.changeState(4)
        //     }
        // }
        //获取设立资料项
        if (nextProps.companyReducer.getIn(["getdatatype"])) {
            let list = nextProps.companyReducer.getIn(["getdatatype", "data"]);
            //    改变数据格式
            let data = [];
            let ischecked = [];
            let allChecked = [];
            list.map((item, key) => {
                data.push({
                    label: item.name,
                    value: item.id,
                    key: item.id
                })
                if (item.checked == 1) {
                    ischecked.push(item.id);
                    allChecked.push({
                        label: item.name,
                        value: item.id,
                    })
                }
            })

            this.setState({
                piclistOptions: data,
                ischecked,
                allChecked
            }, () => {
            })
        }

        //获取经办人列表
        if (nextProps.companyReducer.getIn(["getmanagerlist"])) {
            this.setState({
                getmanagerlist: nextProps.companyReducer.getIn(["getmanagerlist", "data"])
            })
        }

        //通知记录
        if (nextProps.companyReducer.getIn(["noticelist"])) {
            this.setState({
                noticelist: nextProps.companyReducer.getIn(["noticelist", "data", "rows"])
            })
        }
        //获取上传资料
        if (nextProps.companyReducer.getIn(["datalist", "data"])) {
            this.setState({
                datalist: nextProps.companyReducer.getIn(["datalist", "data"])
            })
        }

        if (nextProps.getcompletedata) {
            this.setState({
                getcompletedata: nextProps.getcompletedata
            })
        }
    }
    // 通过
    pass = () => {
        if (this.state.checkedList3.length == 0) {
            message.warning("设立流程待完成")
            return false;
        }

        confirm({
            title: '是否确定设立通过?',
            content: '完成点击 是 ,未完成点击否',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {

                this.props.companyoperateestablish({
                    companyId: this.state.baseInfo.companyId
                })
                let data = this.props.companyReducer.getIn(["companyoperateestablish"])
                if (data.status != 200) {
                    message.info(data.message)
                }
                setTimeout(() => {
                    this.props.changeState(4)
                }, 1000)
            },
            onCancel: () => {

            },
        })
    }

    // 驳回 -- 接口需要修改
    nopass = () => {
        this.setState({
            bohuiVisible: true
        })
    }

    // 发消息给客户 sendnotice
    sendnotice = () => {
        this.setState({
            sendMsgVisible: true
        })
    }
    //一键通知
    notice = () => {
        // this.props.notice({
        //     companyId: this.state.baseInfo.companyId
        // })
        confirm({
            title: '是否确定通知用户?',
            // content: '完成点击 是 ,未完成点击否',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                this.props.notice({
                    companyId: this.state.baseInfo.companyId
                })
            },
            onCancel: () => {

            },
        })
    }

    sendMsgHandleOk = e => {
        // this.props.form.validateFields((err, values) => {
        //     if (err) return;//检查Form表单填写的数据是否满足rules的要求
        this.setState({
            sendMsgVisible: false
        }, () => {
            //触发驳回的方法
            this.props.sendnotice(
                Object.assign({ companyId: this.state.baseInfo.companyId }, e)
            )
        })
        // })
    };

    sendMsgHandleCancel = e => {
        this.setState({
            sendMsgVisible: false
        });
    };


    render() {
        let { routerList, baseInfo, headerData, getcompletedata } = this.state
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
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
                                    {/* <Link to="/companyListThree"> */}
                                    <Button onClick={this.pass} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button>
                                    {/* </Link> */}
                                </span>
                                <Button onClick={this.nopass} type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>驳回</Button>
                                <span className="btn-diy">
                                    <Button onClick={this.sendnotice} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>发消息给客户</Button>
                                </span>
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
                            <div>
                                <span>经办人 : {headerData.handleName}</span>
                                <span>经办时间 : {headerData.handleTime}</span>
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
                                </div>
                                <div>
                                    <span>已设立</span><br />
                                    <span>经办人 : {headerData.handleName}</span><br />
                                    <span>{headerData.handleTime}</span><br />
                                </div>
                            </div>
                            <p style={{ width: "78%" }} className="progress-line"></p>
                        </div>
                    </div>
                    {/* 设立流程 ++  */}
                    {/* 设立流程 */}
                    <div className="process">
                        <p>设立流程 <span className="updateData">一键下载设立资料</span></p>
                        {/* 设立中新增设立流程 */}
                        <div className="addProgress">
                            <CheckboxGroup
                                options={this.state.plainOptions}
                                value={this.state.checkedList}
                                onChange={this.onChange}
                            />
                            <CheckboxGroup
                                options={this.state.plainOptions1}
                                value={this.state.checkedList1}
                                disabled={this.state.checkedList[0] == 0 ? false : true}
                                onChange={this.onChange}
                            />
                            <CheckboxGroup
                                options={this.state.plainOptions2}
                                value={this.state.checkedList2}
                                disabled={this.state.checkedList1[0] == 1 ? false : true}
                                onChange={this.onChange}
                            />
                            <CheckboxGroup
                                options={this.state.plainOptions3}
                                value={this.state.checkedList3}
                                disabled={this.state.checkedList2[0] == 2 ? false : true}
                                onChange={this.onChange}
                            />
                            <p className="borderp"></p>
                            <p style={{ marginTop: "15px" }}>请选择需要用户上传的设立资料</p>

                            <CheckboxGroup style={{ marginTop: "15px" }}
                                options={this.state.piclistOptions}
                                value={this.state.ischecked}
                                onChange={this.onChangepiclist}
                            /> &nbsp;&nbsp;
                            <span onClick={this.showModal} className="add"><Icon type="plus-circle" /> 增加上传项</span>
                            {/* 添加一键通知按钮 */}
                            <Button onClick={this.notice} className="tipButton" style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>一键通知用户</Button>
                            {/* 查看上传资料 */}
                            <div className="lookList">
                                <p>查看上传资料</p>
                                <div className="lookList-content">

                                    {
                                        this.state.datalist.length >= 1 ? this.state.datalist.map((item, key) => {
                                            return <div>
                                                <img onClick={this.download.bind(this, item)} src={item} alt="" />
                                                <p>{item.name}</p>
                                            </div>
                                        }) : "暂无资料"
                                    }

                                    {/* <img  onClick={this.download.bind(this, item)} src={require("../../assets/image/file.png")} alt="" /> */}
                                    {/* <div>
                                        <img src={require("../../assets/image/sfz.png")} alt="" />
                                        <p>资料名称</p>
                                    </div>
                                    <div>
                                        <img src={require("../../assets/image/sfz.png")} alt="" />
                                        <p>资料名称</p>
                                    </div>
                                    <div>
                                        <img src={require("../../assets/image/sfz.png")} alt="" />
                                        <p>资料名称</p>
                                    </div>
                                    <div>
                                        <img src={require("../../assets/image/sfz.png")} alt="" />
                                        <p>资料名称</p>
                                    </div> */}
                                </div>
                            </div>
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
                            {/* <span onClick={this.props.updateBase} className="updateData">修改</span>  */}
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

                            {/* <div className="zpic">
                                <img src={baseInfo.cardZ ? baseInfo.cardZ : require("../../assets/image/sfz.png")} alt="" />
                                <p>身份证正面</p>
                            </div>*/}
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
                        <Button size={"small"} onClick={this.props.updatedock} className="updateData" style={{ backgroundColor: "#17A2A9", color: "#FFF", marginTop: "7px" }}>修改</Button>
                            {/* <span className="updateData" onClick={this.props.updatedock}>修改</span>  */}
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

                    {/* 通知记录 */}
                    <div className="process">
                        <p>通知记录</p>
                        <div className="todo_table">
                            <Table size="small" bordered columns={this.state.noticelistColumns} dataSource={this.state.noticelist} />
                        </div>
                    </div>

                </div>

                {/* 增加用户上传资料modal */}
                <Modal
                    title="增加上传项"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form {...formItemLayout}>
                        <FormItem label="上传名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入上传名称' }],
                            })(
                                <Input placeholder="请输入上传名称" />
                            )}
                        </FormItem>
                        <FormItem label="上传分类">
                            {getFieldDecorator('type', {
                                rules: [{ required: true, message: '请选择上传分类' }],
                            })(
                                <Select placeholder="请选择上传分类" style={{ width: "160px" }}>
                                    <Option value="1">身份证</Option>
                                    <Option value="2">图片</Option>
                                    <Option value="3">视频</Option>
                                    <Option value="4">文件</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </Modal>
                <Bohui
                    title="驳回理由"
                    visible={this.state.bohuiVisible}
                    onOk={this.bohuiHandleOk}
                    onCancel={this.bohuiHandleCancel}
                    data={this.state.allChecked}
                >
                </Bohui>
                <SendMsg
                    title="发送消息"
                    visible={this.state.sendMsgVisible}
                    onOk={this.sendMsgHandleOk}
                    onCancel={this.sendMsgHandleCancel}
                >
                </SendMsg>

                <BankOpen
                    title="开户信息"
                    visible={this.state.bankOpenVisible}
                    onOk={this.bankOpenHandleOk}
                    onCancel={this.bankOpenHandleCancel}
                ></BankOpen>


            </div>
        );
    }
}
const CompanyListTwo = Form.create()(CompanyListTwos);

export default CompanyListTwo;
