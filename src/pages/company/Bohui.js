import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class Bohuis extends Component {
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

      console.log("资料项", data)

    return (
        <Modal
        wrapClassName="divModals"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
       
       <Form {...formItemLayout}>
       <FormItem label="驳回项">
            {getFieldDecorator('id', {
              rules: [{required: true, message: '请选择驳回项'}],
            })(
              <Select
              mode="tags"
              placeholder="请选择驳回项"
              style={{ width: '100%' }}
            >
              {
                data ? data.map((item,key)=>{
                  return   <Option key={key} value={item.value}>{item.label}</Option>
                }) : ""
              }
            </Select>
            )}
          </FormItem>
          
          <FormItem label="驳回理由">
            {getFieldDecorator('content', {
              rules: [{required: true, message: '请输入驳回理由'}],
            })(
                <TextArea placeholder={"请输入驳回理由"} rows={5}></TextArea>
            )}
          </FormItem>

        </Form>
      
   
       </Modal>
    );
  }
}

const Bohui = Form.create()(Bohuis);

export default Bohui;
