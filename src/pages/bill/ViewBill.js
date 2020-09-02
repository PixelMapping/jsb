import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, Form, DatePicker, message, Upload, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import config from "../../config/base.conf"
import moment from "moment"
import Zmage from 'react-zmage'



const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;


class ViewBills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [],
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
        let { title, visible, onOk, onCancel, data, picData } = this.props;
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
            // headers: {
            //     authorization: 'authorization-text',
            // },
            data: {
                type: 2
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    // message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    // message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        if(picData.invoiceList){
            let data = picData.invoiceList;
            let pic=[];
            for(let i=0; i< data.length; i++){
                pic.push({
                    src: data[i],
                    alt:""
                })
            }
            console.log("123",pic)
        }

        return (
            <Modal
                wrapClassName="divModal"
                title={title}
                visible={visible}
                onOk={this.onOk}
                onCancel={onCancel}
            >
                <Form {...formItemLayout}>
                    {/* <FormItem label="发票代码">
                        {getFieldDecorator('invoiceCode', {
                            initialValue: picData ? picData.invoiceCode : "",
                            rules: [{ required: true, message: '请输入发票代码' }],
                        })(
                            <Input disabled placeholder="请输入发票代码" />
                        )}
                    </FormItem>
                    <FormItem label="发票号码">
                        {getFieldDecorator('invoiceNumber', {
                            initialValue: picData ? picData.invoiceNumber : "",
                            rules: [{ required: true, message: '请输入发票号码' }],
                        })(
                            <Input disabled placeholder="请输入发票号码" />
                        )}
                    </FormItem> */}
                    <FormItem label="开票日期">
                        {getFieldDecorator('billingTime', {
                            initialValue: picData ? moment(picData.billingTime, 'YYYY-MM-DD') : "",
                            rules: [{ required: true, message: '请选择开票日期' }],
                        })(
                            <DatePicker disabled placeholder="请选择开票日期" />
                        )}
                    </FormItem>
                    <FormItem label="名称">
                        {getFieldDecorator('productName3', {
                            initialValue: data ? data.customerName : "",
                            rules: [{ required: true, message: '请选择开票日期' }],
                        })(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem label="纳税人识别号">
                        {getFieldDecorator('productName4', {
                            initialValue: data ? data.txpayerNumber : "",
                            rules: [{ required: true, message: '请输入分类简介' }],
                        })(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem label="开户行及账号">
                        {getFieldDecorator('productName5', {
                            initialValue: data ? data.openingBank + data.bankAccount : "",
                            rules: [{ required: true, message: '请输入分类简介' }],
                        })(
                            <TextArea disabled />
                        )}
                    </FormItem>
                    <FormItem label="地址电话">
                        {getFieldDecorator('productName6', {
                            initialValue: data ? data.address + data.officeTel : "",
                            rules: [{ required: true, message: '请输入分类简介' }],
                        })(
                            <TextArea disabled />
                        )}
                    </FormItem>

                    <FormItem label="发票图片">
                        {getFieldDecorator('invoiceList', {
                            rules: [{ required: false, message: '请上传发票图片' }],
                        })(
                            <div className="pic" style={{width:"273px",height:"168px"}}>
                                {
                                    picData.invoiceList ? <Zmage
                                    src={picData.invoiceList[0]}
                                    alt="展示序列图片"
                                    set={ picData.invoiceList.map((item,index)=>{
                                        return {
                                            src: item,
                                            alt:""
                                        }
                                    }) }
                                /> :""
                                }
                            </div>
                        )}
                    </FormItem>
                </Form>

            </Modal>
        );
    }
}

const ViewBill = Form.create()(ViewBills);

export default ViewBill;
