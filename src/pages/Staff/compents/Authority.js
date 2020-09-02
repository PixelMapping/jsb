import React, { Component } from "react";
import { Button, Drawer, Form, Input, Radio ,Tree} from "antd";
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

const Authority = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  
  class extends React.Component {
    render() {
      const { visible, onCancel, form ,title,onExpand,expandedKeys,autoExpandParent,onCheck,checkedKeys,treeData,save} = this.props;
      const { getFieldDecorator } = form;
      return (
        <Drawer
          title={title}
          placement="right"
          width="500"
          onClose={onCancel}
          visible={visible}
        >
          <Tree
            checkable
            onExpand={onExpand}
            selectable={false}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}              
            />
            <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={onCancel} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={save} type="primary">
              确定
            </Button>
          </div>
        </Drawer>
      );
    }
  },
);


export default Authority