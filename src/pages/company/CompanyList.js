import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom'
import excel from '../../utils/excel'
import { connect } from "react-redux";
import companyAction from "../../redux/actions/companyAction";
import productAction from "../../redux/actions/productAction";
import Apis from "../../service/apis/1.0"
import Addinfo from "./Addinfo"

const { Option } = Select;
const { RangePicker } = DatePicker

const exCol=[
  {
    title:'提交日期（申请企业时间）',
    key:'submitEstablishTime'
  },
  {
    title:'法人',
    key:'legalName'
  },
  {
    title:'法人联系电话',
    key:'legalPhone'
  },
  {
    title:'法人身份证号码',
    key:'legalNum'
  },
  {
    title:'法人邮箱',
    key:'legalEmail'
  },
  {
    title:'实际联系人（对接人）',
    key:'dockName'
  },
  {
    title:'联系电话（对接人）',
    key:'dockPhone'
  },
  {
    title:'核定名称（企业名称）',
    key:'companyName'
  },
  {
    title:'行业',
    key:'industryName'
  },
  {
    title:'落地园区（省市区）',
    key:'companyRegion'
  },
  {
    title:'归属渠道',
    key:'belongLabel'
  },
  {
    title:'企业类型',
    key:'companyTypeName'
  },
  {
    title:'产品类型',
    key:'packageName'
  },
  {
    title:'原公司名称/老板',
    key:'contact'
  },
  {
    title:'一级推荐人',
    key:'recommender'
  },
  {
    title:'二级推荐人',
    key:'twoLevel'
  },
  {
    title:'转化人',
    key:'transform'
  },
  {
    title:'邮寄地址',
    key:'address'
  },
  {
    title:'营业执照日期',
    key:'establishTime'
  },
  {
    title:'基本户开户行',
    key:'openBank'
  },
  {
    title:'基本户账号',
    key:'bankAccount'
  },
  {
    title:'税务办结日期',
    key:'taxTime'
  },

]
@connect(
  ({ companyReducer, productReducer }) => ({ companyReducer, productReducer }),
  {
    companyweblist: companyAction.companyweblist,
    companydetailweb: companyAction.companydetailweb,
    //获取公司类型
    productclassify: productAction.productclassify,
    //获取归属人
    getdictlistbyvalue: companyAction.getdictlistbyvalue,
    //添加信息\
    uptbelonger: companyAction.uptbelonger,
    //数据
    getcompanystatusnum: companyAction.getcompanystatusnum
  }
)
class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //公司类型
      productclassify: [],
      current:1,
      number:"",
      selectData:[],
      // 筛选属性
      select: {
        page: 1,
        limit: 20,
        companyStatus: "",
        companyTypeId: "",
        establishBeginTime: "",
        establishEndTime: "",
        search: "",
        //归属人信息
        getdictlistbyvalue:"",
      },
      searchValue: "",
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "公司列表",
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
          title: '公司名称',
          dataIndex: 'companyName',
          key: 'companyName',
        },
        {
          title: '公司类型',
          dataIndex: 'companyTypeName',
          key: 'companyTypeName',
        },
        {
          title: '公司地区',
          key: 'companyRegion',
          dataIndex: 'companyRegion',
        },
        {
          title: '公司行业',
          key: 'industryName',
          dataIndex: 'industryName',
        },
        {
          title: '公司法人',
          key: 'legalName',
          dataIndex: 'legalName',
        },
        {
          title: '账号',
          key: 'phone',
          dataIndex: 'phone',
        },
        {
          title: '设立状态',
          key: 'companyStatus',
          // dataIndex: 'companyStatus',
          render: (text, record) => {
            if (record.companyStatus == 1) {
              return <span>待设立</span>
            }
            if (record.companyStatus == 2) {
              return <span>审核中</span>
            }
            if (record.companyStatus == "2-1") {
              return <span>复审核</span>
            }
            if (record.companyStatus == 3) {
              return <span>设立中</span>
            }
            if (record.companyStatus == 4) {
              return <span>已设立</span>
            }
          },
        },
        {
          title: '设立时间',
          key: 'submitEstablishTime',
          dataIndex: "submitEstablishTime",
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            if( record.companyStatus !=1 ){
              return   <Dropdown overlay={
                <Menu>
                  {/* record.companyStatus */}
                  <Menu.Item key="0">
                    <Link to={`/companyDetail/${record.companyId}`}>
                      公司操作
                      </Link>
                  </Menu.Item>
                  <Menu.Item key="1" onClick={this.showModal.bind(this,record)}>
                    {/* <Link to="/companyListThree">
                      公司详情
                      </Link> */}
                      添加信息
                  </Menu.Item>
                </Menu>
              } trigger={['click']}>
                <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  操作 <Icon type="down" />
                </span>
              </Dropdown>
            }
          },
        },
      ],
      data: [
        {
          key: '1',
          name: '套餐一',
          type: '个人独资',
          number: 100,
          state: 1,
          payType: "支付宝",
          orderState: "已支付",
          time: "2019.01.20",
          action: "操作"
        },
        {
          key: '2',
          name: '套餐二',
          type: "个人独资",
          number: 100,
          state: 0,
          payType: "支付宝",
          orderState: "已支付",
          time: "2019.01.20",
          action: "操作"
        },
        {
          key: '3',
          name: '套餐三',
          type: "个人独资",
          number: 20,
          state: 0,
          payType: "支付宝",
          orderState: "已支付",
          time: "2019.01.20",
          action: "操作"
        },
      ],
      visible: false,
      editVisible: false,
      companyId:"",
      dataLists:"",
    };
  }

  // 添加 modal 用的方法
  showModal = (value) => {
    this.setState({
      companyId: value.companyId,
      dataLists:value
    })
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    //添加信息

    // 触发接口
    this.props.uptbelonger(Object.assign({companyId: this.state.companyId},e));
    // 更新数据
    setTimeout(()=>{
      this.props.companyweblist(this.state.select)
    },300)
    this.setState({
      visible: false,
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

  phChange = (e)=>{
      this.setState({
        select: Object.assign(this.state.select,{search: e.target.value})
      })
  }
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

  // 公司状态
  setOrderState = (value) => {
    this.setState({
      select: Object.assign(this.state.select, { companyStatus: value })
    }, () => {
    })
  }

  // 订单类型
  setOrderType = (value) => {
    this.setState({
      select: Object.assign(this.state.select, { companyTypeId: value })
    }, () => {
    })
  }

  //创建时间
  setCreateTime = (value) => {
    if (value == "") {
      this.setState({
        select: Object.assign(this.state.select, {
          establishBeginTime: value,
          establishEndTime: value
        }),
        searchValue: value
      })
    }

  }
  onChange = (date, dateString) => {
    this.setState({
      select: Object.assign(this.state.select, {
        establishBeginTime: dateString[0],
        establishEndTime: dateString[1]
      }),
      searchValue: date
    })
  }
  searChange = (e) => {
    this.setState({
      select: Object.assign(this.state.select, {
        search: e.target.value,
        page:1
      }),
    })
  }
  // 搜所按钮
  searchClick = () => {
    this.setState({
      current:1
    },()=>{
       this.props.companyweblist(Object.assign(this.state.select,{page:1}))
    })
    // this.props.companyweblist(this.state.select,{page:1})
  }

  paginationChange = (current)=>{
    this.setState({
      current
    })
    this.setState({
      select: Object.assign(this.state.select,{page:current})
    },()=>{
      // 获取分页数据
      this.props.companyweblist(this.state.select)
    })
  }

  exTable = ()=>{
    if(this.state.selectData.length>0){
      excel.exportExcel(exCol,this.state.selectData,'公司列表.xlsx')
    }else{
      Apis.companyweblist({...this.state.select,page:0,limit:10000}).then(res => {
        if (res.status == 200) {
            excel.exportExcel(exCol,res.data.rows,'公司列表.xlsx')
            
        }
    })
      // this.props.companyweblist(Object.assign(this.state.select,{page:0,limit:10000}))
    }
  }

  componentWillMount() {
    //获取公司类型
    this.props.productclassify({
      page: 1,
      limit: 100
    })
    //  获取公司列表
    this.props.companyweblist(this.state.select)

    //获取归属人
    this.props.getdictlistbyvalue({
      type:"belonger"
    })

    //数据
    this.props.getcompanystatusnum();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.productReducer.getIn(["productclassify"])) {
      this.setState({
        productclassify: nextProps.productReducer.getIn(["productclassify", "data", "rows"])
      })
    }
    //公司列表
    if (nextProps.companyReducer.getIn(["companyweblist"])) {
      let data = nextProps.companyReducer.getIn(["companyweblist", "data", "rows"]);
      let total = nextProps.companyReducer.getIn(["companyweblist", "data", "total"]);
    
        for (let i = 0; i < data.length; i++) {
          data[i].key = i + 1;
        }
        this.setState({
          data,
          total
        })
      
    }

    //归属人信息
    if(nextProps.companyReducer.getIn(["getdictlistbyvalue"])){
      let getdictlistbyvalue = nextProps.companyReducer.getIn(["getdictlistbyvalue","data"])
      this.setState({
        getdictlistbyvalue
      })

    }

    //shuju
    if(nextProps.companyReducer.getIn(["getcompanystatusnum"])){
      this.setState({
        number: nextProps.companyReducer.getIn(["getcompanystatusnum","data"])
      })
    }
  }



  render() {
    let { routerList, searchValue, productclassify,number } = this.state;
    let { companyStatus, companyTypeId, establishBeginTime, establishEndTime } = this.state.select
// if(number){
//    let data = Object.values(number[0])

// }
    return (
      <div className="product-container">
        {/* 产品列表 */}
        {/* 头部 */}
        <BreadeHeader routerList={routerList} />
        {/* 内容部分 */}
        <div className="search-content">
          {/* 筛选 */}
          <div className="line">
            <div>公司状态 ：</div>
            <div>
              <span onClick={this.setOrderState.bind(this, "")} className={companyStatus == "" ? "active-bg" : ""}>全部</span>
              <span onClick={this.setOrderState.bind(this, 1)} className={companyStatus == 1 ? "active-bg" : ""}>待设立({number ? Object.values(number[0])[1] : ""})</span>
              <span onClick={this.setOrderState.bind(this, 2)} className={companyStatus == 2 ? "active-bg" : ""}>审核中({number ? Object.values(number[0])[0] : ""})</span>
              <span onClick={this.setOrderState.bind(this, 3)} className={companyStatus == 3 ? "active-bg" : ""}>设立中({number ? Object.values(number[0])[2] : ""})</span>
              <span onClick={this.setOrderState.bind(this, 4)} className={companyStatus == 4 ? "active-bg" : ""}>已设立({number ? Object.values(number[0])[3] : ""})</span>
            </div>
          </div>
          <div className="line">
            <div>公司类型 ：</div>
            <div>
              <span onClick={this.setOrderType.bind(this, "")} className={companyTypeId == "" ? "active-bg" : ""}>全部</span>
              {
                productclassify ? productclassify.map((item, key) => {
                  return <span key={key} onClick={this.setOrderType.bind(this, item.id)} className={companyTypeId == item.id ? "active-bg" : ""}>{item.name}</span>
                }) : ""
              }
            </div>
          </div>
          <div className="line">
            <div>设立时间 ：</div>
            <div>
              <span onClick={this.setCreateTime.bind(this, "")} className={establishBeginTime == "" || establishEndTime == "" ? "active-bg" : ""}>全部</span>
              <RangePicker
                onChange={this.onChange}
                value={searchValue}
                size="small"
                style={{ width: "259px", }}
              />
            </div>
          </div>
          <div className="line">
            <div>搜索 ：</div>
            <div>
              <Input onChange={this.phChange} style={{ width: "260px", marginLeft: "28px" }} size="small" placeholder="请输入公司名称"></Input>
            </div>
          </div>

          <div className="line">
            <div></div>
            <div style={{ marginLeft: "62px" }}>
              <Button onClick={this.searchClick} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
              <Button style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }} onClick={this.exTable}>导出</Button>
            </div>
          </div>

        </div>
        {/* table 部分 */}
        <div className="tables-content">
          {/* 123 */}
          <Table bordered 
          rowSelection={{
            onChange: (selectedRowKeys, selectedRows) => {
              this.setState({
                selectData:selectedRows
              })
            },
          }}
          pagination={{
            total: this.state.total,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (current) => this.paginationChange(current),
            pageSize: this.state.select.limit,
            current:this.state.current
          }}
          columns={this.state.columns} dataSource={this.state.data} />
        </div>


        <Addinfo 
          title="添加信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          getdictlistbyvalue={this.state.getdictlistbyvalue}
          data = {this.state.dataLists}
        ></Addinfo>
      </div>
    );
  }
}

export default CompanyList;
