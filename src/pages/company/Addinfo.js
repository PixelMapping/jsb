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


class Addinfos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data!=this.props.data){

      let data=nextProps.data
      let obj={
        belong:data.belongValue,
        contact:data.contact,
        recommender:data.recommender,
        twoLevel:data.twoLevel,
        transform:data.transform
      }
      this.setVal(obj)
    }
  }
  setVal=(obj)=>{
    this.props.form.setFieldsValue(obj)

  };
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
    let { title, visible, onOk, onCancel, baseInfo , type, htype, getdictlistbyvalue,dataLists} = this.props;
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
       <FormItem label="归属地">
            {getFieldDecorator('belong', {
                initialValue:dataLists?  dataLists.belongValue : null,
              rules: [{required: true, message: '请选择归属地'}],
            })(
                <Select placeholder="请选择归属地">
                    {
                        getdictlistbyvalue? getdictlistbyvalue.map((item,key)=>{
                        return <Option key={key} value={item.value}>{item.label}</Option>
                        }) : ""
                    }
                </Select>
            )}
          </FormItem>
          <FormItem label="联系人">
            {getFieldDecorator('contact', {
                initialValue:dataLists?  dataLists.contact : "",
              rules: [{required: true, message: '请输入联系人'}],
            })(
                <Input placeholder={"请输入联系人"} ></Input>
            )}
          </FormItem>
          <FormItem label="推荐人">
            {getFieldDecorator('recommender', {
                initialValue:dataLists? dataLists.recommender : "",
              rules: [{required: true, message: '请输入推荐人'}],
            })(
                <Input placeholder={"请输入推荐人"} ></Input>
            )}
          </FormItem>
          <FormItem label="二级推荐人">
            {getFieldDecorator('twoLevel', {
                initialValue:dataLists? dataLists.twoLevel : "",
              rules: [{required: true, message: '请输入推荐人'}],
            })(
                <Input placeholder={"请输入推荐人"} ></Input>
            )}
          </FormItem>
          <FormItem label="转换人">
            {getFieldDecorator('transform', {
                initialValue:dataLists? dataLists.transform : "",
              rules: [{required: true, message: '请输入转换人'}],
            })(
                <Input placeholder={"请输入转换人"} ></Input>
            )}
          </FormItem>
         

        </Form>

       </Modal>
    );
  }
}

const Addinfo = Form.create()(Addinfos);

export default Addinfo;
