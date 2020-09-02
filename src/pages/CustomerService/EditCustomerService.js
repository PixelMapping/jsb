import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker,Radio,Cascader } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import dataList from "./city";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class EditCustomerServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: 1,
        stt:false
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
    this.setState({
      value: e.target.value,
    });
  };
  onChanges = e=>{
    // if(e == 2){
    //     this.setState({
    //       stt: true
    //     })
    // }else{
    //   this.setState({
    //     stt: false
    //   })
    // }
  }

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
      let isShow = data.TYPE

    return (
        <Modal
        wrapClassName="divModal"
        title={title}
        visible={visible}
        onOk={this.onOk}
        onCancel={onCancel}
      >

       <Form {...formItemLayout}>
          <FormItem label="客服姓名">
            {getFieldDecorator('name', { initialValue: data.name,
              rules: [{required: true, message: '请输入客服姓名'}],
            })(
              <Input placeholder="请输入客服姓名"/>
            )}
          </FormItem>
          {/* <FormItem label="登录账号">
            {getFieldDecorator('num', { initialValue:data.username,
              rules: [{required: true, message: '请输入登录账号'}],
            })(
                <Input disabled placeholder="请输入登录账号"/>
            )}
          </FormItem> */}
          <FormItem label="部门">
            {getFieldDecorator('type', {initialValue: data.TYPE,
              rules: [{required: true, message: '请输入分类排序'}],
            })(
                <Select onChange={(e)=>{
                    isShow = e
                }}>
                  <Option value={"1"}>运营部</Option>
                  <Option value={"2"}>园区拓展部</Option>
                </Select>
            )}
          </FormItem>

          {
            data.TYPE == "2" && isShow == "2" ? <FormItem className={isShow ==2? "" : "isShow"} label="地区选择">
              {getFieldDecorator('types', { initialValue: [],
              rules: [{required: true, message: '请输入分类排序'}],
            })(
                <Cascader placeholder="请选择地区"
                              options={dataList}
                              changeOnSelect
                              placeholder="地区选择"
                          />  
            )}


            
            </FormItem> : ""
          }
          </Form>
          
      
       </Modal>
    );
  }
}

const EditCustomerService = Form.create()(EditCustomerServices);

export default EditCustomerService;
