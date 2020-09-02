import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import AddProductModal from "./AddProduct";
import EditProductModal from "./EditProduct";
import { connect } from "react-redux";
import productAction from "../../redux/actions/productAction";
import { get, getIn } from "immutable";

const { Option } = Select


@connect(
  ({ productReducer }) => ({ productReducer }),
  {
    productlist: productAction.productlist,
    productclassify: productAction.productclassify,
    deleteproductlist: productAction.deleteproductlist,
    addproductlist:productAction.addproductlist,
    editproductlist:productAction.editproductlist,
    getdictlistbytype:productAction.getdictlistbytype
  }
)
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "产品管理",
          url: "/product"
        }
      ],
      // 搜索字段
      search: {
        page: 1,
        limit: 20,
        companyTypeId: "",
        packageState: "",
        search: ""
      },
      current:1,
      switchState:"",
      //返回字段
      total: "",
      //产品分类列表
      productclassify: [],
      //修改的list
      editList: "",
      data: [

      ],

      columns: [
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
          render: text => text,
        },
        {
          title: '产品名称',
          dataIndex: 'packageName',
          key: 'packageName',
        },
        {
          title: '产品分类',
          dataIndex: 'companyTypeName',
          key: 'companyTypeName',
        },
        {
          title: '销量',
          key: 'sales',
          dataIndex: 'sales',
        },
        {
          title: '排序',
          key: 'sort',
          dataIndex: 'sort',
        },
        {
          title: '状态',
          key: 'packageState',
          render: (text, record) => {
            // console.log("123",record)
            // if(record.packageState == 1){
            //     this.setState({
            //       switchState:true
            //     })
            // }else{
            //   this.setState({
            //     switchState:false
            //   })
            // }

            return (
              <span>
                <span>{record.packageState == 1 ? "上架" : "下架"}</span> &nbsp;
              <Switch checked={record.packageState == 1 ? true : false}   onClick={this.switchOnChange.bind(this,record.packageState,record)}/>
              </span>
            )
          }
        },
        {
          title: '添加时间',
          key: 'crtTime',
          render: (text, record) => (
            <span>
              <span>{record.crtTime}</span>

            </span>
          ),
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            // console.log("8888",record)
            return (
              <>
                <span className="btn-diy">
                  <Button onClick={this.editShowModal.bind(this, record)} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>编辑</Button>
                </span>
                <Button onClick={this.showDeleteConfirm.bind(this, record)} type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>删除</Button>
              </>

            )
          }
        },
      ],

      visible: false,
      editVisible: false
    };
  }
  componentDidMount() {
    // 产品页面初始化获取产品列表
    this.props.productlist(this.state.search);
    //获取产品分类列表
    this.props.productclassify({
      page:1,
      limit:100
    });
    //获取开票额度
    this.props.getdictlistbytype();
  }

  searchList = () => {
    this.props.productlist(this.state.search);
  }
  paginationChange = (current)=>{
    this.setState({
      current
    })
    this.setState({
      search: {
        page: current,
        limit: this.state.search.limit,
        companyTypeId: this.state.search.companyTypeId,
        packageState: this.state.search.packageState,
        search: this.state.search.search
      },
    },()=>{
      // 获取分页数据
      this.props.productlist(this.state.search)
    })
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.productReducer && nextProps.productReducer.getIn(["productlist","data"])) {
      let data = nextProps.productReducer.getIn(["productlist", "data"]);
      // if (data.rows && data.rows.length > 0) {
        let list = data.rows;
        for (let i = 0; i < list.length; i++) {
          list[i].key = i + 1;
        }
        this.setState({
          total: data.total,
          data: list
        })
      // }


    }
    if (nextProps.productReducer && nextProps.productReducer.getIn(["productclassify"])) {
      this.setState({
        productclassify: nextProps.productReducer.getIn(["productclassify", "data", "rows"])
      })
    }

  }








  // switchOnChange
  switchOnChange = (checked,value) => {
    let data = value;
    if(checked == 1){
      data.packageState = 2
    }else{
      data.packageState = 1
    }
    // 添加 state ,  
    this.state.productclassify.map((item,key)=>{
      if(item.id == data.companyTypeId){
      data.companyTypeName = item.name
      }
    })
    data.state = data.packageState;
    // data.packageId = this.state.editList.packageId;
    data.taxpayerTypeId=123;
    data.taxpayerTypeName ="123";
    this.setState({
      editVisible: false,
    },()=>{
      this.props.editproductlist(data);
      setTimeout(()=>{
        this.props.productlist(this.state.search)
      },300)
    });
  }

  // 添加 modal 用的方法
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    let data = e;
    data.vatReturn = data.vatReturn
    this.state.productclassify.map((item,key)=>{
      if(item.id == e.companyTypeId){
      data.companyTypeName = item.name
      }
    })
    
    this.setState({
      visible: false,
    },()=>{
      this.props.addproductlist(data);
      window.location.reload();
      setTimeout(()=>{
        this.props.productlist({
          page: 1,
          limit: 5,
          companyTypeId: "",
          packageState: "",
          search: ""
        });
      },10)
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  // 编辑 modal 用的方法
  editShowModal = (record) => {
    this.setState({
      editVisible: true,
    }, () => {
      this.setState({
        editList: record
      },()=>{
      })
    });
  };

  editHandleOk = e => {
    let data = e;
    data.vatReturn = data.vatReturn 
    // 添加 state ,  
    this.state.productclassify.map((item,key)=>{
      if(item.id == e.companyTypeId){
      data.companyTypeName = item.name
      }
    })
    data.state = data.packageState;
    data.packageId = this.state.editList.packageId;
    data.taxpayerTypeId=123;
    data.taxpayerTypeName ="123"
    this.setState({
      editVisible: false,
    },()=>{
      this.props.editproductlist(data);
      setTimeout(()=>{
        this.props.productlist(this.state.search)
      },300)
    });
  };

  editHandleCancel = e => {
    this.setState({
      editVisible: false,
    });
  };


  // 删除确认框
  showDeleteConfirm = (record) => {
    Modal.confirm({
      title: '是否确认删除此产品?',
      content: '删除后不可恢复',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => {
        this.props.deleteproductlist({ packageId: record.packageId });
        setTimeout(() => {
          this.props.productlist(this.state.search);
        }, 300)
      },
      onCancel() {
      },
    });
  }







  onChange(data, value) {
    this.setState({
      current:1
    })
    // console.log(`选中 ${data} ${value}`);
    if (data == "产品分类") {
      this.setState({
        search: {
          page: 1,
          limit: this.state.search.limit,
          companyTypeId: value,
          packageState: this.state.search.packageState,
          search: this.state.search.search
        },
      })
    }
    if (data == "产品状态") {
      this.setState({
        search: {
          page: 1,
          limit: this.state.search.limit,
          companyTypeId: this.state.search.companyTypeId,
          packageState: value,
          search: this.state.search.search
        },
      })
    }
    if (data == "搜索") {
      this.setState({
        search: {
          page: 1,
          limit: this.state.search.limit,
          companyTypeId: this.state.search.companyTypeId,
          packageState: this.state.search.packageState,
          search: value.target.value
        },
      })
    }
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
            <span>产品分类</span>
            <Select
              style={{ width: "15%", marginRight: "30px" }}
              placeholder="请选择"
              optionFilterProp="children"
              onChange={this.onChange.bind(this, "产品分类")}
            >
             
              {
                this.state.productclassify? (this.state.productclassify.map((item, key) => {
                  return <Option key={key} value={item.id}> {item.name} </Option>
                })) : ""
                
              }
            </Select>

            <span>产品状态 </span>
            <Select
              style={{ width: "15%", marginRight: "30px" }}
              placeholder="请选择"
              optionFilterProp="children"
              onChange={this.onChange.bind(this, "产品状态")}
            >
              <Option value="1">上架中</Option>
              <Option value="2">下架中</Option>
            </Select>

            <span>搜索</span>
            <Input onChange={this.onChange.bind(this, "搜索")} style={{ width: "20%", marginRight: "30px" }} placeholder="请输入商品名称" />
            <Button onClick={this.searchList} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
            <Button style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>导出</Button>

            <br />
            <Button onClick={this.showModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px", marginTop: "15px" }}>新增产品</Button>
          </div>
        </div>
        {/* table 部分 */}
        <div className="table-content">
          {/* 123 */}
          <Table
            bordered
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
              },
            }}
            pagination={{
              total: this.state.total,
              showTotal: (total) => `共 ${total} 条`,
              onChange: (current) => this.paginationChange(current),
              pageSize: this.state.search.limit,
              current: this.state.current
            }}
            columns={this.state.columns}
            dataSource={this.state.data} />
        </div>

        {/* 新增产品 */}
        <AddProductModal
          title="新增产品"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          productclassify={this.state.productclassify}
          getdictlistbytype={this.props.productReducer.getIn(["getdictlistbytype","data"])}
        >
        </AddProductModal>

        {/* 编辑 */}
        <EditProductModal
          title="编辑产品"
          visible={this.state.editVisible}
          onOk={this.editHandleOk}
          onCancel={this.editHandleCancel}
          data={this.state.editList}
          productclassify={this.state.productclassify}
          getdictlistbytype={this.props.productReducer.getIn(["getdictlistbytype","data"])}
        >

        </EditProductModal>

      </div>
    );
  }
}

export default Product;
