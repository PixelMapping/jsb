import React, { Component } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form ,title} = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title={title}
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item label="角色名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入角色名称' }],
              })(<Input />)}
            </Form.Item>      
            <Form.Item label="描述">
              {getFieldDecorator('description', {
                rules: [{ required: false, message: '请输入描述' }],
              })(<Input />)}
            </Form.Item>   
          </Form>
        </Modal>
      );
    }
  },
);

export default CollectionCreateForm