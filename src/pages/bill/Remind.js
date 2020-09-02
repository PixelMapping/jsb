import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Select, Button, DatePicker, Modal, Form, Input, message, Radio } from "antd";
import "./index.scss";
import BreadeHeader from "../../components/breadeHeader/BreadeHeader";
import Apis from "../../service/apis/1.0";
import moment from "moment";
import { Link } from 'react-router-dom'

const { Option } = Select;
const { RangePicker } = DatePicker


const remind = Form.create({ name: 'form_in_modal' })(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // 筛选属性
        select: {
          page: 1,
          limit: 20,
          invoiceType: "",
          type: '1',
          quarter:''
          // &startDate=${data.startDate}&endDate=${data.endDate}
        },
        current: 1,
        searchValue: "",
        routerList: [
          {
            name: "首页",
            url: "/"
          },
          {
            name: "税金提醒列表",
            url: "/order"
          }
        ],
        columns: [
          {
            title: '',
            dataIndex: 'key',
            key: 'key',
          },
          {
            title: '开票公司',
            dataIndex: 'companyName',
            key: 'companyName',
          },
          {
            title: "发票数量",
            dataIndex: 'num',
            key: 'num',
          },
          {
            title: '申请月份',
            dataIndex: 'submitTime',
            key: 'submitTime',
          },
          {
            title: '开票金额',
            key: 'invoiceMoney',
            dataIndex: 'invoiceMoney'
          }, {
            title: '操作',
            key: 'action',
            render: (record) => (
              <Button type="primary" disabled={record.isRemind == 1 ? true : false} onClick={this.showModal.bind(this, record)}>发起提醒</Button>
            )
          }
        ],
        data: [
        ],
        visible: false,
        editVisible: false,
        mode: ['month', 'month'],
        value: [],
        subData: {},
        curObj: {},
        expandedKeys:[]
      };

    }



    componentWillMount() {
      this.getData()
    }

    componentWillReceiveProps(nextProps) {
    }

    getData = () => {
      let dates = this.state.value
      let select = this.state.select
      if(select.type==1){
        let data = {
          page: select.page,
          limit: select.limit,
          startDate: dates.length > 0 ? moment(dates[0]).format('YYYY-MM') : '',
          endDate: dates.length > 0 ? moment(dates[1]).format('YYYY-MM') : ''
        }
        Apis.remindTaxPage(data).then(res => {
          if (res.rel) {
            let data = res.data.rows.map((item, index) => {
              return { ...item, key: index + 1 }
            })
            this.setState({
              data: data,
              total: res.data.total
            })
          }
        })
      }else{        
        let data = {
          page: select.page,
          limit: select.limit,
          quarter: select.quarter,
        }
        Apis.quarterTaxPage(data).then(res => {
          if (res.rel) {
            let data = res.data.rows.map((item, index) => {
              return { ...item, key: index + 1 }
            })
            this.setState({
              data: data,
              total: res.data.total
            })
          }
        })
      }
      
    }

    //展开子表格
    expandedRowRender = (record) => {
      const columns = [
        {
          title: '',
          dataIndex: 'key',
          key: 'key',
        }, {
          title: '申请时间',
          dataIndex: 'submitTime',
          key: 'submitTime',
        }, {
          title: '开票类型',
          dataIndex: 'invoiceType',
          key: 'invoiceType',
          render: (tags) => (tags == 1 ? '一般纳税人' : '小规模纳税人')
        }, {
          title: '开票金额',
          dataIndex: 'invoiceMoney',
          key: 'invoiceMoney',
        }, {
          title: '开票内容',
          dataIndex: 'invoiceContent',
          key: 'invoiceContent',
        }, {
          title: '合同名称',
          dataIndex: 'contractName',
          key: 'contractName',
        }, {
          title: '客户名称',
          dataIndex: 'customerName',
          key: 'customerName',
        }, {
          title: '开票时间',
          dataIndex: 'billingTime',
          key: 'billingTime',
        }, {
          title: '发票状态',
          dataIndex: 'billStatus',
          key: 'billStatus',
          render: (tags) => {
            let list = ['审核中', '开票中', '已开票', '已驳回', '已邮寄', '已签收']
            return (list[tags - 1])
          }
        },
      ]
      let data = this.state.subData[record.companyId]
      if (data) {
        return <Table columns={columns} dataSource={data} pagination={false} />

      }
    }

    onExpand = (expanded, record) => {
      if (expanded) {
        this.setState({
          expandedKeys:[...this.state.expandedKeys,record.key]
        })
        let data = {
          companyId: record.companyId,
          submitTime:this.state.select.type==1?record.submitTime:record.quarter,
          type:this.state.select.type
        }
        Apis.remindTaxInfo(data).then(res => {
          if (res.rel) {
            this.setState({
              subData: { ...this.state.subData, [record.companyId]: res.data }
            })
          }
        })
      }else{
        let keys=[...this.state.expandedKeys]
        let index=keys.indexOf(record.key)
        keys.splice(index,1)
        this.setState({
          expandedKeys:keys
        })
      }

    }

    setOrderState = (value) => {
      this.setState({
        select: Object.assign(this.state.select, { invoiceType: value })
      })
    }

    setQuarter = (value) => {
      this.setState({
        select: Object.assign(this.state.select, { quarter: value })
      })
    }

    setCreateTime = (value) => {
      if (value == "") {
        this.setState({
          select: Object.assign(this.state.select, { startDate: value, endDate: value }),
          searchValue: value
        })
      }
    }

    paginationChange = (current) => {
      this.setState({
        select: Object.assign(this.state.select, { page: current }),
        current
      }, () => {
        this.getData()
      })
    }

    handlePanelChange = (value, mode) => {
      this.setState({
        value,
        mode: [mode[0] === 'date' ? 'month' : mode[0], mode[1] === 'date' ? 'month' : mode[1]],
      });
    };

    handleChange = value => {
      this.setState({ value });
    };

    search = () => {
      this.setState({
        current: 1
      }, () => {
        this.getData()
      })
    }

    handleOk = e => {

      this.props.form.validateFields((err, values) => {
        if (err) {
          return
        }
        let data = {
          companyId: this.state.curObj.companyId,
          submitTime: this.state.select.type==1?this.state.curObj.submitTime:this.state.curObj.quarter,
          vat: values.vat,
          superTax: values.superTax,
          stampTax: values.stampTax,
          personTax: values.personTax,
          type:this.state.select.type
        }
        Apis.remind(data).then(res => {
          if (res.rel) {
            message.info(res.message)
            this.setState({
              visible: false,
            });
            this.getData()
          }
        })

      })
    };

    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };

    showModal = (row) => {
      this.setState({
        visible: true,
        curObj: row
      })
    }

    changeRadio = (e) => {
      let columns = [...this.state.columns]
      if(e.target.value=='1'){
        columns[3]={
          title:'申请月份',
          key: "submitTime",
          dataIndex: "submitTime"
        }
      }else{
        columns[3]={
          title:'申请季度',
          key:'quarterName',
          dataIndex:'quarterName'
        }
      }
      this.setState({
        select: { ...this.state.select, type: e.target.value },
        columns:columns,
        expandedKeys:[]
      },()=>{
        this.getData()
      })
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      let { routerList, columns, data, searchValue } = this.state;
      let { invoiceType, startDate, endDate, type,quarter } = this.state.select
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
      };
      return (
        <div className="product-container">
          <BreadeHeader routerList={routerList} />

          <div className="search-content">
            {/* 筛选 */}    
            <div className="line">
              <div>查询类型 ：</div>
              <div>
                <Radio.Group value={type} onChange={this.changeRadio} buttonStyle="solid">
                  <Radio.Button value="1">月份</Radio.Button>
                  <Radio.Button value="2">季度</Radio.Button>

                </Radio.Group>
              </div>
            </div>
            <div className="line">
              <div>申请时间 ：</div>
              {
                type == 1 ? (
                  <div>

                    <RangePicker
                      placeholder={['开始月份', '结束月份']}
                      format="YYYY-MM"
                      value={this.state.value}
                      mode={this.state.mode}
                      onChange={this.handleChange}
                      onPanelChange={this.handlePanelChange}

                    />
                  </div>) : (
                    <div>
                      <span onClick={this.setQuarter.bind(this, '')} className={quarter == '' ? "active-bg" : ""}>全部</span>
                      <span onClick={this.setQuarter.bind(this, 1)} className={quarter == 1 ? "active-bg" : ""}>一季度</span>
                      <span onClick={this.setQuarter.bind(this, 2)} className={quarter == 2 ? "active-bg" : ""}>二季度</span>
                      <span onClick={this.setQuarter.bind(this, 3)} className={quarter == 3 ? "active-bg" : ""}>三季度</span>
                      <span onClick={this.setQuarter.bind(this, 4)} className={quarter == 4 ? "active-bg" : ""}>四季度</span>

                    </div>
                  )
              }

            </div>

            <div className="line">
              <div></div>
              <div style={{ marginLeft: "62px" }}>
                <Button onClick={this.search} style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>搜索</Button>
                {/* <Button style={{ backgroundColor: "#17A2A9", color: "#FFF", marginLeft: "10px" }}>导出</Button> */}
              </div>
            </div>

          </div>

          <div className="table-content">
            <Table
              className="components-table-demo-nested"
              columns={columns}
              expandedRowRender={this.expandedRowRender}
              onExpand={this.onExpand}
              dataSource={data}
              expandedRowKeys={this.state.expandedKeys}
              pagination={{
                total: this.state.total,
                showTotal: (total) => `共 ${total} 条`,
                onChange: (current) => this.paginationChange(current),
                pageSize: this.state.select.limit,
                current: this.state.current
              }}
            />
          </div>
          <Modal
            title="发起提醒"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form {...formItemLayout}>
              <Form.Item label="增值税">
                {getFieldDecorator('vat', {
                  rules: [{ required: true, message: '请输入增值税' }],
                })(<Input type="number" style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="附加税">
                {getFieldDecorator('superTax', {
                  rules: [{ required: true, message: '请输入附加税' }],
                })(<Input type="number" style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="印花税">
                {getFieldDecorator('stampTax', {
                  rules: [{ required: true, message: '请输入印花税' }],
                })(<Input type="number" style={{ width: '100%' }} />)}
              </Form.Item>
              <Form.Item label="个税">
                {getFieldDecorator('personTax', {
                  rules: [{ required: true, message: '请输入个税' }],
                })(<Input type="number" style={{ width: '100%' }} />)}
              </Form.Item>
            </Form>
          </Modal>
        </div>
      );
    }
  }
)
export default remind;
