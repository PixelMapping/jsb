import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, Form, DatePicker,message, Upload, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import config from "../../config/base.conf"
import moment from "moment"



const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;


class OpenBills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList:[],
        };
    }

    componentDidMount(){
        this.props.form.setFieldsValue({type:'1'})
    }

    onOk = () => {
        this.props.form.validateFields((err, values) => {
            if (err) return;//检查Form表单填写的数据是否满足rules的要求
            console.log(values)
            this.props.onOk(values);//调用父组件给的onOk方法并传入Form的参数。
            this.props.form.resetFields();//重置Form表单的内容
        })
    };
    onCancel = () => {
        this.props.form.resetFields();//重置Form表单的内容
        this.props.onCancel()//调用父组件给的方法
    };

      disabledDate = (current) => {
        let curDate = new Date();
        var preDate = new Date(curDate.getTime() ); //前一天
    return current >= moment(preDate)
  }

    render() {
        let { title, visible, onOk, onCancel,data } = this.props;
        const { getFieldDecorator } = this.props.form;
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

        const props = {
            name: 'file',
            action: `${config.baseUrl}/simpleTax/document/upload`,
            multiple: true,
            headers:{
                Authorization: localStorage.getItem("token"),
                "User-Client" : "web"
            },
            data:{
                type:2
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    console.log("done", info);
                    // message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    // message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        // console.log("娃哈哈",this.state.fileList)

        return (
            <Modal
                wrapClassName="divModal"
                title={title}
                visible={visible}
                onOk={this.onOk}
                onCancel={onCancel}
            >
                <Form {...formItemLayout}>
                   
                    <FormItem label="开票日期">
                        {getFieldDecorator('billingTime', {
                            rules: [{ required: true, message: '请选择开票日期' }],
                        })(
                            <DatePicker disabledDate={this.disabledDate} placeholder="请选择开票日期" />
                        )}
                    </FormItem>
                    
                    
                    <FormItem label="发票图片">
                        {getFieldDecorator('invoiceList', {
                            rules: [{ required: true, message: '请上传发票图片' }],
                        })(
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> 上传图片
                                </Button>
                                <p style={{color:"red",fontSize:"12px"}}>* 按住 Ctrl 可以多选</p>
                            </Upload>
                        )}
                    </FormItem>
                    <Form.Item label="发票类型">
                    {getFieldDecorator('type')(
                        <Select placeholder="Please select a country">
                        <Option value="1">纸质发票</Option>
                        <Option value="2">电子发票</Option>
                        </Select>,
                    )}
                    </Form.Item>
                </Form>

            </Modal>
        );
    }
}

const OpenBill = Form.create()(OpenBills);

export default OpenBill;
