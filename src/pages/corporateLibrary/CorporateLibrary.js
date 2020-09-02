import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon, Cascader } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom';
import data from "./city";
import { connect } from "react-redux";
import companyAction from "../../redux/actions/companyAction";

const { Option } = Select;
const { RangePicker } = DatePicker
//getregionbypid

@connect(
    ({ companyReducer, productReducer }) => ({ companyReducer, productReducer }),
    {
        //省
        getregionbypid: companyAction.getregionbypid,
        //市
        sgetregionbypid: companyAction.sgetregionbypid,
        //区
        qgetregionbypid: companyAction.qgetregionbypid,
        //法人库列表
        legallist:companyAction.legallist,
        locklegal:companyAction.locklegal

    }
)
class CorporateLibrary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            soptions: [],
            qoptions: [],
            status: 1,
            // 筛选属性
            createTime: "",
            searchValue: "",
            //开始时间
            startDate:"",
            //结束时间
            endDate:"",
            //搜所关键字
            search:"",
            page:1,
            limit:20,
            total:"",
            current:1,
            routerList: [
                {
                    name: "首页",
                    url: "/"
                },
                {
                    name: "法人库",
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
                    title: '法人姓名',
                    dataIndex: 'legalName',
                    key: 'legalName',
                },
                {
                    title: '法人手机号',
                    dataIndex: 'legalPhone',
                    key: 'legalPhone',
                },
                {
                    title: '用户手机',
                    key: 'phone',
                    dataIndex: 'phone',
                    //   render: tags => (
                    //     <span>
                    //       {tags.map(tag => {
                    //         let color = tag.length > 5 ? 'geekblue' : 'green';
                    //         if (tag === 'loser') {
                    //           color = 'volcano';
                    //         }
                    //         return (
                    //           <Tag color={color} key={tag}>
                    //             {tag.toUpperCase()}
                    //           </Tag>
                    //         );
                    //       })}
                    //     </span>
                    //   ),
                },
                {
                    title: '公司数量',
                    key: 'count',
                    dataIndex: 'count',
                    // render: (text, record) => (
                    //   <span>
                    //     <span>{record.state == 1 ? "上架" : "下架"}</span> &nbsp;
                    //     <Switch  defaultChecked  />
                    //   </span>
                    // ),
                },
                {
                    title: '最近设立时间',
                    key: 'submitEstablishTime',
                    dataIndex:"submitEstablishTime"
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <Dropdown overlay={
                            <Menu>
                                <Menu.Item key="0">
                                    <Link to={`/corporateLibraryDetail/${record.legalId}`}>
                                        法人详情
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="1" onClick={this.locklegal.bind(this,record.legalId)}>
                                    <a >锁定法人</a>
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
            data: [],
            visible: false,
            editVisible: false
        };
    }


    //设立时间
    setCreateTime = (value) => {
        if (value == "") {
            this.setState({
                    createTime: value,
                searchValue: value
            }, () => {
            })
        }

    }
    onChange = (date, dateString) => {
        this.setState({
            createTime: date,
            searchValue: date
        }, () => {
        })
    }
//    搜的关键词
searchChange = (e)=>{
    this.setState({
        search:e.target.value
    })
}

 // 搜所按钮
 searchClick = () => {
     let start='',end=''
     if(this.state.searchValue){
        start=moment(this.state.searchValue[0]).format('YYYY-MM-DD HH:mm:ss')
        end=moment(this.state.searchValue[1]).format('YYYY-MM-DD HH:mm:ss')
     }
     this.setState({
         current:1
     },()=>{
    this.props.legallist({
            page:1,
            limit:this.state.limit,
            search:this.state.search,
            startDate:start,
            endDate:end
        })
     })
    this.props.legallist({
        page:1,
        limit:this.state.limit,
        search:this.state.search,
        startDate:this.state.startDate,
        endDate:this.state.endDate
    })
  }

  paginationChange = (current)=>{
    this.setState({
      page: current,
      current
    },()=>{
      // 获取分页数据
      this.props.legallist({
        page:this.state.page,
        limit:this.state.limit,
        search:this.state.search,
        startDate:this.state.startDate,
        endDate:this.state.endDate
    })
    })
  }


    handleSelectedPosition = (value, selectedOptions) => {
        this.props.getregionbypid({
            pId: value[value.length - 1]
        });
        //    setTimeout(()=>{
        //        this.set
        //    },300)


        this.loadData(selectedOptions)

    }
    loadData = selectedOptions => {

        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = [
                {
                    label: `${targetOption.label} Dynamic 1`,
                    value: 'dynamic1',
                },
                {
                    label: `${targetOption.label} Dynamic 2`,
                    value: 'dynamic2',
                },
            ];
            this.setState({
                options: [...this.state.options],
            });
        }, 1000);
    };



    componentWillMount() {
        //   获取省
        this.props.getregionbypid({
            pId: ""
        });
        //获取法人库列表
        this.props.legallist({
            page:this.state.page,
            limit:this.state.limit,
            search:this.state.search,
            startDate:this.state.startDate,
            endDate:this.state.endDate
        })
    }
    componentWillReceiveProps(nextProp) {
        // 法人库列表
        if(nextProp.companyReducer.getIn(["legallist"])){
             let data = nextProp.companyReducer.getIn(["legallist","data","rows"]);
             let total = nextProp.companyReducer.getIn(["legallist","data","total"]);
                for(let i=0; i<data.length; i++){
                    data[i].key = i+1;
                }
             this.setState({
                 data,
                 total,
             })
        }






        if (nextProp.companyReducer.getIn(["getregionbypid"])) {
            let options = [];
            let data = nextProp.companyReducer.getIn(["getregionbypid", "data"]);
            for (let i = 0; i < data.length; i++) {
                options.push({
                    label: data[i].name,
                    value: data[i].id
                })
            }
            this.setState({
                options,
                // status:1
            })

        }
        //获取市
        if (nextProp.companyReducer.getIn(["sgetregionbypid"])) {
            let soptions = [];
            let data = nextProp.companyReducer.getIn(["sgetregionbypid", "data"]);
            for (let i = 0; i < data.length; i++) {
                soptions.push({
                    label: data[i].name,
                    value: data[i].id
                })
            }
            this.setState({
                soptions,
                // status:2
            })

        }
        //区
        if (nextProp.companyReducer.getIn(["qgetregionbypid"])) {
            let qoptions = [];
            let data = nextProp.companyReducer.getIn(["qgetregionbypid", "data"]);
            for (let i = 0; i < data.length; i++) {
                qoptions.push({
                    label: data[i].name,
                    value: data[i].id
                })
            }
            this.setState({
                qoptions,
                // status:3
            })

        }

    }
    // //sChange
    sChange = (value) => {
        this.props.sgetregionbypid({
            pId: value
        })
        this.setState({
            status: 2
        })

    }
    siChange = (value) => {
        this.props.qgetregionbypid({
            pId: value
        })
        this.setState({
            status: 3
        })
    }
    qChange = (value) => {
    }

