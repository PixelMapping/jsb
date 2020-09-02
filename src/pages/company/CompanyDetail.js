import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, DatePicker, Menu, Dropdown, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import moment from "moment";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import companyAction from "../../redux/actions/companyAction";
import productAction from "../../redux/actions/productAction";
//
import CompanyListOne from "./CompanyListOne";
import CompanyListOneRepeat from "./CompanyListOneRepeat"
import CompanyListTwo from "./CompanyListTwo";
import CompanyListThree from "./CompanyListThree";
import PeopleRevise from "./PeopleRevise"
import PeopleBase from "./PeopleBase"


const { Option } = Select;
const { RangePicker } = DatePicker


@connect(
    ({ companyReducer, productReducer }) => ({ companyReducer, productReducer }),
    {
        // companyweblist: companyAction.companyweblist,
        // companydetailweb: companyAction.companydetailweb,
        // //获取公司类型
        productclassify: productAction.productclassify,
        //基本信息,对接人信息
        getbasiccompany: companyAction.getbasiccompany,
        //操作记录
        getcompanyoperaterecord: companyAction.getcompanyoperaterecord,
        //头部返回信息
        companyoperatedetail: companyAction.companyoperatedetail,
        //补全资料信息
        getcompletedata: companyAction.getcompletedata,
        //修改对接人信息
        updatedock: companyAction.updatedock,
        //设立资料 
        getdatatype: companyAction.getdatatype,
        //获取上传资料
        datalist: companyAction.datalist,
        //工商信息
        getdata: companyAction.getdata,
        //发票统计信息
        getinvoiceinfo: companyAction.getinvoiceinfo,
        //行业下拉列表
        industrylist: companyAction.industrylist,
        //修改基本信息
        updatebasiccompany: companyAction.updatebasiccompany,
        //通知记录
        noticelist: companyAction.noticelist
    }
)
class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailId: "",
            companyStatus: "",
            //id 的基本信息对接人信息
            getbasiccompany: "",
            //操作记录
            getcompanyoperaterecord: "",
            //头部返回信息
            headerData: "",
            //资料补全信息
            getcompletedata: "",
            peopleReviseVisible: false,
            peopleBaseVisible: false,
            type: "",
            htype: "",


        };
    }

    componentWillMount() {
        //id
        //公司列表
        let data = this.props.companyReducer.getIn(["companyweblist", "data", "rows"]);
        if(data){
            for (let i = 0; i < data.length; i++) {
                if (this.props.match.params.data == data[i].companyId) {
                    this.setState({
                        detailId: this.props.match.params.data,
                        companyStatus: data[i].companyStatus
                    })
                }
            }
        }
       
        //获取公司操作基本信息,对接人信息
        this.props.getbasiccompany({
            companyId: this.props.match.params.data
        })
        //操作记录
        this.props.getcompanyoperaterecord({
            companyId: this.props.match.params.data
        })
        //头部返回信息
        this.props.companyoperatedetail({
            companyId: this.props.match.params.data
        })
        //补全资料信息
        this.props.getcompletedata({
            companyId: this.props.match.params.data
        })
        //设立资料
        this.props.getdatatype({
            companyId: this.props.match.params.data
        })
        //上传资料
        this.props.datalist({
            companyId: this.props.match.params.data
        })
        //获取工商信息
        this.props.getdata({
            id: this.props.match.params.data
        })
        //获取发票统计信息
        this.props.getinvoiceinfo({
            companyId: this.props.match.params.data
        })

        //获取 公司类型
        this.props.productclassify({
            page: 1,
            limit: 100
        });
        //行业下拉
        this.props.industrylist({
            companyId: this.props.match.params.data
        });
        //获取通知记录
        this.props.noticelist({
            businessId: this.props.match.params.data,
            page: 1,
            limit: 100
        })

    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.companyReducer.getIn(["getbasiccompany", "data"])) {

            this.setState({
                getbasiccompany: nextProps.companyReducer.getIn(["getbasiccompany", "data"]),
                companyStatus: nextProps.companyReducer.getIn(["getbasiccompany", "data", "companyStatus"])

            })
        }
        if (nextProps.companyReducer.getIn(["getcompanyoperaterecord"])) {
            //未传props
            this.setState({
                getcompanyoperaterecord: nextProps.companyReducer.getIn(["getcompanyoperaterecord", "data"])
            })
        }
        //头部返回信息监听
        if (nextProps.companyReducer.getIn(["companyoperatedetail", "data"])) {
            this.setState({
                headerData: nextProps.companyReducer.getIn(["companyoperatedetail", "data"])
            })
        }
        //补全资料信息
        if (nextProps.companyReducer.getIn(["getcompletedata"])) {
            this.setState({
                getcompletedata: nextProps.companyReducer.getIn(["getcompletedata", "data"])
            })
        }
        //公司类型
        if (nextProps.productReducer.getIn(["productclassify"])) {
            this.setState({
                type: nextProps.productReducer.getIn(["productclassify", "data", "rows"])
            })
        }

        //获取行业下拉列表
        if (nextProps.companyReducer.getIn(["industrylist"])) {

            this.setState({
                htype: nextProps.companyReducer.getIn(["industrylist", "data"])
            })
        }
    }






    // 修改状态的方法
    //状态一旦修改,数据需要重新获取

    changeState = (state) => {
        this.setState({
            companyStatus: state
        }, () => {
            //获取公司操作基本信息,对接人信息
            this.props.getbasiccompany({
                companyId: this.props.match.params.data
            })
            //操作记录
            this.props.getcompanyoperaterecord({
                companyId: this.props.match.params.data
            })
            //头部返回信息
            this.props.companyoperatedetail({
                companyId: this.props.match.params.data
            })
            //补全资料信息
            this.props.getcompletedata({
                companyId: this.props.match.params.data
            })
            //设立资料
            this.props.getdatatype({
                companyId: this.props.match.params.data
            })
            //上传资料
            this.props.datalist({
                companyId: this.props.match.params.data
            })
            //获取工商信息
            this.props.getdata({
                id: this.props.match.params.data
            })
        })
    }


    //修改对接人信息
    updatedock = () => {
        this.setState({
            peopleReviseVisible: true
        })
    }

    //对接人信息修改
    peopleReviseHandleOk = e => {
        // this.props.form.validateFields((err, values) => {
        //     if (err) return;//检查Form表单填写的数据是否满足rules的要求
        this.setState({
            peopleReviseVisible: false
        }, () => {
            //对接人信息修改
            this.props.updatedock(
                Object.assign({ id: this.state.getbasiccompany.companyId }, e)
            )
            //对接人信息修改后更新
            setTimeout(() => {
                this.props.getbasiccompany({
                    companyId: this.props.match.params.data
                })
            }, 300)
        })
        // })
    };

    peopleReviseHandleCancel = e => {
        this.setState({
            peopleReviseVisible: false
        });
    };



    //基本信息
    //修改对基本信息
    updateBase = () => {
        this.setState({
            peopleBaseVisible: true
        })
    }

    //对接人信息修改
    peopleBaseHandleOk = e => {
        // 数据格式修改
        let data = e;
        //设置行业id
        // data.industryId
        this.state.htype.map((item, key) => {
            if (item.label == data.industryName) {
                data.industryId = item.value
            }
        })
        //设置公司类型 id
        this.state.type.map((item, key) => {
            if (item.name == data.typeName) {
                data.typeId = item.id
            }
        })
        if (data.invoiceBeginTime) {
            data.invoiceBeginTime = data.invoiceBeginTime.format("YYYY-MM-DD")
        } else {
            data.invoiceBeginTime = ""
        }


        this.setState({
            peopleBaseVisible: false
        }, () => {
            // 触发修改的接口
            this.props.updatebasiccompany(
                Object.assign({ companyId: this.props.match.params.data }, data)
            )
            setTimeout(() => {
                this.props.getbasiccompany({
                    companyId: this.props.match.params.data
                })
            }, 300)
        })
    };

    peopleBaseHandleCancel = e => {
        // console.log("修改完的基本信息",e);
        this.setState({
            peopleBaseVisible: false
        });
    };






    render() {
        let { companyStatus, getbasiccompany, getcompanyoperaterecord, headerData, getcompletedata } = this.state
        return (
            <div className="companyState">
                {/* 根据不同的状态加载不同的组件 */}
                {/* 
                companyStatus :   1:待设立 2:审核中 2-1:复审核中 3:设立中 4:已设立’
          */}
                {
                    // companyStatus == "1" ? <CompanyListOne headerData={headerData} baseInfo = {getbasiccompany} getcompanyoperaterecord={getcompanyoperaterecord}></CompanyListOne> : ""
                }
                {
                    companyStatus == "2" ? <CompanyListOne updateBase={this.updateBase} updatedock={this.updatedock} changeState={this.changeState} headerData={headerData} baseInfo={getbasiccompany} getcompanyoperaterecord={getcompanyoperaterecord}></CompanyListOne> : ""
                }
                {
                    companyStatus == "2-1" ? <CompanyListOneRepeat updateBase={this.updateBase} updatedock={this.updatedock} getcompletedata={getcompletedata} changeState={this.changeState} headerData={headerData} baseInfo={getbasiccompany} getcompanyoperaterecord={getcompanyoperaterecord}></CompanyListOneRepeat> : ""
                }
                {
                    companyStatus == "3" ? <CompanyListTwo updateBase={this.updateBase} updatedock={this.updatedock} changeState={this.changeState} getcompletedata={getcompletedata} headerData={headerData} baseInfo={getbasiccompany} getcompanyoperaterecord={getcompanyoperaterecord}></CompanyListTwo> : ""
                }
                {
                    companyStatus == "4" ? <CompanyListThree updateBase={this.updateBase} updatedock={this.updatedock} changeState={this.changeState} headerData={headerData} baseInfo={getbasiccompany} getcompanyoperaterecord={getcompanyoperaterecord}></CompanyListThree> : ""
                }

                <PeopleRevise
                    title="修改对接人信息"
                    visible={this.state.peopleReviseVisible}
                    onOk={this.peopleReviseHandleOk}
                    onCancel={this.peopleReviseHandleCancel}
                    baseInfo={this.state.getbasiccompany}
                >
                </PeopleRevise>
                
                <PeopleBase
                    title="修改基本信息"
                    visible={this.state.peopleBaseVisible}
                    onOk={this.peopleBaseHandleOk}
                    onCancel={this.peopleBaseHandleCancel}
                    baseInfo={this.state.getbasiccompany}
                    type={this.state.type} //公司类型
                    htype={this.state.htype} //行业类型
                    companyStatus={companyStatus}
                ></PeopleBase>
            </div>
        );
    }
}

export default CompanyDetail;
