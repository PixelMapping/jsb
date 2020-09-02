import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import { compose } from "redux";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class PeopleRevises extends Component {
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
    let { title, visible, onOk, onCancel, baseInfo } = this.props;
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
        wrapClassName="divModals"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
       
       <Form {...formItemLayout}>
       <FormItem label="对接人姓名">
            {getFieldDecorator('dockName', {initialValue:baseInfo.dockName,
              rules: [{required: true, message: '请输入对接人姓名'}],
            })(
                <Input placeholder={"请输入对接人姓名"} ></Input>
            )}
          </FormItem>
          <FormItem label="对接人身份证">
            {getFieldDecorator('dockNum', {initialValue:baseInfo.dockNum,
              rules: [{required: true, message: '请输入对接人身份证'},
              {pattern: new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/),message:"请输入正确的身份证号码 !" }
              // /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
            ],
            })(
                <Input placeholder={"请输入对接人身份证"} ></Input>
            )}
          </FormItem>
          <FormItem label="对接人手机号">
            {getFieldDecorator('dockPhone', {initialValue:baseInfo.dockPhone,
              rules: [{required: true, message: '请输入对接人手机号'},
              {pattern: new RegExp(/^1[3456789]\d{9}$/),message:"请输入正确的手机号码 !" }
            ],
            })(
                <Input placeholder={"请输入对接人手机号"} ></Input>
            )}
          </FormItem>
          <FormItem label="对接人邮箱">
            {getFieldDecorator('dockEmail', {initialValue:baseInfo.dockEmail,
              rules: [{required: true, message: '请输入对接人邮箱'},
              {pattern: new RegExp(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/),message:"请输入正确的邮箱 !" }]
            })(
                <Input placeholder={"请输入对接人邮箱"} ></Input>
            )}
          </FormItem>
          <FormItem label="邮寄地址">
            {getFieldDecorator('address', {initialValue:baseInfo.address,
              rules: [{required: true, message: '请输入邮寄地址'},
            ],
            })(
                <Input placeholder={"请输入邮寄地址"} ></Input>
            )}
          </FormItem>
          {/* <FormItem label="消息内容">
            {getFieldDecorator('content', {
              rules: [{required: true, message: '请输入发送的消息内容'}],
            })(
                <TextArea placeholder={"请输入发送的消息内容"} rows={5}></TextArea>
            )}
          </FormItem> */}

        </Form>
      
   
       </Modal>
    );
  }
}

const PeopleRevise = Form.create()(PeopleRevises);

export default PeopleRevise;
