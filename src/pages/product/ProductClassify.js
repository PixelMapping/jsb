import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import AddProductClassify from  "./AddProductClassify";
import  EditProductClassify from  "./EditProductClassify";
import { connect } from "react-redux";
import productAction from "../../redux/actions/productAction";

const { Option } = Select
// key: '1',
//       name: '套餐一',
//       type: 32,
//       number: 'New York No. 1 Lake Park',
//       state: ['nice', 'developer'],
//       time:"2019.01.20",
//       action:"操作";
  

@connect(
  ({ productReducer }) => ({ productReducer }),
  {
    productclassify: productAction.productclassify,
    updatecompanytype: productAction.updatecompanytype,
    addcompanytype:productAction.addcompanytype,
    deletecompanytype:productAction.deletecompanytype
  }
)
class ProductClassify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total:"",
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "产品分类",
          url: "/product"
        }
      ],
      page:{
        page:1,
        limit:5
      },
      data:[],
      editList:{},
      columns:[
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
          render: text => text,
        },
        {
          title: '分类名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '分类排序',
          dataIndex: 'sort',
          key: 'sort',
        },
        {
            title: '添加时间',
            key: 'crtTime',
            dataIndex:"crtTime"
          },
          {
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <>
              <span className="btn-diy">
                 <Button onClick={this.editShowModal.bind(this,record)} style={{backgroundColor:"#17A2A9",color:"#FFF",marginRight:"10px"}}>编辑</Button>
              </span>
              <Button onClick={this.showDeleteConfirm.bind(this,record)} type="danger" style={{backgroundColor:"#FF4D4F",color:"#FFF",marginRight:"10px"}}>删除</Button>
              </>
              
            ),
          },
      ]
    };
  }

  componentWillMount(){
    this.props.productclassify(this.state.page);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.productReducer.getIn(["productclassify"])){
       console.log("123",nextProps.productReducer.getIn(["productclassify"]));
       let data = nextProps.productReducer.getIn(["productclassify","data","rows"]);
        for(let i=0 ; i<data.length; i++){
             data[i].key = i+1
        }



       this.setState({
         total:nextProps.productReducer.getIn(["productclassify","data","total"]),
         data
       })
    }
  }

  paginationChange = (current)=>{
    console.log(current)
    this.setState({
      page: {
        page: current,
        limit: this.state.page.limit,
      },
    },()=>{
      // 获取分页数据
      this.props.productclassify(this.state.page)
    })
  }

   // 添加 modal 用的方法
   showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log("新增的玩意",e);
    this.props.addcompanytype(e);
    setTimeout(()=>{
      this.props.productclassify(this.state.page)
    },300)
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  // 编辑 modal 用的方法
  editShowModal = (record) => {
    console.log("待编辑的扩列表",record)
    this.setState({
      editVisible: true,
      editList:record
    });
  };

  editHandleOk = e => {
    console.log("编辑的数据,哈哈哈",e);
    this.setState({
      editVisible: false,
    },()=>{
      let data = e;
      data.id = this.state.editList.id
      this.props.updatecompanytype(data);
      setTimeout(()=>{
        this.props.productclassify(this.state.page)
      },300)
    });
  };

  editHandleCancel = e => {
    console.log(e);
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
    onOk: ()=> {
      this.props.deletecompanytype({id:record.id});
      setTimeout(()=>{
        this.props.productclassify(this.state.page);
      },300)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

  render() {
    let { routerList } = this.state;

    return (
      <div className="product-container">
        {/* 产品列表 */}
        {/* 头部 */}
        <BreadeHeader routerList={routerList} />
        {/* 内容部分 */}
      {/* table 部分 */}
      
            <div className="table-content table-content-2">
            <Button onClick={this.showModal} style={{backgroundColor:"#17A2A9",color:"#FFF",marginLeft:"10px",marginTop:"15px",marginBottom:"15px"}}>新增分类</Button>
                {/* 123 */}
                <Table 
                pagination={{
                  total: this.state.total,
                  showTotal: (total) => `共 ${total} 条`,
                  onChange: (current) => this.paginationChange(current),
                  pageSize: this.state.page.limit,
                }}
                bordered columns={this.state.columns} dataSource={this.state.data} />
            </div>

{/* 新增产品 */}
<AddProductClassify
          title="新增分类"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        </AddProductClassify>

        {/* 编辑 */}
        <EditProductClassify 
         title="编辑分类"
         visible={this.state.editVisible}
         onOk={this.editHandleOk}
         onCancel={this.editHandleCancel}
         data = {this.state.editList}
        >

        </EditProductClassify>

      </div>
    );
  }
}

export default ProductClassify;
