import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class UpdateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  onOk = () => {
    this.props.form.validateFields((err, values) => {
        console.log("数据",values)
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
    let { title, visible, onOk, onCancel, data } = this.props;
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
      console.log("这是修改的订单详情,是父组件传过来的",data);

    return (
        <Modal
        wrapClassName="divModals"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
       
       <Form {...formItemLayout}>
          <FormItem label="修改后的价格">
            {getFieldDecorator('amount', {  initialValue:data.amount,
              rules: [{required: true, message: '请输入修改后的价格'}],
            })(
                <Input/>
            )}
          </FormItem>
          <FormItem label="赠送时长">
            {getFieldDecorator('giveMonth', {  initialValue:data.giveTime=="无" ? null : data.giveTime? data.giveTime.replace("个月","") : "",
              rules: [{required: false, message: '请输入赠送时长'}],
            })(
                <Input suffix="月" placeholder="请输入赠送时长" />
            )}
          </FormItem>

        </Form>
      
   
       </Modal>
    );
  }
}

const UpdateOrderModal = Form.create()(UpdateOrder);

export default UpdateOrderModal;
