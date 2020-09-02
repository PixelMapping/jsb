// 订单详情
import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import { connect } from "react-redux";
import orderAction from "../../redux/actions/orderAction";
import Zmage from 'react-zmage'
import Bohui from"./Bohui"
 

const { Option } = Select;
const { TextArea } = Input;
// key: '1',
//       name: '套餐一',
//       type: 32,
//       number: 'New York No. 1 Lake Park',
//       state: ['nice', 'developer'],
//       time:"2019.01.20",
//       action:"操作";
// orderdetail

@connect(
  ({ orderReducer }) => ({ orderReducer }),
  {
    orderdetail: orderAction.orderdetail,
    orderrecord: orderAction.orderrecord,
    comfirmofflinepay: orderAction.comfirmofflinepay,
    reject:orderAction.rejects
  }
)
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetail: "",
      name: "",
      remark: "",
      bohuiVisible:false,
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "订单管理",
          url: "/product"
        },
        {
          name: "订单详情",
          url: "/product"
        }

      ],

      //基本信息 columns
      columns1: [
        {
          title: '订单号',
          dataIndex: 'orderNo',
          key: 'orderNo',
          render: text => text,
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
        },
        {
          title: '买家',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: '订单金额',
          key: 'totalPrice',
          render: (text, record) => (
            <div>
              <p>订单总额 : ￥{record.totalPrice.price}</p>
              <p>后台改价 : ￥{record.totalPrice.uptPrice}</p>
              <p>实付款金额 : ￥{record.totalPrice.amount}</p>
            </div>
          ),
        },
        {
          title: '支付方式',
          key: 'payTypeName',
          dataIndex: "payTypeName"
        },
        {
          title: '交易状态',
          key: 'statusName',
          dataIndex: "statusName"
        },
      ],
      columns2: [
        {
          title: '产品信息',
          dataIndex: 'packageName',
          key: 'packageName',
        },
        {
          title: '产品分类',
          dataIndex: 'companyTypeName',
          key: 'companyTypeName',
        },
        {
          title: '服务时长',
          dataIndex: 'serviceTime',
          key: 'serviceTime',
        },
        {
          title: '赠送时长',
          key: 'giveTime',
          dataIndex: "giveTime"
        },
        {
          title: '开票额度',
          key: 'quota',
          dataIndex: "quota"
        },
        {
          title: '产品价格',
          key: 'price',
          dataIndex: "price"

        },
      ],
      columns3: [
        {
          title: '实付金额',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: '支付方式',
          dataIndex: 'payTypeName',
          key: 'payTypeName',
        },
        {
          title: '支付流水号',
          dataIndex: 'outOrderNo',
          key: 'outOrderNo',
        },
        {
          title: '付款状态',
          key: 'payStatusName',
          dataIndex: "payStatusName"
        },
        {
          title: '付款时间',
          key: 'payTime',
          dataIndex: "payTime"
        }
      ],
      columns4: [
        {
          title: '实付金额',
          dataIndex: 'amount',
          key: 'amount',
          render: text => text,
        },
        {
          title: '付款名称',
          dataIndex: 'payName',
          key: 'payName',
        },
        {
          title: '付款状态',
          dataIndex: 'payStatusName',
          key: 'payStatusName',
        },
        {
          title: '付款时间',
          key: 'payTime',
          dataIndex: "payTime"
        },
        {
          title: '付款凭证',
          key: 'voucher',
          render: (text, record) => (
            // <a href={record.voucher}>查看凭证</a>
            <a onClick={() => Zmage.browsing({ src: record.voucher })}>查看凭证</a>
          )
        }
      ],

      data1: [],
      data2: [],
      data3: [],
      data4: [],
      // 订单记录
      dataList: [],
      columnsList: [
        {
          title: '操作时间',
          dataIndex: 'time',
          key: 'time',
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
      ]
    };
  }

  componentDidMount() {
    //   接受路由传的参数
    this.props.orderdetail({
      orderId: this.props.match.params.id
    });

    this.props.orderrecord({
      page: 1,
      limit: 100,
      orderId: this.props.match.params.id
    })

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.orderReducer.getIn(["orderdetail"])) {
      let data = nextProps.orderReducer.getIn(["orderdetail", "data"])
      this.setState({
        orderDetail: nextProps.orderReducer.getIn(["orderdetail", "data"]),
        name: nextProps.orderReducer.getIn(["orderdetail", "data", "statusName"]),
        //支付线上/线下
        payTypeName: nextProps.orderReducer.getIn(["orderdetail", "data", "payTypeName"]),
        //订单备注
        remark: nextProps.orderReducer.getIn(["orderdetail", "data", "remark"]),
        data1: [
          {
            key: 1,
            orderNo: data.orderNo,
            createTime: data.createTime,
            phone: data.phone,
            totalPrice: {
              price: data.price,
              uptPrice: data.uptPrice ? data.uptPrice : "    0",
              amount: data.amount ? data.amount : " 0"
            },
            payTypeName: data.payTypeName,
            statusName: data.statusName
          }
        ],

        data2: [
          {
            key: 1,
            packageName: data.packageName,
            companyTypeName: data.companyTypeName,
            serviceTime: data.serviceTime,
            giveTime: data.giveTime,
            quota: data.quota,
            price: data.price
          }
        ],
        data3: [
          {
            key: 1,
            amount: data.amount,
            payTypeName: data.payTypeName,
            outOrderNo: data.outOrderNo,
            payStatusName: data.payStatusName,
            payTime: data.payTime
          }
        ],
        data4: [
          {
            key: 1,
            amount: data.amount ? data.amount : "",
            payName: data.payName,
            payStatusName: data.payStatusName,
            payTime: data.payTime ? data.payTime : "",
            voucher: data.voucher
          }
        ]
      }, () => {
      })
    }

    //订单记录
    if (nextProps.orderReducer.getIn(["orderrecord"])) {
      this.setState({
        dataList: nextProps.orderReducer.getIn(["orderrecord", "data", "rows"])
      })
    }
  }

  //确认收款
  okPay = () => {
    // 
    this.setState({
      visible: true,
    });

  }

  // 添加 modal 用的方法
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    }, () => {
      // 确认收款操作
      this.props.comfirmofflinepay({
        orderId: this.props.match.params.id
      });
      this.setState({
        name: "已支付"
      }, () => {
        setTimeout(() => {
          this.props.orderdetail({
            orderId: this.props.match.params.id
          });
        }, 300)
      })
    });
  };

  handleCancel = e => {
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
    this.setState({
      visible: false,
    });
  };

  editHandleCancel = e => {
    this.setState({
      editVisible: false,
    });
  };


  // 删除确认框
  showDeleteConfirm = () => {
    Modal.confirm({
      title: '是否确认删除此产品?',
      content: '删除后不可恢复',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
      },
      onCancel() {
      },
    });
  }

  //驳回modal
  bohuiVisible  =()=>{
    this.setState({
      bohuiVisible:true
    })
  }
  //驳回方法 -- 取消
  bohuiHandleCancel = ()=>{
    this.setState({
      bohuiVisible:false
    })
  }
