import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import AddIndustry from "./AddIndustry";
import EditIndustry from "./EditIndustry";
import { connect } from "react-redux";
import industryAction from "../../redux/actions/industryAction";
import productAction from "../../redux/actions/productAction";
import { get, getIn } from "immutable";

const { Option } = Select


@connect(
  ({ productReducer,industryReducer }) => ({ productReducer,industryReducer }),
  {
    industrypage: industryAction.industrypage,
    productclassify: productAction.productclassify,
    // deleteproductlist: productAction.deleteproductlist,
    // addproductlist:productAction.addproductlist,
    // editproductlist:productAction.editproductlist,
    // getdictlistbytype:productAction.getdictlistbytype
    addindustry: industryAction.addindustry,
    uptindustry: industryAction.uptindustry,
    delindustry: industryAction.delindustry
  }
)
class Industry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routerList: [
        {
          name: "行业经营范围",
          url: "/"
        },
        {
          name: "行业类型",
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
          title: '行业类型名称',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: '公司类型名称',
          dataIndex: 'companyTypeName',
          key: 'companyTypeName',
        },
        {
          title: '创建时间',
          key: 'crtTime',
          dataIndex: 'crtTime',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
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
    // 行业类型列表
    this.props.industrypage(this.state.search)
    // this.props.productlist(this.state.search);
    //获取产品分类列表
    this.props.productclassify({
      page:1,
      limit:100
    });
    //获取开票额度
    // this.props.getdictlistbytype();
  }

  searchList = () => {
    this.setState({
      current:1
    },()=>{
       this.props.industrypage(Object.assign(this.state.search,{page:1}));
    })
   
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
      this.props.industrypage(this.state.search)
    })
  }



  componentWillReceiveProps(nextProps) {
    if (nextProps.industryReducer && nextProps.industryReducer.getIn(["industrypage","data"])) {
      let data = nextProps.industryReducer.getIn(["industrypage", "data"]);
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
        this.props.industrypage(this.state.search)
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

   
    this.setState({
      visible: false,
    },()=>{
      this.props.addindustry(e);
      // window.location.reload();
      setTimeout(()=>{
        this.props.industrypage({
          page: 1,
          limit: 20,
          companyTypeId: "",
          packageState: "",
          search: ""
        });
      },300)
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
    this.props.uptindustry(Object.assign(e,{id: this.state.editList.id}))
    this.setState({
      editVisible: false
    },()=>{
      setTimeout(()=>{
        this.props.industrypage({
          page: 1,
          limit: 20,
          companyTypeId: "",
          packageState: "",
          search: ""
        });
      },300)
    })
    //uptindustry
    // let data = e;
    // data.vatReturn = data.vatReturn 
    // // 添加 state ,  
    // this.state.productclassify.map((item,key)=>{
    //   if(item.id == e.companyTypeId){
    //   data.companyTypeName = item.name
    //   }
    // })
    // data.state = data.packageState;
    // data.packageId = this.state.editList.packageId;
    // data.taxpayerTypeId=123;
    // data.taxpayerTypeName ="123"
    // this.setState({
    //   editVisible: false,
    // },()=>{
    //   this.props.editproductlist(data);
    //   setTimeout(()=>{
    //     this.props.productlist(this.state.search)
    //   },300)
    // });
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
        this.props.delindustry({ id: record.id });
        setTimeout(() => {
          this.props.industrypage(this.state.search);
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
            <span>公司类别</span>
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

           

            <span>搜索</span>
            <Input onChange={this.onChange.bind(this, "搜索")} style={{ width: "20%", marginRight: "30px" }} placeholder="请输入商品名称" />
            <Button onClick={this.searchList} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
            {/* <Button style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>导出</Button> */}

            <br />
            <Button onClick={this.showModal} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px", marginTop: "15px" }}>新增行业类别</Button>
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
        <AddIndustry
          title="新增产品"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          productclassify={this.state.productclassify}
          getdictlistbytype={this.props.productReducer.getIn(["getdictlistbytype","data"])}
        >
        </AddIndustry>

        {/* 编辑 */}
        <EditIndustry
          title="编辑产品"
          visible={this.state.editVisible}
          onOk={this.editHandleOk}
          onCancel={this.editHandleCancel}
          data={this.state.editList}
          productclassify={this.state.productclassify}
          getdictlistbytype={this.props.productReducer.getIn(["getdictlistbytype","data"])}
        >

        </EditIndustry>

      </div>
    );
  }
}

export default Industry;
