import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import AddCustomerService from "./AddCustomerService";
import EditCustomerService from "./EditCustomerService"
import { connect } from "react-redux";
import userAction from "../../redux/actions/userAction";

const { Option } = Select
// key: '1',
//       name: '套餐一',
//       type: 32,
//       number: 'New York No. 1 Lake Park',
//       state: ['nice', 'developer'],
//       time:"2019.01.20",
//       action:"操作"

  
// managerpage
@connect(
  ({ userReducer }) => ({ userReducer }),
  {
    managerpage: userAction.managerpage,
    //启用/冻结
    isusing: userAction.isusing,
    //编辑
    editmanage: userAction.editmanage,
    //新增
    addmanage: userAction.addmanage
 
  }
)
class CustomerService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:{
        page:1,
        limit:10,
        search:""
      },
      editData:"",
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "客服管理",
          url: "/product"
        }
      ],
      columns : [
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
          render: text => text,
        },
        {
          title: '客服姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '登录账号',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '部门',
          key: 'type',
          render: (text,record)=>{
              if(record.TYPE == 1){
                return <span>运营部</span>
              }else{
                return <span>园区拓展部</span>
              }
          }
        },
        {
          title: '状态',
          key: 'loginFlag',
          render: (text, record) => (
            <span>
              <span>{record.loginFlag == 0 ? "启用" : "锁定"}</span> &nbsp;
              <Switch onChange={this.swonChange.bind(this,record.userId,record.loginFlag)} defaultChecked = {record.loginFlag == 0 ? true : false}  />
            </span>
          ),
        },
        {
            title: '添加时间',
            key: 'time',
            render: (text, record) => (
              <span>
                <span>{record.time}</span>
                
              </span>
            ),
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <>
              <span className="btn-diy">
                 <Button onClick={this.editShowModal.bind(this,record)} style={{backgroundColor:"#17A2A9",color:"#FFF",marginRight:"10px"}}>编辑</Button>
              </span>
              {/* <Button onClick={this.showDeleteConfirm} type="danger" style={{backgroundColor:"#FF4D4F",color:"#FFF",marginRight:"10px"}}>删除</Button> */}
              </>
              
            ),
          },
      ],
      data:[],
      visible: false,
      editVisible:false
    };
  }

  // 添加 modal 用的方法
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
  if(e.area){
    this.props.addmanage(Object.assign(
      e, {
        provinceId:"0b1fadc4557c4b278c28c22c3f6ab6e5",
        provinceName:e.area[0],
        cityId:"0b1fadc4557c4b278c28c22c3f6ab6e5",
        cityName:e.area[1],
        districtId:"0b1fadc4557c4b278c28c22c3f6ab6e5",
        districtName:e.area[2]
      }
    ))
  }else{
    this.props.addmanage(e);
  }
   //刷新列表
   setTimeout(()=>{
    this.props.managerpage(this.state.search)
  },500)
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
  editShowModal = (value) => {
    this.setState({
      editData: value
    })
    this.setState({
      editVisible: true,
    });
  };

  editHandleOk = e => {
    this.props.editmanage(Object.assign(
      {
        manageId: this.state.editData.manageId,
        provinceId:"",
        provinceName:"",
        cityId:"",
        cityName:"",
        districtId:"",
        districtName:""
      },e))
    setTimeout(()=>{
      this.props.managerpage(this.state.search)
    },500)
    this.setState({
      editVisible: false,
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

componentWillMount(){
  this.props.managerpage(this.state.search)
}

componentWillReceiveProps(nextProps){
  if(nextProps.userReducer.getIn(["managerpage"])){
    let data = nextProps.userReducer.getIn(["managerpage","data","rows"]);
    for(let i = 0; i<data.length; i++){
      data[i].key = i+1
    }
    this.setState({
      data
    })
  }
}


   onChange=(e)=> {
    this.setState({
      search:{
        page:1,
        limit:this.state.select.limit,
        search: e.target.value
      }
    })
  }
  searchs = ()=>{
    this.props.managerpage(this.state.search)
  }

  swonChange = (userId,value) => {
    if(value == 0){
      //2
      this.props.isusing({
        userId,
        type:2
      })
    }else{
      //3
      this.props.isusing({
        userId,
        type:3
      })
    }

    setTimeout(()=>{
      this.props.managerpage(this.state.search)
    },500)
  }
  
  

  render() {
    let { routerList } = this.state;

    return (
      <div className="product-container">
        {/* 产品列表 */}
        {/* 头部 */}
        <BreadeHeader routerList={routerList} />
        {/* 内容部分 */}
        <div className="search-content">
          <div>

            <span>搜索</span>
            <Input onChange={this.onChange} style={{ width: "20%" ,marginRight:"30px"}}  placeholder="请输入客服姓名" />
            <Button onClick={this.searchs} style={{backgroundColor:"#17A2A9",color:"#FFF",marginLeft:"10px"}}>搜索</Button>
            {/* <Button style={{backgroundColor:"#17A2A9",color:"#FFF",marginLeft:"10px"}}>导出</Button> */}

            <br/>
            <Button onClick={this.showModal} style={{backgroundColor:"#17A2A9",color:"#FFF",marginLeft:"0px",marginTop:"15px"}}>新增客服</Button>
          </div>
        </div>
        {/* table 部分 */}
            <div className="table-content">
                {/* 123 */}
                <Table bordered  columns={this.state.columns} dataSource={this.state.data} />
            </div>

{/* 新增产品 */}
        <AddCustomerService
          title="新增客服"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        </AddCustomerService>

        {/* 编辑 */}
        <EditCustomerService 
         title="编辑客服"
         visible={this.state.editVisible}
         onOk={this.editHandleOk}
         onCancel={this.editHandleCancel}
         data={this.state.editData}
        >

        </EditCustomerService>

      </div>
    );
  }
}

export default CustomerService;
