import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch,Modal, Form, DatePicker, Cascader } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import { compose } from "redux";
import moment from "moment"
import data from "./city";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item ;
const { TextArea } = Input;


class TwoModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

//   componentWillMount(){

//   }

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

  
  handleSelectedPosition = (value, selectedOptions) => {
    console.log(value, selectedOptions)
    this.props.getregionbypid({
        pId: value[value.length - 1]
    });
    //    setTimeout(()=>{
    //        this.set
    //    },300)


    this.loadData(selectedOptions)

}
loadData = selectedOptions => {
    console.log("123123", selectedOptions)

    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [
            {
                label: `${targetOption.label} Dynamic 1`,
                value: 'dynamic1',
            },
            {
                label: `${targetOption.label} Dynamic 2`,
                value: 'dynamic2',
            },
        ];
        this.setState({
            options: [...this.state.options],
        });
    }, 1000);
};

//   disabledDate = (current) => {
//     return current < moment(new Date('2018/07/15')) || current > moment().endOf('day')
//   }

  render() {
    let { title, visible, onOk, onCancel, baseInfo , type, htype, getmanagerlist} = this.props;
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
       <FormItem label="经办人">
            {getFieldDecorator('typeName', {
                // initialValue:baseInfo.companyType,
              rules: [{required: true, message: '请选择经办人'}],
            })(
                <Select placeholder="请选择经办人">
                    {
                    getmanagerlist ? getmanagerlist.map((item,key)=>{
                    return <Option key={key} value={item.value}>{item.label}</Option>
                    }) : ""
                }
                </Select>
            )}
          </FormItem>
          <FormItem label="地区选择">
            {getFieldDecorator('totalInvoice', {
                // initialValue:baseInfo.quota,
              rules: [{required: true, message: '地区选择'}],
            })(
                // <Input placeholder={"请输入开票额度"} ></Input>
                 <Cascader
                            // size="small"
                            // style={{ width: "260px" }}
                            options={data}
                            // onChange={this.handleSelectedPosition.bind(this)}
                            // loadData={this.loadData}
                            changeOnSelect
                            placeholder="地区选择"
                        /> 
            )}
          </FormItem>
        </Form>
       </Modal>
    );
  }
}

const TwoModal = Form.create()(TwoModals);

export default TwoModal;
