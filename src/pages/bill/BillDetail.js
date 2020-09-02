import React, { Component } from "react";
import Zmage from 'react-zmage'
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom';
import OpenBill from "./OpenBill";
import Pass from "./Pass"
import NoPass from "./NoPass"
import Express from "./Express"
import ViewBill from "./ViewBill"
import { connect } from "react-redux";
import billAction from "../../redux/actions/billAction";


const { Option } = Select;
const { RangePicker } = DatePicker
const { confirm } = Modal


@connect(
    ({ billReducer, productReducer }) => ({ billReducer, productReducer }),
    {
        //详情
        billinfo: billAction.billinfo,
        //审核通过
        auditpass: billAction.auditpass,
        //开票
        invoicecompletion: billAction.invoicecompletion,
        //邮寄
        express: billAction.express,
        //驳回
        reject: billAction.reject,
        //查看发票
        viewinvoice: billAction.viewinvoice

    }
)
class BillDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            passVisible: false,
            expressVisible: false,
            rejectVisible: false,
            viewVisible: false,
            billId: "",
            billinfo: {
                confirmList: [],
                paymentVoucherList: [],
                contractInfo: {
                    dataList: []
                }

            },
            picData: {},
            routerList: [
                {
                    name: "首页",
                    url: "/"
                },
                {
                    name: "申请列表",
                    url: "/order"
                },
                {
                    name: "申请详情",
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

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleOk = e => {
        let data = e;
        let invoiceList = data.invoiceList.fileList;
        let list = [];
        for (let i = 0; i < invoiceList.length; i++) {
            list.push(invoiceList[i].response.data)
        }
        data.invoiceList = list;
        data.billId = this.props.match.params.id;
        data.billingTime = data.billingTime.format("YYYY-MM-DD")
        //开票
        this.props.invoicecompletion(data);
        //开票成功后重新获取状态
        //重新获取状态
        setTimeout(() => {
            this.props.billinfo({
                billId: this.state.billId
            })
        }, 800)
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };


    showPassModal = () => {
        //this.setState({
        //  passVisible: true,
        //});
        confirm({
            title: '是否确定审核通过?',
            content: '完成点击 是 ,未完成点击否',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
                //    触发通过接口
                this.props.auditpass(
                    Object.assign({}, { billId: this.props.match.params.id })
                )
                //重新获取状态
                setTimeout(() => {
                    this.props.billinfo({
                        billId: this.state.billId
                    })
                }, 800)
            },
            onCancel: () => {

            },
        })
    }
    passHandleOk = e => {
        //    触发通过接口
        this.props.auditpass(
            Object.assign(e, { billId: this.props.match.params.id })
        )
        //重新获取状态
        setTimeout(() => {
            this.props.billinfo({
                billId: this.state.billId
            })
        }, 800)



        this.setState({
            passVisible: false,
        });
    };

    passHandleCancel = e => {
        this.setState({
            passVisible: false,
        });
    };
    //驳回 reject
    reject = () => {
        this.setState({
            rejectVisible: true
        })
    }
    rejectHandleOk = e => {
        this.props.reject(Object.assign(
            { billId: this.props.match.params.id }, e
        ))
        this.setState({
            rejectVisible: false,
        });
    };

    rejectHandleCancel = e => {
        this.setState({
            rejectVisible: false,
        });
    };




    //邮寄弹出
    expressShowModal = () => {
        this.setState({
            expressVisible: true
        })
    }
    expressHandleOk = e => {
        this.props.express({
            billId: this.props.match.params.id,
            ...e
        })
        this.setState({
            expressVisible: false,
        });
        setTimeout(() => {
            this.props.billinfo({
                billId: this.state.billId
            })
        }, 800)
    };

    expressHandleCancel = e => {
        this.setState({
            expressVisible: false,
        });
    };
    //查看发票
    viewinvoice = () => {
        // 获取开票信息
        this.props.viewinvoice({
            billId: this.state.billId
        })
        this.setState({
            viewVisible: true
        })
    }
    viewHandleOk = () => {
        this.setState({
            viewVisible: false
        })
    }
    //下载附件
    download = (value) => {
        var link = document.createElement('a');
        link.setAttribute("download", "");
        link.href = value;
        link.click();
    }


    componentWillMount() {
        this.setState({
            billId: this.props.match.params.id
        }, () => {
            // 获取详情数据
            this.props.billinfo({
                billId: this.state.billId
            })
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.billReducer.getIn(["billinfo"])) {
            let data = nextProps.billReducer.getIn(["billinfo", "data"])
            let listC = data.confirmList.map(item => { return { src: item } })
            let listD = data.contractInfo.dataList.map(item => { return { src: item } })
            let listP = data.paymentVoucherList.map(item => { return { src: item } })
            data.confirmList = listC
            data.contractInfo.dataList = listD
            data.paymentVoucherList = listP
            this.setState({
                billinfo: data
            })
        }
        //开票
        if (nextProps.billReducer.getIn(["invoicecompletion"])) {
        }
        //获取开票信息
        if (nextProps.billReducer.getIn(["viewinvoice"])) {
            this.setState({
                picData: nextProps.billReducer.getIn(["viewinvoice", "data"])
            })
        }
    }


    render() {
        let { routerList } = this.state
        let { baseInfo, contractInfo, operateList, processList, customerInfo, confirmList, paymentVoucherList } = this.state.billinfo;
        //contractInfo 合同信息
        //customerInfo 客户开票信息
        //operateList 操作记录

        return (
            <div className="bill">
                <BreadeHeader routerList={routerList}></BreadeHeader>
                <div className="one-content">
                    {/* name-title */}
                    <div className="name-content">
                        <div className="title">
                            <span>{baseInfo ? baseInfo.companyName : ""}
                                <div className="billState">
                                    <div>
                                        <span>开票金额</span>
                                        <span style={{ color: "#D43030", fontSize: "28px" }}>￥{baseInfo ? baseInfo.invoiceMoney : ""}</span>
                                    </div>
                                    <div>
                                        <span>开票状态</span>

                                        {
                                            baseInfo && baseInfo.billStatus == 1 ? <span>审核中</span> : ""
                                        }
                                        {
                                            baseInfo && baseInfo.billStatus == 2 ? <span>开票中</span> : ""
                                        }
                                        {
                                            baseInfo && baseInfo.billStatus == 3 ? <span>已开票</span> : ""
                                        }
                                        {
                                            baseInfo && baseInfo.billStatus == 4 ? <span>已驳回</span> : ""
                                        }
                                        {
                                            baseInfo && baseInfo.billStatus == 5 ? <span>已邮寄</span> : ""
                                        }
                                        {
                                            baseInfo && baseInfo.billStatus == 6 ? <span>已签收</span> : ""
                                        }
                                    </div>
                                </div>
                            </span>
                            <span className="divButton">
                                {/* 通过不通过按钮组 */}
                                {
                                    baseInfo && (baseInfo.billStatus == 3 || baseInfo.billStatus == 5 || baseInfo.billStatus == 6) ? <span className="btn-diy">
                                        <Button onClick={this.viewinvoice} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>查看发票</Button>
                                    </span> : ""
                                }
                                {
                                    baseInfo && baseInfo.billStatus == 2 ? <span className="btn-diy">
                                        <Button onClick={this.showModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>开票</Button>
                                        {/* <Button onClick={this.editShowModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button> */}
                                    </span> : ""
                                }
                                {
                                    baseInfo && baseInfo.billStatus == 1 ? <span className="btn-diy">
                                        <Button onClick={this.showPassModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button>
                                        {/* <Button onClick={this.editShowModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>通过</Button> */}
                                    </span> : ""
                                }


                                {
                                    baseInfo && baseInfo.billStatus == 1 ? <Button onClick={this.reject} type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>驳回</Button> : ""
                                }

                                {
                                    baseInfo && baseInfo.billStatus == 3 ? <span className="btn-diy">
                                        <Button onClick={this.expressShowModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>邮寄</Button>
                                    </span> : ""
                                }




                            </span>
                        </div>
                        {/* <div className="title-detail">
                            <div>
                                <span>申请人 : 18861851261</span>
                                <span>申请时间 : 2020-02-30 18:48:00</span>
                            </div>
                            <div>
                                <span>审核人 : 徐梦绮</span>
                                <span>审核时间 : 2020-02-30 18:48:00</span>
                            </div>
                        </div> */}


                        <div className="pro-con bill-con" style={{ padding: "20px 0 " }}>
                            <div className="progress">
                                <div>
                                    <span>申请</span><br />
                                    <span>申请人 : {baseInfo && baseInfo.username ? baseInfo.username : ""}</span><br />
                                    <span>{baseInfo && baseInfo.submitTime ? baseInfo.submitTime : ""}</span>
                                </div>
                                <div>
                                    <span>审核</span><br />
                                    <span>审核人 : {baseInfo && baseInfo.auditName ? baseInfo.auditName : ""}</span> <br />
                                    <span>{baseInfo && baseInfo.auditTime ? baseInfo.auditTime : ""}</span>
                                </div>
                                {
                                    baseInfo && baseInfo.billStatus != 4 ? "" : <div>
                                        <span>已驳回</span><br />
                                        <span></span>
                                        <span></span>
                                    </div>
                                }

                                <div>
                                    <span>开票中</span><br />
                                    <span>经办人 : {baseInfo && baseInfo.invoiceName ? baseInfo.invoiceName : ""}</span><br />
                                    <span>{baseInfo && baseInfo.invoiceTime ? baseInfo.invoiceTime : ""}</span>
                                </div>
                                <div>
                                    <span>已开票</span><br />
                                    <span>经办人 : {baseInfo && baseInfo.postName ? baseInfo.postName : ""}</span><br />
                                    <span>{baseInfo && baseInfo.postTime ? baseInfo.postTime : ""}</span>
                                </div>
                                {
                                    baseInfo && baseInfo.billStatus != 6 ? <div>
                                        <span>已邮寄</span><br />
                                        <span></span>
                                        <span></span>
                                    </div> : <div>
                                            <span>已签收</span><br />
                                            <span></span>
                                            <span></span>
                                        </div>
                                }
                            </div>
                            {
                                baseInfo && baseInfo.billStatus == 1 ? <p style={{ width: "30%" }} className="progress-line"></p> : ""
                            }
                            {
                                baseInfo && baseInfo.billStatus == 2 ? <p style={{ width: "50%" }} className="progress-line"></p> : ""
                            }
                            {
                                baseInfo && baseInfo.billStatus == 3 ? <p style={{ width: "80%" }} className="progress-line"></p> : ""
                            }
                            {
                                baseInfo && baseInfo.billStatus == 4 ? <p style={{ width: "50%" }} className="progress-line"></p> : ""
                            }
                            {
                                baseInfo && baseInfo.billStatus == 5 ? <p style={{ width: "100%" }} className="progress-line"></p> : ""
                            }
                            {
                                baseInfo && baseInfo.billStatus == 6 ? <p style={{ width: "100%" }} className="progress-line"></p> : ""
                            }
                        </div>
                        {/* 状态 */}
                        <div></div>
                    </div>
                    {/* 设立流程 */}
                    {/* <div className="process">
                        <p>设立流程</p>
                        <div className="pro-con">
                            <div className="progress">
                                <div>
                                    <span>申请</span><br />
                                    <span>申请人 : 18861851261</span><br />
                                    <span>2020-02-16  15:26:26</span>
                                </div>
                                <div>
                                    <span>付款</span><br />
                                    <span>审核人 : 徐梦绮</span> <br />
                                    <span>已花费 24小时56分钟</span>
                                </div>
                                <div>
                                    <span>设立</span><br />
                                    <span>经办人 : 徐善培</span>
                                </div>
                                <div>
                                    <span>已设立</span><br />
                                    <span>经办人 : 徐善培</span>
                                </div>
                            </div>
                            <p style={{ width: "58%" }} className="progress-line"></p>
                        </div>
                    </div> */}
                    {/* 基本信息 */}
                    <div className="process base" id="myProgress">
                        <p>基本信息   <span className="updateData"></span> </p>
                        <div className="base-content base-contents">
                            <div>
                                <span>申请公司 : {baseInfo ? baseInfo.companyName : ""}</span>

                            </div>
                            <div>
                                <span>纳税人类型 : {baseInfo ? baseInfo.taxpayerTypeName : ""}</span>
                            </div>
                            <div>
                                <span>发票类型 : {baseInfo ? baseInfo.invoiceTypeName : ""}</span>
                            </div>
                            <div>
                                <span>开票金额 : ￥ {baseInfo ? baseInfo.invoiceMoney : ""}</span>
                            </div>
                            <div>
                                <span>公司类型 : {baseInfo ? baseInfo.companyTypeName : ""}</span>
                            </div>
                            <div>
                                <span>开票内容 : {baseInfo ? baseInfo.invoiceContent : ""}</span>
                            </div>
                            <div style={{ width: '100%' }}>
                                <span>备注 : {baseInfo ? baseInfo.remarks : ""}</span>
                            </div>
                        </div>

                    </div>
                    {/* 对接人信息 */}
                    <div className="process base person" >
                        <p>客户开票信息  </p>
                        {/* <p>客户开票信息   <span className="updateData">保存开票信息</span> </p> */}
                        <div className="newperson" >
                            <span>开票客户名称：{customerInfo ? customerInfo.customerName : ""}</span>
                            <span>开户账号：{customerInfo ? customerInfo.bankAccount : ""}</span>


                            <span>纳税人识别号：{customerInfo ? customerInfo.txpayerNumber : ""}</span>
                            {/* //baseInfo.billStatus == 5 */}
                            {/* <span> 快递单号: {customerInfo ? customerInfo.unitAddress : ""} </span> */}
                            {
                                baseInfo && baseInfo.billStatus == 5 ? (
                                    <span> 快递单号:
                                        {customerInfo ? customerInfo.expressNumber : ""}
                                    </span>
                                ) : ""
                            }
                            <span>开户银行：{customerInfo ? customerInfo.openingBank : ""}</span>
                            <span>单位电话：{customerInfo ? customerInfo.officeTel : ""}</span>
                            <span>客户地址：{customerInfo ? customerInfo.unitAddress : ""}</span>
                            {
                                baseInfo ? (
                                    <span> 收件人姓名:&nbsp;&nbsp;
                                        {customerInfo ? customerInfo.addressee : ""}
                                    </span>
                                ) : ""
                            }
                            {
                                baseInfo ? (
                                    <span> 收件人手机号码:&nbsp;&nbsp;
                                        {customerInfo ? customerInfo.addresseePhone : ""}
                                    </span>
                                ) : ""
                            }
                            <span>发票邮寄地址：{customerInfo ? customerInfo.address : ""}</span>

                        </div>
                    </div>
                    {/* 合同信息 */}
                    <div className="contract">
                        <div className="tit">合同信息</div>
                        <div className="des">合同名称：{contractInfo ? contractInfo.contractName : ""}</div>
                        <div className="billPic">
                            {
                                contractInfo.dataList.length > 0 && (
                                    <div>
                                        <Zmage
                                            src={contractInfo.dataList[0].src}
                                            set={contractInfo.dataList}
                                            alt='业务确认单'
                                        />
                                        {
                                            contractInfo.dataList[0] && (
                                                <p>点击查看多图</p>
                                            )

                                        }
                                    </div>
                                )
                            }
                        </div>
                        {/* {
                                contractInfo && contractInfo.dataList ? contractInfo.dataList.map((item, key) => {
                                    return <div key={key}>
                                        <img onClick={this.download.bind(this, item)} src={item} alt="" /><br />
                                        <span>合同附件{key + 1}</span>
                                    </div>
                                }) : ""
                            } */}


                    </div>

                    {/* 业务确认单 */}
                    <div className="contract">
                        <div className="tit">业务确认单</div>
                        <div className="des">业务确认单列表：</div>


                        {/* 业务确认单附件 */}
                        <div className="billPic">
                            {/* {
                                confirmList ? confirmList.map((item, key) => {
                                    return <div key={key}>
                                        <img onClick={this.download.bind(this, item)} src={item} alt="" /><br />
                                        <span>业务确认单{key + 1}</span>
                                    </div>
                                }) : ""
                            } */}
                            {
                                confirmList.length > 0 && (
                                    <div>
                                        <Zmage
                                        src={confirmList[0].src}
                                        set={confirmList}
                                        alt='业务确认单'
                                    />
                                    {
                                        confirmList[0]&&(
                                        <p>点击查看多图</p>
                                        )

                                    }
                                    </div>
                                    
                                )
                            }
                            

                        </div>
                    </div>

                    {/* 收款凭证 */}
                    <div className="contract">
                        <div className="tit">收款凭证</div>
                        <div className="des">收款凭证列表：</div>


                        {/* 收款凭证附件 */}
                        <div className="billPic">
                            {/* {
                                paymentVoucherList ? paymentVoucherList.map((item, key) => {
                                    return <div key={key}>
                                        <img onClick={this.download.bind(this, item)} src={item} alt="" /><br />
                                        <span>收款凭证{key + 1}</span>
                                    </div>
                                }) : ""
                            } */}
                            {
                                paymentVoucherList.length>0 && (
                                    <div>
                                        <Zmage
                                    src={paymentVoucherList[0].src}
                                    set={paymentVoucherList}
                                    alt='收款凭证'
                                />
                                {
                                    paymentVoucherList[0]&&(
                                    <p>点击查看多图</p>
                                    )

                                }
                                    </div>
                                )
                            }
                            


                        </div>
                    </div>





                    {/* 操作记录 */}
                    <div className="process">
                        <p>操作记录</p>
                        <div className="todo_table">
                            <Table size="small" pagination={false} bordered columns={this.state.columns} dataSource={operateList ? operateList : []} />
                        </div>
                    </div>

                </div>

                <OpenBill
                    title="提交开票信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    data={customerInfo}
                >
                </OpenBill>

                <Pass
                    title="审核通过"
                    visible={this.state.passVisible}
                    onOk={this.passHandleOk}
                    onCancel={this.passHandleCancel}
                // data={this.state.customerInfo}
                >
                </Pass>
                {/* /NoPass */}
                <NoPass
                    title="驳回"
                    visible={this.state.rejectVisible}
                    onOk={this.rejectHandleOk}
                    onCancel={this.rejectHandleCancel}
                // data={this.state.customerInfo}
                >
                </NoPass>

                <Express title="邮寄信息"
                    visible={this.state.expressVisible}
                    onOk={this.expressHandleOk}
                    onCancel={this.expressHandleCancel}
                    data={customerInfo}
                ></Express>

                <ViewBill
                    title="查看开票信息"
                    visible={this.state.viewVisible}
                    onOk={this.viewHandleOk}
                    onCancel={this.viewHandleOk}
                    data={customerInfo}
                    picData={this.state.picData}
                ></ViewBill>

            </div>
        );
    }
}

export default BillDetail;
