import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb, Select, Input, Button, Switch, Modal, Form, DatePicker,message, Upload, Icon } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";

const { Option } = Select;
const { MonthPicker, RangePicker, TimePicker } = DatePicker;
const FormItem = Form.Item;
const { TextArea } = Input;


class Expresss extends Component {
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

    

        return (
            <Modal
                wrapClassName="divModal"
                title={title}
                visible={visible}
                onOk={this.onOk}
                onCancel={onCancel}
            >
                <Form {...formItemLayout}>
                    <FormItem label="快递单号">
                        {getFieldDecorator('expressNumber', {
                            rules: [{ required: true, message: '请输入快递单号' }],
                        })(
                            <Input placeholder="请输入快递单号" />
                        )}
                    </FormItem>
                    <FormItem label="手机号码">
                        {getFieldDecorator('postPhone', {initialValue: data? data.addresseePhone :null,
                            rules: [{ required: true, message: '请输入快递单号' }],
                        })(
                            <Input placeholder="寄件人或收件人手机号" />
                        )}
                    </FormItem>
                </Form>

            </Modal>
        );
    }
}

const Express = Form.create()(Expresss);

export default Express;