//锁定法人操作
locklegal = (legalId)=>{
    this.props.locklegal({
      legalId: legalId
    })
  }

    render() {
        let { routerList, searchValue ,createTime} = this.state;
        // let { orderState, orderType, payType, createTime } = this.state.select

        return (
            <div className="product-container">
                {/* 产品列表 */}
                {/* 头部 */}
                <BreadeHeader routerList={routerList} />
                {/* 内容部分 */}
                <div className="search-content">
                    {/* 筛选 */}
                    <div style={{ display: "none" }} className="line">
                        <div>法人地区 ：</div>
                        {/* <div> */}
                        {/* <Cascader
                            size="small"
                            style={{ width: "260px" }}
                            options={this.state.options}
                            onChange={this.handleSelectedPosition.bind(this)}
                            loadData={this.loadData}
                            changeOnSelect
                            placeholder="请选法人地区"
                        /> */}
                        <span>
                            <Select size="small" onChange={this.sChange} placeholder={"请选择"} style={{ width: "120px", marginRight: "15px" }}>
                                {/* <Option value="jack">Jack</Option> */}
                                {
                                    this.state.options ? this.state.options.map((item, key) => {
                                        return <Option key={key} value={item.value}>{item.label}</Option>
                                    }) : ""
                                }
                            </Select>
                            {
                                this.state.status == 2 || this.state.status == 3 ? <Select onChange={this.siChange} placeholder={"请选择"} size="small" style={{ width: "120px", marginRight: "15px" }}>
                                    {
                                        this.state.soptions ? this.state.soptions.map((item, key) => {
                                            return <Option key={key} value={item.value}>{item.label}</Option>
                                        }) : ""
                                    }
                                </Select> : ""
                            }
                            {
                                this.state.status == 3 ? <Select onChange={this.qChange} placeholder={"请选择"} size="small" style={{ width: "120px", marginRight: "15px" }}>
                                    {
                                        this.state.qoptions ? this.state.qoptions.map((item, key) => {
                                            return <Option key={key} value={item.value}>{item.label}</Option>
                                        }) : ""
                                    }
                                </Select> : ""
                            }
                        </span>

                        {/* </div> */}
                    </div>

                    <div className="line">
                        <div>设立时间 ：</div>
                        <div>
                            <span onClick={this.setCreateTime.bind(this, "")} className={createTime == "" ? "active-bg" : ""}>全部</span>
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
                            <Input onChange={this.searchChange} style={{ width: "260px", marginLeft: "28px" }} size="small" placeholder="请输入手机号和订单号"></Input>
                        </div>
                    </div>

                    <div className="line">
                        <div></div>
                        <div style={{ marginLeft: "62px" }}>
                            <Button onClick={this.searchClick} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
                            <Button style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>导出</Button>
                        </div>
                    </div>

                </div>
                {/* table 部分 */}
                <div className="tables-contents">
                    {/* 123 */}
                    <Table 
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                        },
                      }}
                      pagination={{
                        total: this.state.total,
                        showTotal: (total) => `共 ${total} 条`,
                        onChange: (current) => this.paginationChange(current),
                        pageSize: this.state.limit,
                        current:this.state.current
                      }}
                    bordered columns={this.state.columns} dataSource={this.state.data} />
                </div>



            </div>
        );
    }
}

export default CorporateLibrary;
