import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;
const { confirm } = Modal;


class EditProductClassify extends Component {
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
    let { title, visible, onOk, onCancel,data } = this.props;
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

      console.log("会显示de shuju",data)

    return (
        <Modal
        wrapClassName="divModal"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >
       <Form {...formItemLayout}>
       <FormItem label="分类名称">
            {getFieldDecorator('name', { initialValue:data.name,
              rules: [{required: true, message: '请输入分类名称'}],
            })(
              <Input placeholder="请输入分类名称"/>
            )}
          </FormItem>
          <FormItem label="分类排序">
            {getFieldDecorator('sort', { initialValue:data.sort,
              rules: [{required: true, message: '请输入分类排序'}],
            })(
                <Input placeholder="请输入分类排序"/>
            )}
          </FormItem>
          <FormItem label="分类简介">
            {getFieldDecorator('description', { initialValue:data.description,
              rules: [{required: true, message: '请输入分类简介'}],
            })(
              <TextArea placeholder="请输入分类简介"></TextArea>
            )}
          </FormItem></Form>
       </Modal>
    );
  }
}

const EditProductClassifyModal = Form.create()(EditProductClassify);

export default EditProductClassifyModal;
;
