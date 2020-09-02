 import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker, message } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;
const { confirm } = Modal;


class EditIndustrys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validateStatus:"",
      help:""
    };
  }

  onOk = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if(values.taxRateSuf == ""){
          this.props.form.setFieldsValue({taxRatePre: ""})
          message.warning("实际汇率未填写完成")
      }
      if (err) return;//检查Form表单填写的数据是否满足rules的要求
      this.props.onOk(values);//调用父组件给的onOk方法并传入Form的参数。
      this.props.form.resetFields();//重置Form表单的内容
    })
  };
  onCancel = () => {
    this.props.form.resetFields();//重置Form表单的内容
    this.props.onCancel()//调用父组件给的方法
  };
  tax = (e)=>{
    console.log(e.target.value)
  }


  render() {
    let { title, visible, onOk, onCancel,data,productclassify ,getdictlistbytype} = this.props;
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
      console.log("传过来de shuju ",productclassify);
    
    return (
        <Modal
        wrapClassName="divModal"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
       
       <Form {...formItemLayout}>
          <FormItem label="行业类型名称">
            {getFieldDecorator('label', {initialValue:data.packageName,
              rules: [{required: true, message: '请输入行业类型名称'}],
            })(
              <Input placeholder="请输入行业类型名称"/>
            )}
          </FormItem>
          
         </Form>

       </Modal>
    );
  }
}

const EditIndustry = Form.create()(EditIndustrys);

export default EditIndustry;
;
