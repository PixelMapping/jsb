import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon, Cascader } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import companyAction from "../../redux/actions/companyAction";

const { Option } = Select;
const { RangePicker } = DatePicker
//legaldetail

@connect(
  ({ companyReducer, productReducer }) => ({ companyReducer, productReducer }),
  {

    legaldetail: companyAction.legaldetail,
    getcompanybylegalid:companyAction.getcompanybylegalid,
    locklegal:companyAction.locklegal
  }
)
class CorporateLibraryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      legalId: "",
      detail: "",
      routerList: [
        {
          name: "首页",
          url: "/"
        },
        {
          name: "法人库",
          url: "/order"
        },
        {
          name: "法人库详情",
          url: "/order"
        },
      ],
      columns: [
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
          render: text => text,
        },
        {
          title: '公司名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '公司类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '公司地区',
          key: 'area',
            dataIndex: 'area',
        },
        {
          title: '注册资金',
          key: 'registeredCapital',
          dataIndex:"registeredCapital"
        },
        {
          title: '纳税类型',
          key: 'taxpayerTypeName',
          dataIndex:"taxpayerTypeName"
          
        },
        {
          title: '申请日期',
          key: 'submitEstablishTime',
          dataIndex:"submitEstablishTime"
        },
        {
          title: '公司状态',
          key: 'companyStatusName',
          dataIndex:"companyStatusName"
        },
      ],
      data: [
      ],
    }
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    this.setState({
      legalId: this.props.match.params.id
    }, () => {
      //获取法人详情
      this.props.legaldetail({
        legalId: this.state.legalId
      })
      //获取table
      this.props.getcompanybylegalid({
        legalId: this.state.legalId,
        page:1,
        limit:1000
      })
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.companyReducer.getIn(["legaldetail"])) {
      console.log("法人详情", nextProps.companyReducer.getIn(["legaldetail"]))
      this.setState({
        detail: nextProps.companyReducer.getIn(["legaldetail", "data"])
      })
    }
    //getcompanybylegalid
    if (nextProps.companyReducer.getIn(["getcompanybylegalid"])) {
      console.log("法人详情123", nextProps.companyReducer.getIn(["getcompanybylegalid"]))
      let data = nextProps.companyReducer.getIn(["getcompanybylegalid", "data","rows"])
      for(let i=0; i<data.length; i++){
          data[i].key = i+1;
      }
      this.setState({
        data
      })
    }
  }
  //锁定法人操作
  locklegal = ()=>{
    this.props.locklegal({
      legalId: this.state.legalId
    })
  }


  render() {
    let { routerList, detail } = this.state
    return (
      <div >
        <BreadeHeader routerList={routerList}></BreadeHeader>
        {/* 法人详情内容 */}
        <div className="baseContent">
          {/* top1 */}
          <div className="baseName">
            <div>
              <span>{detail.legalName}</span>
              <Button  onClick={this.locklegal} type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>锁定</Button>
            </div>
            <div>
              <span>创建人: {detail.crtName}</span>
              <span>创建时间 : {detail.crtTime}</span>
            </div>
          </div>
          {/* top2 */}
          <div className="baseTop">
            <div>
              <span>拥有公司</span>
              <p>{detail.ownCount}家</p>
            </div>
            <div>
              <span>审核中的公司</span>
              <p>{detail.examineComCount}家</p>
            </div>
            <div>
              <span>设立中的公司</span>
              <p>{detail.establishComCount}家</p>
            </div>
            <div>
              <span>公司所在地区</span>
              <p>{detail.areaCount}家</p>
            </div>
          </div>
          {/* top3 */}
          <div className="baseInfo">
            <p>基本信息</p>
            <div className="baseInfo-list">
              <div className="baseInfo-list-content">
                <span>法人姓名 : {detail.legalName}</span><br />
                <span>法人邮箱 : {detail.legalEmail}</span>
              </div>
              <div className="baseInfo-list-content">
                <span>法人手机 : {detail.legalPhone}</span><br />
                <span>法人证件 : {detail.cardF && detail.cardZ ? "已提交" : "未提交"}</span>
              </div>
              <div className="baseInfo-list-content">
                <span> </span><br />
                <span>人脸验证 : {detail.faceStatus == 1 ? "未认证" : "认证通过"}</span>
              </div>
            </div>
            {/* pic */}
            <div className="basePic">
              {/* 身份证 */}
              <div>
                <img src={detail.cardZ ? detail.cardZ : require("../../assets/image/sfz.png")} alt="" />
                <p>身份证正面</p>
              </div>

              <div>
                <img src={detail.cardF ? detail.cardF : require("../../assets/image/sfz.png")} alt="" />
                <p>身份证反面</p>
              </div>
            </div>
          </div>

          {/* top4 */}
          <div className="baseInfo lastInfo">
            <p>{detail.legalName}的公司列表</p>
            <div className="baseInfo-table">
              {/* table */}
              <Table bordered columns={this.state.columns} dataSource={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CorporateLibraryDetail;
