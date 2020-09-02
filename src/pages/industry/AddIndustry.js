import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class AddIndustrys extends Component {
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

  render() {
    let { title, visible, onOk, onCancel, productclassify, getdictlistbytype } = this.props;
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

    return (
        <Modal
        wrapClassName="divModal"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
       {/* <div style={{height:"400px",width:"100%",overflow:"auto"}}> */}
       <Form {...formItemLayout}>
          <FormItem label="行业类型名称">
            {getFieldDecorator('label', {
              rules: [{required: true, message: '请输入行业类型名称'}],
            })(
              <Input placeholder="请输入行业类型名称"/>
            )}
          </FormItem>
          <FormItem label="公司类别">
            {getFieldDecorator('companyTypeId', {
              rules: [{required: true, message: '请选择公司类别'}],
            })(
              <Select placeholder="请选择公司类别" style={{width:"160px"}}>
                  {
                    productclassify.map((item,key)=>{
                    return <Option key={key} value={item.id}>{item.name}</Option>
                    })
                  }
              </Select>
            )}
          </FormItem>
        </Form>
      
       {/* </div> */}
       </Modal>
    );
  }
}

const AddIndustry = Form.create()(AddIndustrys);

export default AddIndustry;
