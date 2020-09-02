import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Select, Input, Button, Form, Modal, Popconfirm, message } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";

import { connect } from "react-redux";
import Apis from "../../service/apis/1.0";
const { Option } = Select
// key: '1',
//       name: '套餐一',
//       type: 32,
//       number: 'New York No. 1 Lake Park',
//       state: ['nice', 'developer'],
//       time:"2019.01.20",
//       action:"操作";



class ProductClassify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: "",
            visible: false,
            routerList: [
                {
                    name: "行业经营范围",
                    url: "/"
                },
                {
                    name: "经营范围",
                    url: "/scope"
                }
            ],
            page: {
                page: 1,
                limit: 20
            },
            data: [],
            currRow: '',
            parentRow: '',
            isAdd: true,
            tableData: {},
            comList: [],
            editList: {},
            comID:'',
            columns: [
                {
                    title: '经营范围类别',
                    dataIndex: 'name',
                    key: 'name',
                    width: 400
                },
                {
                    title: '排序',
                    dataIndex: 'sort',
                    key: 'sort',
                    width: 100
                },
                {
                    title: '添加时间',
                    dataIndex: 'crtTime',
                    key: 'crtTime',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 300,
                    render: (text, record) => (
                        <>
                            <span className="btn-diy">
                                <Button onClick={this.editor.bind(this, record)} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>编辑</Button>
                            </span>
                            <Button onClick={this.addCategory.bind(this, record)} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>新增下级</Button>
                            <Popconfirm
                                title="确定要删除吗？"
                                onConfirm={this.delet.bind(this, record)}
                                okText="是"
                                cancelText="否"
                            >
                                <Button type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>删除</Button>
                            </Popconfirm>
                        </>

                    ),
                },
            ]
        };
    }

    componentDidMount() {
        Apis.companyTypeWebList({ page: 1, limit: 500 }).then(res => {
            if (res.status == 200) {
                this.setState({
                    comList: res.data.rows
                })
            }
        })
        this.getData()
    }

    editor = (row) => {
        this.props.form.setFieldsValue(row)
        this.setState({
            visible: true,
            isAdd: false,
            currRow: row
        })
    }
    delet = (row) => {
        Apis.deleteCate({ id: row.id }).then(res => {
            if (res.status == 200) {
                message.info(res.message)
                this.setState({
                    visible: false
                })
                if (row.pid == 0) {
                    this.getData()
                } else {
                    this.getChild(row.pid)
                }
            }
        })
    }

    getData = (e,page) => {
        let obj={ page: this.state.page.page, limit: this.state.page.limit, companyTypeId: this.state.comID }
        Apis.getCategoryList(obj).then(res => {
            if (res.status == 200) {
                this.setState({
                    data: res.data.rows.map((item, index) => Object.assign(item, { key: index })),
                    total: res.data.total
                })
            }
        })
    }

    expandedRowRender = (record) => {
        const columns = [
            {
                title: '经营范围类别',
                dataIndex: 'name',
                key: 'name',
                width: 400
            },
            {
                title: '添加时间',
                dataIndex: 'crtTime',
                key: 'crtTime',
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                render: (text, record) => (
                    <>
                        <span className="btn-diy">
                            <Button onClick={this.editor.bind(this, record)} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginRight: "10px" }}>编辑</Button>
                        </span>
                        <Popconfirm
                            title="确定要删除吗？"
                            onConfirm={this.delet.bind(this, record)}
                            okText="是"
                            cancelText="否"
                        >
                            <Button type="danger" style={{ backgroundColor: "#FF4D4F", color: "#FFF", marginRight: "10px" }}>删除</Button>
                        </Popconfirm>
                    </>

                ),
            },
        ]
        return <Table columns={columns} showHeader={false} dataSource={this.state.tableData[record.id]} pagination={false} />;
    }
    onExpand = (expanded, record) => {
        let obj = record || { id: 0 }
        this.setState({
            parentRow: record
        })

        Apis.getBusinessList({ page: 1, limit: 100, pid: obj.id, companyTypeId: '' }).then(res => {
            this.setState({
                tableData: {
                    ...this.state.tableData,
                    [obj.id]: res.data.rows
                }
            })
        })
    }

    getChild(id) {
        Apis.getBusinessList({ page: 1, limit: 100, pid: id, companyTypeId: '' }).then(res => {
            this.setState({
                tableData: {
                    ...this.state.tableData,
                    [id]: res.data.rows
                }
            })
        })
    }

    addCategory = (record) => {

        this.setState({
            visible: true,
            isAdd: true,
            parentRow: record.id ? record : ''
        })
    }

    handleOk = e => {
        // console.log(e);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.parentRow != '' && this.state.isAdd) {
                    let obj = {
                        pid: this.state.parentRow.id,
                        name: values.name
                    }
                    Apis.businessAdd(obj).then(res => {
                        if (res.status == 200) {
                            message.info(res.message)
                            this.setState({
                                visible: false
                            })
                            this.getChild(this.state.parentRow.id)
                        }
                    })
                } else if (this.state.isAdd) {
                    let obj = {
                        name: values.name,
                        companyTypeId: values.companyTypeId,
                        sort: values.sort
                    }

                    Apis.categoryAdd(obj).then(res => {
                        if (res.status == 200) {
                            message.info(res.message)
                            this.setState({
                                visible: false
                            })
                            this.getData()
                        }
                    })
                }
                if (!this.state.isAdd) {
                    let obj = {
                        name: values.name,
                        sort: values.sort || '',
                        id: this.state.currRow.id
                    }
                    Apis.update(obj).then(res => {
                        message.info(res.message)
                        this.setState({
                            visible: false
                        })
                        if (this.state.currRow.pid == 0) {
                            this.getData()
                        } else {
                            this.getChild(this.state.currRow.pid)
                        }
                    })
                }
            }


        })

    };
    handleChange=(value)=>{
        this.setState({
            comID:value
        })
    }

    paginationChange = (current) => {
        this.setState({
            page:{
                ...this.state.page,
                page:current,
            }
        })
        this.getData()

    }

    search = ()=>{
        this.setState({
            page:{
                page:1,
                limit:20
            }
        },()=>{
            this.getData()
        })
    }

    handleCancel = e => {
        this.props.form.resetFields();
        this.setState({
            visible: false,
        });
    };

    render() {
        let { routerList } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="product-container">
                {/* 产品列表 */}
                {/* 头部 */}
                <BreadeHeader routerList={routerList} />
                {/* 内容部分 */}
                {/* table 部分 */}

                <div className="table-content table-content-2">
                    <Select  placeholder="请选择公司类别" onChange={this.handleChange} style={{marginRight:'10px',width: 200}}>
                        {
                            this.state.comList.map(item => {
                                return <Option value={item.id} key={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                    <Button type="primary" onClick={this.search}>查询</Button>
                    <Button onClick={this.addCategory} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px", marginTop: "15px", marginBottom: "15px" }}>新增经营范围</Button>
                    {/* 123 */}
                    <Table
                        pagination={{
                            total: this.state.total,
                            showTotal: (total) => `共 ${total} 条`,
                            onChange: (current) => this.paginationChange(current),
                            pageSize: this.state.page.limit,
                        }}
                        onExpand={this.onExpand}
                        expandedRowRender={this.expandedRowRender}
                        bordered columns={this.state.columns} dataSource={this.state.data} />
                </div>

                <Modal
                    title={this.state.isAdd ? '新增经营范围' : '修改经营范围'}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form className="login-form" layout="inline">
                        <Form.Item label="名　　称" name="name" >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入名称' }],
                            })(
                                <Input placeholder="请输入名称" style={{ width: 400 }}></Input>
                            )}
                        </Form.Item>
                        {
                            (this.state.isAdd && this.state.parentRow == '') && (
                                <Form.Item label="公司类别" name="companyTypeId">
                                    {getFieldDecorator('companyTypeId', {
                                        rules: [{ required: true, message: '请选择公司类别' }],
                                    })(
                                        <Select style={{ width: 400 }} placeholder="请选择公司类别">
                                            {
                                                this.state.comList.map(item => {
                                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                                })
                                            }
                                        </Select>
                                    )}

                                </Form.Item>
                            )
                        }
                        {
                            this.state.parentRow == '' && (
                                <Form.Item label="排　　序" name="sort">
                                    {getFieldDecorator('sort', {
                                        rules: [{ required: true, message: '请输入排序' }],
                                    })(
                                        <Input placeholder="请输入排序" style={{ width: 400 }}></Input>
                                    )}
                                </Form.Item>
                            )
                        }

                    </Form>
                </Modal>

            </div>
        );
    }
}



const WrappedNormalLoginForm = Form.create()(ProductClassify);

export default WrappedNormalLoginForm;

// export default ProductClassify;
