import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Select, Input, Button, Switch, Modal, DatePicker,Form,message } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import Apis from "../../service/apis/1.0";
import moment from "moment";
import { Link } from 'react-router-dom'

const { Option } = Select;
const { RangePicker } = DatePicker
const Staff = Form.create({ name: 'form_in_modal' })(
class extends Component {
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
          name: "员工",
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
          title: '用户名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '账号',
          dataIndex: 'loginName',
          key: 'loginName',
        },
        {
          title: '角色名',
          dataIndex: 'groupName',
          key: 'groupName',
        },
        {
          title: '创建时间',
          dataIndex: 'crt_time',
          key: 'crt_time',
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
          title: '操作',
          key: 'action',
          render: (record) => (
            <div>
              <Button type="primary" onClick={this.eidt.bind(this, record)}>编辑</Button>
            </div>
          ),
        },
      ],
      data: [
      ],
      visible: false,
      roleList:[],
      cur:'',
      total:0
    };
  }

  componentWillMount() {
    this.getData()
    this.getRole()
  }

  search = ()=>{
    this.setState({
      current:1
     },()=>{
       this.getData()
     })
  }

  componentWillReceiveProps(nextProps) {
  }

  getData = () => {
    let dates = this.state.value
    let select = this.state.select
    let data = {
      page: select.page,
      limit: select.limit,
      search:select.search
    }
    Apis.employeePage(data).then(res => {
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

  getRole(){
    Apis.groupList({}).then(res => {
      if (res.rel) {
        this.setState({
          roleList: res.data
        })
      }
    })
  }

  paginationChange = (current)=>{
    this.setState({
     select: Object.assign(this.state.select, { page: current} ),
     current
    },()=>{
      this.getData()
    })
  }
  swonChange = (userId,value) => {
      //2
      Apis.isusing({
        userId,
        type:value==0?2:3
      }).then(res=>{
        if(res.rel){
          message.info(res.message)
          this.getData()
        }
      })    
  }

  onChange =(e)=>{
    this.setState({
      select:{
        page:1,
        limit:20,
        search: e.target.value
      }
    })

  }


  eidt = (row) =>{
    this.props.form.resetFields()
    let id=row.groupId==''?[]:row.groupId.split(',')
    this.props.form.setFieldsValue({groupIds:id})
    this.setState({
      visible:true,
      cur:row
    })
  }

  handleOk = e => {

    this.props.form.validateFields((err,values)=>{
      if(err){
        return
      }
      let data = {
        userId:this.state.cur.userId,
        groupIds:values.groupIds,
      }
      Apis.userGroup(data).then(res=>{
        if(res.rel){
          message.info(res.message)
          this.setState({
            visible: false,
          });
          this.getData()
        }
      })
      
    })
  };

  handleCancel = e => {
    this.props.form.resetFields()
    this.setState({
      visible: false,
    });
  };

  render() {
    let { routerList, columns, data, isAdd } = this.state;
    let { invoiceType, startDate, endDate } = this.state.select
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div className="product-container">
        <BreadeHeader routerList={routerList} />
        <div className="search-content">
          <div>

            <span>搜索</span>
            <Input onChange={this.onChange} style={{ width: "20%" ,marginRight:"30px"}}  placeholder="请输入手机号/姓名" />
            <Button onClick={this.search} style={{backgroundColor:"#17A2A9",color:"#FFF",marginLeft:"10px"}}>搜索</Button>
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
        <Modal
          title="绑定角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
           <Form {...formItemLayout}>
           <Form.Item label="角色">
              {getFieldDecorator('groupIds', {
                rules: [{ required: true, message: '请选择角色' }],
              })(
                <Select mode="multiple">
                  {
                    this.state.roleList.map(item=>{
                      return (
                      <Option value={item.id} key={item.id}>{item.name}</Option>
                      )
                    })
                  }
                </Select>
              )}
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}
)

export default Staff;

