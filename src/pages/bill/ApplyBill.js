import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import billAction from "../../redux/actions/billAction";
import productAction from "../../redux/actions/productAction";

const { Option } = Select;
const { RangePicker } = DatePicker   //applyinvoicepage


@connect(
    ({ billReducer, productReducer }) => ({ billReducer, productReducer }),
    {
        //获取公司类型
        productclassify: productAction.productclassify,
        invoicepage: billAction.invoicepage,
        applyinvoicepage: billAction.applyinvoicepage,
        //发票数量统计
    countstatus: billAction.countstatus
    }
)
class ApplyBill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //公司类型列表
            companyTypeList: "",
            total: "",
            num:"",
            // 筛选属性
            select: {
                page: 1,
                limit: 20,
                invoiceType: "",
                billStatus: "",
                companyType: "",
                startDate: "",
                endDate: ""
            },
            current:1,
            searchValue: "",
            routerList: [
                {
                    name: "首页",
                    url: "/"
                },
                {
                    name: "发票管理",
                    url: "/order"
                }
            ],
            columns: [
                {
                    title: '',
                    dataIndex: 'key',
                    key: 'key',
                },
                {
                    title: '申请公司',
                    dataIndex: 'companyName',
                    key: 'companyName',
                },
                {
                    title: '申请时间',
                    dataIndex: 'submitTime',
                    key: 'submitTime',
                },
                {
                    title: '公司类型',
                    key: 'companyTypeName',
                    dataIndex: 'companyTypeName',
                },
                {
                    title: '发票类型',
                    key: 'invoiceTypeName',
                    dataIndex: 'invoiceTypeName',
                    // render: (text, record) => (
                    //   <span>
                    //     <span>{record.state == 1 ? "上架" : "下架"}</span> &nbsp;
                    //     <Switch  defaultChecked  />
                    //   </span>
                    // ),
                },
                {
                    title: '发票金额',
                    key: 'invoiceMoney',
                    dataIndex: 'invoiceMoney',
                    // render: (text, record) => (
                    //   <span>
                    //     <span>{record.state == 1 ? "上架" : "下架"}</span> &nbsp;
                    //     <Switch  defaultChecked  />
                    //   </span>
                    // ),
                },
                {
                    title: '客户名称',
                    key: 'customerName',
                    dataIndex: 'customerName',
                    // render: (text, record) => (
                    //   <span>
                    //     <span>{record.state == 1 ? "上架" : "下架"}</span> &nbsp;
                    //     <Switch  defaultChecked  />
                    //   </span>
                    // ),
                },
                {
                    title: '纳税人识别号',
                    key: 'txpayerNumber',
                    dataIndex: "txpayerNumber"
                },
                {
                    title: '开户银行',
                    key: 'openingBank',
                    dataIndex: "openingBank"
                },
                {
                    title: '开票地址',
                    key: 'address',
                    dataIndex: "address"
                },
                {
                    title: '开票电话',
                    key: 'officeTel',
                    dataIndex: "officeTel"
                },
                {
                    title: '开票状态',
                    key: 'billStatusName',
                    dataIndex: "billStatusName"
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        if (true) {
                            return <Link to={`/billDetail/${record.billId}`}>
                                查看详情
                        </Link>
                        }
                    }
                },
            ],
            data: [],
            visible: false,
            editVisible: false
        };
    }

    // 添加 modal 用的方法
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    // 编辑 modal 用的方法
    editShowModal = () => {
        this.setState({
            editVisible: true,
        });
    };

    editHandleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    editHandleCancel = e => {
        console.log(e);
        this.setState({
            editVisible: false,
        });
    };


    // 删除确认框
    showDeleteConfirm = () => {
        Modal.confirm({
            title: '是否确认删除此分类?',
            content: '删除后不可恢复',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }


    setOrderState = (value) => {
        this.setState({
            select: Object.assign(this.state.select, { billStatus: value })
        })
    }

    // 订单类型
    setOrderType = (value) => {
        this.setState({
            select: Object.assign(this.state.select, { companyType: value })
        })
    }
    // 支付方式 
    setType = (value) => {
        this.setState({
            select: Object.assign(this.state.select, { invoiceType: value })
            // select: Object.assign(this.state.select, {  })
        })
    }
    //创建时间
    setCreateTime = (value) => {
        if (value == "") {
            this.setState({
                select: Object.assign(this.state.select, { startDate: value, endDate: value }),
                searchValue: value
            })
        }

    }
    onChange = (date, dateString) => {
        this.setState({
            select: Object.assign(this.state.select, { startDate: dateString[0], endDate: dateString[1] }),
            searchValue: date
        })
    }
    //搜索按钮
    search = () => {
        console.log(1111,this.state)
        this.setState({
            current:1
        },()=>{
            this.props.applyinvoicepage(Object.assign(this.state.select,{page:1}))
        })
        
    }


    componentWillMount() {
        this.props.productclassify({
            page: 1,
            limit: 100
        })
        //获取发票申请列表
        this.props.applyinvoicepage(this.state.select);
        // 获取发票统计数量
     this.props.countstatus();
    }

    paginationChange = (current) => {
        console.log(current)
        this.setState({
            select: Object.assign(this.state.select, { page: current }),
            current
        }, () => {
            // 获取分页数据
            this.props.applyinvoicepage(this.state.select)
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.productReducer.getIn(["productclassify", "data", "rows"])) {
            console.log("公司类型", nextProps.productReducer.getIn(["productclassify", "data", "rows"]))
            this.setState({
                companyTypeList: nextProps.productReducer.getIn(["productclassify", "data", "rows"])
            })
        }
        //发票列表
        if (nextProps.billReducer.getIn(["applyinvoicepage"])) {
            console.log("发票申请++++列表", nextProps.billReducer.getIn(["applyinvoicepage"]))
            let data = nextProps.billReducer.getIn(["applyinvoicepage", "data", "rows"]);
            let total = nextProps.billReducer.getIn(["applyinvoicepage", "data", "total"]);
            for (let i = 0; i < data.length; i++) {
                data[i].key = i + 1;
            }
            this.setState({
                data,
                total
            })
        }

        //发票统计数量
   if(nextProps.billReducer.getIn(["countstatus"])){
    console.log("发票统计数量", nextProps.billReducer.getIn(["countstatus"]))
    this.setState({
        num: nextProps.billReducer.getIn(["countstatus","data"])
    })
 }
    }




    render() {
        let { routerList, searchValue, companyTypeList } = this.state;
        let { billStatus, invoiceType, companyType, startDate, endDate } = this.state.select

        return (
            <div className="product-container">
                {/* 产品列表 */}
                {/* 头部 */}
                <BreadeHeader routerList={routerList} />
                {/* 内容部分 */}
                <div className="search-content">
                    {/* 筛选 */}
                    <div className="line">
                        <div>发票状态 ：</div>
                        <div>
                            <span onClick={this.setOrderState.bind(this, "")} className={billStatus == 0 ? "active-bg" : ""}>全部</span>
        <span onClick={this.setOrderState.bind(this, 1)} className={billStatus == 1 ? "active-bg" : ""}>审核中({this.state.num.inAudit})</span>
                            <span onClick={this.setOrderState.bind(this, 2)} className={billStatus == 2 ? "active-bg" : ""}>开票中({this.state.num.inInvoice})</span>
                            <span onClick={this.setOrderState.bind(this, 3)} className={billStatus == 3 ? "active-bg" : ""}>已开票({this.state.num.invoiceFinish})</span>
                            <span onClick={this.setOrderState.bind(this, 4)} className={billStatus == 4 ? "active-bg" : ""}>已驳回({this.state.num.reject})</span>
                            <span onClick={this.setOrderState.bind(this, 5)} className={billStatus == 5 ? "active-bg" : ""}>已邮寄({this.state.num.post})</span>
                            <span onClick={this.setOrderState.bind(this, 6)} className={billStatus == 6 ? "active-bg" : ""}>已签收({this.state.num.sign})</span>
                        </div>
                    </div>
                    <div className="line">
                        <div>发票类型 ：</div>
                        <div>
                            <span onClick={this.setType.bind(this, "")} className={invoiceType == "" ? "active-bg" : ""}>全部</span>
                            <span onClick={this.setType.bind(this, 1)} className={invoiceType == 1 ? "active-bg" : ""}>增值税普通发票</span>
                            <span onClick={this.setType.bind(this, 2)} className={invoiceType == 2 ? "active-bg" : ""}>增值税专用发票</span>
                        </div>
                    </div>
                    <div className="line">
                        <div>公司类型 ：</div>
                        <div>
                            <span onClick={this.setOrderType.bind(this, "")} className={companyType == "" ? "active-bg" : ""}>全部</span>
                            {
                                companyTypeList ? companyTypeList.map((item, key) => {
                                    return <span key={key} onClick={this.setOrderType.bind(this, item.id)} className={companyType == item.id ? "active-bg" : ""}>{item.name}</span>
                                }) : ""
                            }
                        </div>
                    </div>
                    <div className="line">
                        <div>申请时间 ：</div>
                        <div>
                            <span onClick={this.setCreateTime.bind(this, "")} className={startDate == "" ? "active-bg" : ""}>全部</span>
                            <RangePicker
                                onChange={this.onChange}
                                value={searchValue}
                                size="small"
                                style={{ width: "259px", }}
                            />
                        </div>
                    </div>
                    {/* <div className="line">
                        <div>搜索 ：</div>
                        <div>
                            <Input style={{ width: "260px", marginLeft: "28px" }} size="small" placeholder="请输入公司名称"></Input>
                        </div>
                    </div> */}

                    <div className="line">
                        <div></div>
                        <div style={{ marginLeft: "62px" }}>
                            <Button onClick={this.search} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
                            <Button style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>导出</Button>
                        </div>
                    </div>

                </div>
                {/* table 部分 */}
                <div className="table-content">
                    {/* 123 */}
                    <Table
                        rowSelection={{
                            onChange: (selectedRowKeys, selectedRows) => {
                                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                            },
                        }}
                        pagination={{
                            total: this.state.total,
                            showTotal: (total) => `共 ${total} 条`,
                            onChange: (current) => this.paginationChange(current),
                            pageSize: this.state.select.limit,
                            current: this.state.current
                        }}
                        bordered columns={this.state.columns} dataSource={this.state.data} />
                </div>



            </div>
        );
    }
}

export default ApplyBill;
