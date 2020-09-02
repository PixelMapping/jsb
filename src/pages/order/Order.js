import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import productAction from "../../redux/actions/productAction";
import orderAction from "../../redux/actions/orderAction";
import AddremarkModal from "./Addremark";
import UpdateOrderModal from "./UpdateOrder"

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


@connect(
  ({ orderReducer, productReducer }) => ({ orderReducer, productReducer }),
  {
    productclassify: productAction.productclassify,
    orderlist: orderAction.orderlist,
    orderdetail: orderAction.orderdetail,
    addremark: orderAction.addremark,
    uptorder:orderAction.uptorder,
    getordercount: orderAction.getordercount
  }
)
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number:"",
      total: "",
      id:"",
      visible:false,
      remark:"",
      current:1,
      //订单修改
      updateVisible:false,
      //需要修改的订单详情
      updateOrder:"",
      //需要修改的id
      updateOrderId:"",
      // 筛选属性
      select: {
        page: 1,
        limit: 20,
        status: "",
        companyTypeId: "",
        payType: "",
        startDate: "",
        endDate: "",
        search: ""
      },
      //订单类型
      orderList: [],
      DateValue: "",
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "订单管理",
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
          key: 'packageName',
          dataIndex: 'packageName',
        },
        {
          title: '实际支付',
          key: 'amount',
          dataIndex: 'amount',
        },
        {
          title: '支付方式',
          key: 'payTypeName',
          dataIndex: 'payTypeName',
        },
        {
          title: '订单状态',
          key: 'statusName',
          dataIndex: 'statusName',
        },
        {
          title: '下单时间',
          key: 'createTime',
          dataIndex: "createTime"
        },
        {
          title: '备注',
          key: 'remark',
          dataIndex: "remark"
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            if(record.status != 3){
                return <Dropdown overlay={
                  <Menu>
                    {
                      record.status != 3 ? <Menu.Item key="0">
                        <Link to={`/orderDetail/${record.orderId}`}>
                          订单详情
                      </Link>
                      </Menu.Item> : ""
                    }
                  
                    {
                      record.status == 1 ? <Menu.Item key="1" onClick={this.updateShowModal.bind(this,record.orderId)}>
                      订单修改
                    </Menu.Item> : ""
                    }
                    <Menu.Item onClick={this.showModal.bind(this,record.orderId)} key="3">订单备注</Menu.Item>
                    {/* <Menu.Item key="4">订单记录</Menu.Item> */}
                  </Menu>
                } trigger={['click']}>
                  <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    操作 <Icon type="down" />
                  </span>
                </Dropdown>
            }else{
              return <Dropdown overlay={
                <Menu>
                  {
                     <Menu.Item key="0">
                      <Link to={`/orderDetail/${record.orderId}`}>
                        订单详情
                    </Link>
                    </Menu.Item> 
                  }
                </Menu>
              } trigger={['click']}>
                <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  操作 <Icon type="down" />
                </span>
              </Dropdown>
            }
          }
        },
      ],
      data: [

      ],
      visible: false,
      editVisible: false
    };
  }

  // 添加 modal 用的方法
  showModal = (id) => {
    this.props.orderdetail({
      orderId: id
    });
      this.setState({
        visible: true,
        id:id
      });
  };
  
  remarkChange = (e)=>{
    this.setState({
      remark:e.target.value
    })
  }

  handleOk = e => {
    this.props.addremark({
      orderId:this.state.id,
      remark:e.remark
    });
    this.setState({
      visible: false,
    });
    // setTimeout(()=>{
    //   this.setState({
    //     remark:""
    //   })
    // },300)
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  // 编辑 modal 用的方法
  // onOk={this.upDateHandleOk}
  // onCancel={this.updateHandleCancel}
  updateShowModal = (id) => {
    this.props.orderdetail({
      orderId: id
    });
    this.setState({
      updateVisible: true,
      updateOrderId:id
    });
  };

  upDateHandleOk = e => {
    let data = e;
    data.orderId = this.state.updateOrderId;
    // data.giveMonth = e.giveTime;
    //触发修改的接口
  this.props.uptorder(data);
   setTimeout(()=>{
    this.props.orderlist(this.state.select)
   },300)
    this.setState({
      updateVisible: false,
    });
  };

  updateHandleCancel = e => {
    this.setState({
      updateVisible: false,
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
      },
      onCancel() {
      },
    });
  }

  // 订单状态
  setOrderState = (value) => {
    this.setState({
      select: {
        page: this.state.select.page,
        limit: this.state.select.limit,
        status: value,
        companyTypeId: this.state.select.companyTypeId,
        payType: this.state.select.payType,
        startDate: this.state.select.startDate,
        endDate: this.state.select.endDate,
        search: this.state.select.endDate
      },
    }, () => {
    })
  }

  // 订单类型
  setOrderType = (value) => {
    this.setState({
      select: {
        page: this.state.select.page,
        limit: this.state.select.limit,
        status: this.state.select.status,
        companyTypeId: value,
        payType: this.state.select.payType,
        startDate: this.state.select.startDate,
        endDate: this.state.select.endDate,
        search: this.state.select.endDate
      },
    }, () => {
    })
  }
  // 支付方式 
  setPayType = (value) => {
    this.setState({
      select: {
        page: this.state.select.page,
        limit: this.state.select.limit,
        status: this.state.select.status,
        companyTypeId: this.state.select.companyTypeId,
        payType: value,
        startDate: this.state.select.startDate,
        endDate: this.state.select.endDate,
        search: this.state.select.endDate
      },
    }, () => {
    })
  }
  //创建时间
  setCreateTime = (value) => {
    if (value == "") {
      this.setState({
        select: {
          page: this.state.select.page,
          limit: this.state.select.limit,
          status: this.state.select.status,
          companyTypeId: this.state.select.companyTypeId,
          payType: value,
          startDate: "",
          endDate: "",
          search: this.state.select.search
        },
        DateValue: ""
      }, () => {
      })
    }

  }
  onChange = (date, dateString) => {
    this.setState({
      select: {
        page: this.state.select.page,
        limit: this.state.select.limit,
        status: this.state.select.status,
        companyTypeId: this.state.select.companyTypeId,
        payType: this.state.select.payType,
        startDate: dateString[0],
        endDate: dateString[1],
        search: this.state.select.search
      },
      DateValue: date
    }, () => {
    })
  }
  inputChange = (e) => {
    this.setState({
      select: {
        page: this.state.select.page,
        limit: this.state.select.limit,
        status: this.state.select.status,
        companyTypeId: this.state.select.companyTypeId,
        payType: this.state.select.payType,
        startDate: this.state.select.startDate,
        endDate: this.state.select.endDate,
        search: e.target.value
      },
    })

  }

  paginationChange = (current) => {
    this.setState({
      current
    })
    this.setState({
      select: {
        page: current,
        limit: this.state.select.limit,
        status: this.state.select.status,
        companyTypeId: this.state.select.companyTypeId,
        payType: this.state.select.payType,
        startDate: this.state.select.startDate,
        endDate: this.state.select.endDate,
        search: this.state.select.search
      },
    }, () => {
      // 获取分页数据
      this.props.orderlist(this.state.select)
    })
  }
  //搜索
  searchList = () => {
    this.setState({
      current:1
    },()=>{
      this.props.orderlist(Object.assign(this.state.select,{page:1}))
    })
    
  }

  // /////////////////////////////////////////////////
  componentWillMount() {
    this.props.productclassify({
      page: 1,
      limit: 100
    })
    //获取订单列表
    this.props.orderlist(this.state.select);

    //数据
    this.props.getordercount();
  }

  componentWillReceiveProps(nextProps) {
    //获取产品分类列表=>公司分类列表
    if (nextProps.productReducer.getIn(["productclassify", "data", "rows"])) {
      this.setState({
        orderList: nextProps.productReducer.getIn(["productclassify", "data", "rows"])
      })
    }
    //获取订单列表
    if (nextProps.orderReducer.getIn(["orderlist", "data"])) {
      let data = nextProps.orderReducer.getIn(["orderlist", "data"]);
      let orderList = data.rows;
      for (let i = 0; i < orderList.length; i++) {
        orderList[i].key = i + 1;
      }
      this.setState({
        total: data.total,
        data: orderList
      })
    }
    //
    if(nextProps.orderReducer.getIn(["orderdetail","data"])){
       this.setState({
        remark:nextProps.orderReducer.getIn(["orderdetail","data","remark"]),
        // 订单详情=> 获取订单价格 / 赠送时长
        updateOrder:nextProps.orderReducer.getIn(["orderdetail","data"]),
       })
    }

    //数据
    if(nextProps.orderReducer.getIn(["getordercount"])){
      this.setState({
        number: nextProps.orderReducer.getIn(["getordercount","data"])
      })
    }
  }





  render() {
    let { routerList, DateValue, orderList,number } = this.state;
    let { status, orderType, payType, createTime, companyTypeId, startDate, endDate } = this.state.select

    return (
      <div className="product-container">
        {/* 产品列表 */}
        {/* 头部 */}
        <BreadeHeader routerList={routerList} />
        {/* 内容部分 */}
        <div className="search-content">
          {/* 筛选 */}
          <div className="line">
            <div>订单状态 ：</div>
            <div>
              <span onClick={this.setOrderState.bind(this, "")} className={status == "" ? "active-bg" : ""}>全部</span>
              <span onClick={this.setOrderState.bind(this, 1)} className={status == 1 ? "active-bg" : ""}>未支付({number.inpaidCount})</span>
              <span onClick={this.setOrderState.bind(this, 2)} className={status == 2 ? "active-bg" : ""}>已支付({number.paidCount})</span>
              <span onClick={this.setOrderState.bind(this, 3)} className={status == 3 ? "active-bg" : ""}>已取消({number.cancelCount})</span>
              <span onClick={this.setOrderState.bind(this, 4)} className={status == 4 ? "active-bg" : ""}>审核中({number.examineCount})</span>
            </div>
          </div>
          <div className="line">
            <div>订单类型 ：</div>
            <div>
              <span onClick={this.setOrderType.bind(this, "")} className={companyTypeId == "" ? "active-bg" : ""}>全部</span>
              {
                orderList ? orderList.map((item, key) => {
                  return (
                    <span key={key} onClick={this.setOrderType.bind(this, item.id)} className={companyTypeId == item.id ? "active-bg" : ""}>{item.name}</span>
                  )
                }) : ""
              }
              {/* <span onClick={this.setOrderType.bind(this, 1)} className={orderType == 1 ? "active-bg" : ""}>个人独资</span>
              <span onClick={this.setOrderType.bind(this, 2)} className={orderType == 2 ? "active-bg" : ""}>合伙企业</span>
              <span onClick={this.setOrderType.bind(this, 3)} className={orderType == 3 ? "active-bg" : ""}>有限公司</span>
              <span onClick={this.setOrderType.bind(this, 4)} className={orderType == 4 ? "active-bg" : ""}>个体户</span> */}
            </div>
          </div>
          <div className="line">
            <div>支付方式 ：</div>
            <div>
              <span onClick={this.setPayType.bind(this, "")} className={payType == "" ? "active-bg" : ""}>全部</span>
              <span onClick={this.setPayType.bind(this, 1)} className={payType == 1 ? "active-bg" : ""}>支付宝</span>
              <span onClick={this.setPayType.bind(this, 2)} className={payType == 2 ? "active-bg" : ""}>线下支付</span>
              <span onClick={this.setPayType.bind(this, 3)} className={payType == 3 ? "active-bg" : ""}>微信支付</span>
              <span onClick={this.setPayType.bind(this, 4)} className={payType == 4 ? "active-bg" : ""}>余额支付</span>
            </div>
          </div>
          <div className="line">
            <div>创建时间 ：</div>
            <div>
              <span onClick={this.setCreateTime.bind(this, "")} className={startDate == "" || endDate == "" ? "active-bg" : ""}>全部</span>
              <RangePicker
                onChange={this.onChange}
                value={DateValue}
                size="small"
                style={{ width: "259px", }}
              />
            </div>
          </div>
          <div className="line">
            <div>搜索 ：</div>
            <div>
              <Input onChange={this.inputChange} style={{ width: "260px", marginLeft: "28px" }} size="small" placeholder="请输入手机号和订单号"></Input>
            </div>
          </div>

          <div className="line">
            <div></div>
            <div style={{ marginLeft: "62px" }}>
              <Button onClick={this.searchList} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
              <Button style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>导出</Button>
            </div>
          </div>

        </div>
        {/* table 部分 */}
        <div className="table-content tables">
          {/* 123 */}
          <Table bordered
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
              },
            }}
            pagination={{
              total: this.state.total,
              showTotal: (total) => `共 ${total} 条`,
              onChange: (current) => this.paginationChange(current),
              pageSize: this.state.select.limit,
              current: this.state.current
            }}
            columns={this.state.columns} dataSource={this.state.data} />
        </div>

       {/* 备注修改 modal */}
       <AddremarkModal
          title="备注修改"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          data={this.state.remark}
        >
        </AddremarkModal>

        {/* 修改订单 */}
        <UpdateOrderModal
          title="订单修改"
          visible={this.state.updateVisible}
          onOk={this.upDateHandleOk}
          onCancel={this.updateHandleCancel}
          data={this.state.updateOrder}
        >
        </UpdateOrderModal>
      </div>
    );
  }
}

export default Order;