//驳回方法-- 提交
  bohuiHandleOk = (e)=>{
    this.props.reject(Object.assign(e, {
      orderId: this.props.match.params.id
    }))
    this.setState({
      bohuiVisible:false
    },()=>{
      setTimeout(() => {
        this.props.orderdetail({
          orderId: this.props.match.params.id
        });
      }, 800)
    })
  }

  render() {
    let { routerList, orderDetail } = this.state;

    return (
      <div className="orderDetail">
        {/* 产品列表 */}
        {/* 头部 */}
        <BreadeHeader routerList={routerList} />
        {/* 内容部分 */}
        {/* table 部分 */}

        <div className="orderDetail-container">
          {/* <Button onClick={this.showModal} style={{backgroundColor:"#17A2A9",color:"#FFF",marginLeft:"10px",marginTop:"15px",marginBottom:"15px"}}>新增分类</Button> */}
          {/* 123 */}
          {/* <Table  bordered columns={this.state.columns} dataSource={this.state.data} /> */}

          {/* 状态条 */}
          <div className="progress">
            <div>
              <span>下单时间</span><br />
              <span>{orderDetail.createTime}</span>
            </div>
            <div>
              <span>付款</span><br />
              <span>{orderDetail.payTime}</span>
            </div>
            {
              this.state.name != "已驳回" ? <div>
              <span>订单完成</span><br />
              <span>{orderDetail.endTime}</span>
            </div> : <div>
              <span>已驳回</span><br />
              <span>   </span>
            </div>
            }
          </div>
          <p style={{ width: this.state.name == "未支付" ? "15%" : this.state.name == "已支付" || this.state.name == "已驳回" ? "100%" : this.state.name == "已取消" ? "5%" : "58%" }} className="progress-line"></p>

          {/* 基本信息 */}
          <div className="order-list-content">
            <p className="order-title">
              基本信息
                    </p>
            {/* 表格 */}
            <Table pagination={false} size="small" bordered columns={this.state.columns1} dataSource={this.state.data1} />
          </div>

          {/* 产品信息 */}
          <div className="order-list-content">
            <p className="order-title">
              产品信息
                    </p>
            {/* 表格 */}
            <Table pagination={false} size="small" bordered columns={this.state.columns2} dataSource={this.state.data2} />
          </div>

          {/* 已完成  付款信息 */}
          {
            this.state.name != "未支付" && this.state.name != "已取消" && this.state.payTypeName != "线下支付" ? <div className="order-list-content">
              <p className="order-title">
                付款信息
                    </p>
              {/* 表格 */}
              <Table pagination={false} size="small" bordered columns={this.state.columns3} dataSource={this.state.data3} />
            </div> : ""
          }



          {/* 已完成  付款信息  线下支付 */}
          {
            this.state.name != "未支付" && this.state.name != "已取消" && this.state.payTypeName == "线下支付" ? <div className="order-list-content">
              <p className="order-title">
                付款信息(线下支付)
                    </p>
              {/* 表格 */}
              <Table pagination={false} size="small" bordered columns={this.state.columns4} dataSource={this.state.data4} />
            </div> : ""
          }


          {/* 订单备注 */}
          {
            this.state.name != "已取消" ? <div className="order-list-content">
              <p className="order-title">
                订单备注
                    </p>
              <TextArea disabled value={this.state.remark ? this.state.remark : "暂无备注信息"}></TextArea>
            </div> : ""
          }

          {/* 订单记录 */}
          {
            this.state.name != "已取消" ? <div className="order-list-content">
              <p className="order-title">
                订单记录
                    </p>
              {/* 表格 */}
              <Table pagination={false} size="small" bordered columns={this.state.columnsList} dataSource={this.state.dataList} />
            </div> : ""
          }
          {
            <p style={{ textAlign: "center" }}>
              {
                 this.state.name != "已驳回" ? 
                <Button onClick={this.bohuiVisible} style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginLeft: "10px", marginTop: "15px", marginBottom: "15px" }}>驳回</Button>
                : ""

              }
              {
                this.state.name == "审核中" && this.state.name != "已取消" && this.state.payTypeName == "线下支付" ?
                  <Button onClick={this.okPay} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px", marginTop: "15px", marginBottom: "15px" }}>款项已到确认收款</Button>
                  : ""

              }

            </p>

          }

        </div>
        <Modal
          wrapClassName="payModal"
          title="确认收款信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            this.state.data4[0] ? <>
              <p><span>支付金额:</span> <span className="daole">￥{this.state.data4[0].amount}</span> </p>
              <p><span>付款时间:</span> <span>{this.state.data4[0].payTime}</span></p>
              <p><span>付款方名称:</span> <span>{this.state.data4[0].payName}</span></p>
              <p><span className="pic">支付凭证: </span>
                {
                  this.state.data4[0].voucher ? <Zmage src={this.state.data4[0].voucher} /> : <img src={require("../../assets/image/sfz.png")} alt="" />
                }

              </p>
            </> : ""
          }

        </Modal>

        {/* key:1,
            amount:data.amount? data.amount : "/",
            payName:data.payName,
            payStatusName:data.payStatusName,
            payTime:data.payTime ? data.payName : "/",
            voucher:data.voucher */}

        <Bohui
          title="驳回理由"
          visible={this.state.bohuiVisible}
          onOk={this.bohuiHandleOk}
          onCancel={this.bohuiHandleCancel}
          //data={this.state.allChecked}
        >
        </Bohui>
      </div>
    );
  }
}

export default OrderDetail;
