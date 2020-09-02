import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import { compose } from "redux";
import moment from "moment"

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class PeopleBases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  onOk = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;//检查Form表单填写的数据是否满足rules的要求
      this.props.onOk(values);//调用父组件给的onOk方法并传入Form的参数。
      this.props.form.resetFields();//重置Form表单的内容
    })
  };
  onCancel = () => {
    this.props.form.resetFields();//重置Form表单的内容
    this.props.onCancel()//调用父组件给的方法
  };

//   disabledDate = (current) => {
//     return current < moment(new Date('2018/07/15')) || current > moment().endOf('day')
//   }

  render() {
    let { title, visible, onOk, onCancel, baseInfo , type, htype} = this.props;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
//       console.log("基本信息,", baseInfo)
   


    return (
        <Modal
        wrapClassName="divModals"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
       
       <Form {...formItemLayout}>
       <FormItem label="公司名称">
            {getFieldDecorator('companyName', {initialValue:baseInfo.companyName,
              rules: [{required: true, message: '请输入公司名称'}],
            })(
                <Input placeholder={"请输入公司名称"} ></Input>
            )}
          </FormItem>
          {
            this.props.companyStatus=='2'||this.props.companyStatus=='2-1'&&(
              <FormItem label="公司类型">
              {getFieldDecorator('typeName', {initialValue:baseInfo.companyType,
                rules: [{required: true, message: '请选择公司类型'}],
              })(
                  <Select>
                      {
                          type? type.map((item,key)=>{
                          return <Option key={key} value={item.name}>{item.name}</Option>
                          }) : ""
                      }
                  </Select>
              )}
            </FormItem>
            )
          }
      
          <FormItem label="开票额度">
            {getFieldDecorator('totalInvoice', {initialValue:baseInfo.quota,
              rules: [{required: true, message: '请输入开票额度'}],
            })(
                <Input placeholder={"请输入开票额度"} ></Input>
            )}
          </FormItem>
          <FormItem label="注册资本">
            {getFieldDecorator('registeredCapital', {initialValue:baseInfo.registeredCapital,
              rules: [{required: true, message: '请输入注册资本'}],
            })(
                <Input placeholder={"请输入注册资本"} ></Input>
            )}
          </FormItem>
          <FormItem label="行业名称">
            {getFieldDecorator('industryName', {initialValue:baseInfo.industryName,
              rules: [{required: true, message: '请选择行业名称'}],
            })(
               <Select>
                   {
                       htype ? htype.map((item,key)=>{
                       return <Option key={key} value={item.label}>{item.label}</Option>
                       }) : ""
                   }
               </Select>
            )}
          </FormItem>
          <FormItem label="增值税返还">
            {getFieldDecorator('vatReturn', {initialValue:baseInfo.vatReturn,
              rules: [{required: true, message: '请输入增值税返还'}],
            })(
                <Input placeholder={"请输入增值税返还"} ></Input>
            )}
          </FormItem>
          <FormItem label="纳税人类型">
            {getFieldDecorator('taxpayerType', {initialValue:baseInfo.taxpayerType,
              rules: [{required: true, message: '请选择纳税人类型'}],
            })(
                <Select>
                    <Option value={"1"}>一般纳税人</Option>
                    <Option value={"2"}>小规模纳税人</Option>
                </Select>
            )}
          </FormItem>
          <FormItem label="开票开始时间">
            {getFieldDecorator('invoiceBeginTime', {
                initialValue: baseInfo.invoiceBeginTime?   moment(baseInfo.invoiceBeginTime,"YYYY-MM-DD") :  null,
              rules: [{required: false, message: '请选择开票时间'}],
            })(
                <DatePicker   placeholder="请选择开票时间"
                // disabledDate ={this.disabledDate}
                />
            )}
          </FormItem>

        </Form>
{/*       
        <span>开票开始时间 : { baseInfo.invoiceBeginTime }</span>
                                <span>开票截止时间 : { baseInfo.invoiceEndTime } </span> */}
       </Modal>
    );
  }
}

const PeopleBase = Form.create()(PeopleBases);

export default PeopleBase;
