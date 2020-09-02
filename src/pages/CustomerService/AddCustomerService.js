import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker,Radio, Cascader } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import dataList from "./city";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class AddCustomerServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 1,
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

 

  onChange = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    let { title, visible, onOk, onCancel } = this.props;
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

       <Form {...formItemLayout}>
       <FormItem label="客服岗位">
            {getFieldDecorator('type', {initialValue:1,
              rules: [{required: true, message: '请输入分类简介'}],
            })(
                <Radio.Group  onChange={this.onChange} >
                <Radio value={1}>运营部</Radio>
                <Radio value={2}>园区拓展部</Radio>
              </Radio.Group>
            )}
          </FormItem>
          <FormItem label="客服姓名">
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请输入客服姓名'}],
            })(
              <Input placeholder="请输入客服姓名"/>
            )}
          </FormItem>
          <FormItem label="登录账号">
            {getFieldDecorator('username', {
              rules: [{required: true, message: '请输入登录账号'}],
            })(
                <Input placeholder="请输入登录账号"/>
            )}
          </FormItem>
          <FormItem label="初始密码">
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入初始密码'}],
            })(
                <Input.Password  placeholder="请输入初始密码"/>
            )}
          </FormItem>
          {
            this.state.value == 2 ? (
               
            <FormItem label="地区选择">
              {getFieldDecorator('area', {
              rules: [{required: true, message: '地区选择'}],
            })(
                <Cascader placeholder="请选择地区"
                              options={dataList}
                              changeOnSelect
                              placeholder="地区选择"
                          />  
            )}


            
            </FormItem> 
        
            ) : ""
          }
          </Form>
          <div className="tip">
              <p>说明 : </p>
              <div>
                  <p>1、运营部：负责用户公司创办后的审核流程，确保用户提交的创办信息真实可靠。</p>
                  <p>2、园区拓展部：负责为用户办理核名、工商、税务等流程。</p>
              </div>
          </div>
      
       </Modal>
    );
  }
}

const AddCustomerService = Form.create()(AddCustomerServices);

export default AddCustomerService;
