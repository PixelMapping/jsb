import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon, message } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import CollectionCreateForm from "./compents/CollectionCreateForm";
import Authority from "./compents/Authority";
import Apis from "../../service/apis/1.0";
import moment from "moment";
import { Link } from 'react-router-dom'

const { Option } = Select;
const { RangePicker } = DatePicker

class remind extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 筛选属性
      select: {
        page: 1,
        limit: 20,
        search: ''
      },
      current: 1,
      searchValue: "",
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "角色",
          url: "/role"
        }
      ],
      columns: [
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: '角色名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: '操作',
          key: 'action',
          fixed:'right',
          width:300,
          render: (record) => (
            <div>
              <Button type="primary" onClick={this.eidtUser.bind(this, record)} style={{ marginRight: 10 }}>编辑</Button>
              <Button type="primary" onClick={this.delUser.bind(this, record)} style={{ marginRight: 10 }}>删除</Button>
              <Button type="primary" onClick={this.setAuth.bind(this,record)}>授权</Button>
            </div>
          ),
        },
      ],
      data: [
      ],
      visible: false,
      authVisible: false,
      isAdd: true,
      treeData: [],
      id:'',
      total:0,
      autoExpandParent: false,
      expandedKeys: ['-1'],
      checkedKeys: [],
    };
  }

  componentWillMount() {
    this.getData()
    this.getAuth()
  }

  componentWillReceiveProps(nextProps) {
  }

  getData = () => {
    let dates = this.state.value
    let select = this.state.select
    let data = {
      page: select.page,
      limit: select.limit,
    }
    Apis.getGroupList(data).then(res => {
      if (res.rel) {
        let data = res.data.rows.map((item,index)=>{
          return {...item,key:index+1}
        })
        this.setState({
          data: data,
          total:res.data.total
        })
      }
    })
  }
  getAuth=()=>{
    Apis.getMenus({}).then(res=>{
      if(res.rel){
        this.setState({
          treeData:res.data,
        })
      }
    })
  }

  paginationChange = (current) => {
    this.setState({
      select: Object.assign(this.state.select, { page: current }),
      current
    }, () => {
      this.getData()
    })
  }

  onChange = (e) => {
    this.setState({
      search: {
        page: 1,
        limit: this.state.search.limit,
        search: e.target.value
      }
    })
  }

  handleCancel = () => {
    const { form } = this.formRef.props;
    form.resetFields()
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return
      }
      if (this.state.isAdd) {
        Apis.group({ name: values.name,description:values.description||'' }).then(res => {
          if (res.rel) {
            message.info(res.message)
            this.setState({
              visible: false
            })
            form.resetFields()
            this.getData()
          }
        })
      } else {
        Apis.updGroup({ name: values.name,description:values.description||'',id:this.state.id }).then(res => {
          if (res.rel) {
            message.info(res.message)
            this.setState({
              visible: false
            })
            form.resetFields()
            this.getData()
          }
        })
      }
    });
  };
  delUser = (row) =>{
    Apis.delGroup({ id:row.id }).then(res => {
      if (res.rel) {
        message.info(res.message)
        this.getData()
      }
    })
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  saveTreeRef = formRef => {
    this.TreeRef = formRef;
  };

  showModal = () => {
    this.setState({ visible: true ,isAdd:true});
  };
  eidtUser = (row) => {
    const { form } = this.formRef.props;
    form.setFieldsValue({name:row.name,description:row.description})
    this.setState({
      visible:true,
      isAdd:false,
      id:row.id
    })
  }
  

  cancel = () => {
    this.setState({ authVisible: false });
  };


  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys: expandedKeys,
      autoExpandParent: false
    })
  };

  onCheck = (checkedKeys, checkedNodes) => {
    console.log(checkedKeys)
    this.setState({
      checkedKeys: checkedKeys
    })
  };

  setAuth=(row)=>{
    Apis.getGroupMenuBind({groupId:row.id}).then(res=>{
      if(res.rel){
        this.setState({
          authVisible:true,
          checkedKeys:res.data,
          id:row.id
        })
      }
    })
  }

  save=()=>{
    let data={
      groupId:this.state.id,
      menus:this.state.checkedKeys
    }
    Apis.saveGroupMenuAuthy(data).then(res=>{
      if(res.rel){
        message.info(res.message)
        this.setState({
          authVisible:false
        })
      }
    })
  }

  render() {
    let { routerList, columns, data, isAdd } = this.state;
    let { invoiceType, startDate, endDate } = this.state.select
    return (
      <div className="product-container">
        <BreadeHeader routerList={routerList} />
        <div className="search-content">
          <div>
            {/* <span>搜索</span>
            <Input onChange={this.onChange} style={{ width: "20%", marginRight: "30px" }} placeholder="请输入名称" />
            <Button onClick={this.getData} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
            <Button style={{backgroundColor:"#17A2A9",color:"#FFF",marginLeft:"10px"}}>导出</Button>
            <br /> */}
            <Button onClick={this.showModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "0px", marginTop: "15px" }}>新增角色</Button>
          </div>
        </div>
        <div className="table-content">
          <Table
            className="components-table-demo-nested"
            bordered
            columns={columns}
            dataSource={data}
            pagination={{
              total: this.state.total,
              showTotal: (total) => `共 ${total} 条`,
              onChange: (current) => this.paginationChange(current),
              pageSize: this.state.select.limit,
              current: this.state.current
            }}
          />
        </div>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          title={isAdd ? '新增用户' : '修改用户'}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Authority
          wrappedComponentRef={this.saveTreeRef}
          title="编辑权限"
          visible={this.state.authVisible}
          data={this.state.treeData}
          onCancel={this.cancel}
          onExpand={this.onExpand}
          selectable={false}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          save={this.save}
          treeData={this.state.treeData}
          checkedKeys={this.state.checkedKeys}
        />
      </div>
    );
  }
}


export default remind;

