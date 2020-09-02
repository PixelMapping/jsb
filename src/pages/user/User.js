import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon, Cascader } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom';
//userpage
import { connect } from "react-redux";
import userAction from "../../redux/actions/userAction";

const { Option } = Select;
const { RangePicker } = DatePicker
const { confirm } = Modal

@connect(
    ({ userReducer }) => ({ userReducer }),
    {
        userpage: userAction.userpage,
        //删除
        remove: userAction.remove
    }
  )
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 筛选属性
            select: {
                page:1,
                limit:10,
                startDate:"",
                endDate:"",
                search:"",
                // createTime: 0
            },
            current:1,
            searchValue: "",
            total:"",
            routerList: [
                {
                    name: "首页",
                    url: "/"
                },
                {
                    name: "用户管理",
                    url: "/order"
                }
            ],
            columns: [
                // {
                //     title: '用户ID',
                //     dataIndex: 'userId',
                //     key: 'userId',
                // },
                {
                    title: '头像',
                    // dataIndex: 'name',
                    key: 'photo',
                    render: (text,record) => (
                        <div className="avatar">
                            <img src={record.photo} alt=""/>
                        </div>
                    )
                },
                {
                    title: '手机号',
                    dataIndex: 'phone',
                    key: 'phone',
                },
                {
                    title: '姓名',
                    key: 'name',
                    dataIndex: 'name',
                },
                {
                    title: '电子邮箱',
                    key: 'email',
                    dataIndex: 'email',
                    // render: (text, record) => (
                    //   <span>
                    //     <span>{record.state == 1 ? "上架" : "下架"}</span> &nbsp;
                    //     <Switch  defaultChecked  />
                    //   </span>
                    // ),
                },
                {
                    title:"推荐人",
                    key: 'recommend',
                    dataIndex: 'recommend',
                },
                {
                    title: '购买次数',
                    key: 'buyCount',
                    dataIndex: 'buyCount',
                    // render: (text, record) => (
                    //   <span>
                    //     <span>{record.state == 1 ? "上架" : "下架"}</span> &nbsp;
                    //     <Switch  defaultChecked  />
                    //   </span>
                    // ),
                },
                {
                    title: '加入时间',
                    key: 'crt_time',
                    dataIndex:"crt_time"
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key="0">
                                    <Link to={`/userDetail/${record.userId}`}>
                                        用户详情
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="1">
                                    <span onClick={this.deleteUser.bind(this, record.userId)}>删除</span>
                                </Menu.Item>
                            </Menu>
                        } trigger={['click']}>
                            <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                操作 <Icon type="down" />
                            </span>
                        </Dropdown>

                    ),
                },
            ],
            data: [
            ],
            visible: false,
            editVisible: false
        };
    }


    //时间
    setCreateTime = (value) => {
        if (value == "") {
            this.setState({
                select: {
                    // createTime: value
                page:1,
                limit:10,
                startDate:"",
                endDate:"",
                search:this.state.select.search,
                },
                searchValue: value
            })
        }

    }
    onChange = (date, dateString) => {
        console.log(date, dateString)
        this.setState({
            select: {
                page:1,
                limit:10,
                startDate:dateString[0],
                endDate:dateString[1],
                search:this.state.select.search,
            },
            searchValue: date
        })
    }

    deleteUser = (id) => {
        console.log("提示是否需要删除",id); 
        confirm({
            title: '是否确定删除此用户?',
            // content: '完成点击 是 ,未完成点击否',
            okText: '是',
            okType: 'danger',
            cancelText: '否',
            onOk: () => {
               this.props.remove({
                userId: id
               })

               setTimeout(()=>{
                this.props.userpage(this.state.select)
                   
               },300)
            },
            onCancel: () => {
               
             },
        })
    }
//搜所

    setPhone = (e)=>{
        let obj={...this.state.select}
        obj.search=e.target.value
        this.setState({
            select:obj
        })
    }

    search = ()=>{
        this.setState({
            current:1
        },()=>{
            this.props.userpage(Object.assign(this.state.select,{page:1}))
        })
        
    }

    paginationChange = (current)=>{
        console.log(current)
        this.setState({
          select: {
            page: current,
            limit: this.state.select.limit,
            startDate:this.state.select.startDate,
                endDate:this.state.select.endDate,
                search:this.state.select.search,
          },
          current
        },()=>{
          // 获取分页数据
          this.props.userpage(this.state.select)
        })
      }
 componentWillMount(){
     this.props.userpage(this.state.select)
 }
 componentWillReceiveProps(nextProps){
    if(nextProps.userReducer.getIn(["userpage"])){
        this.setState({
            data: nextProps.userReducer.getIn(["userpage","data","rows"]),
            total: nextProps.userReducer.getIn(["userpage","data","total"])
        })
    }
 }



    render() {
        let { routerList, searchValue } = this.state;
        let { orderState, orderType, payType, startDate } = this.state.select

        return (
            <div className="product-container">
                {/* 产品列表 */}
                {/* 头部 */}
                <BreadeHeader routerList={routerList} />
                {/* 内容部分 */}
                <div className="search-content">
                    {/* 筛选 */}
                    <div className="line">
                        <div>注册时间 ：</div>
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
                    <div className="line">
                        <div>搜索 ：</div>
                        <div>
                            <Input style={{ width: "260px", marginLeft: "28px" }} value={this.state.select.search} onChange={this.setPhone.bind(this)} size="small" placeholder="请输入手机号或姓名"></Input>
                        </div>
                    </div>

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
                    <Table bordered
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
                        current:this.state.current
                      }}
                    columns={this.state.columns} dataSource={this.state.data} />
                </div>



            </div>
        );
    }
}

export default User;
