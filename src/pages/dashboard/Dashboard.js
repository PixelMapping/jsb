import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Tabs, DatePicker, Progress, Icon } from "antd";
import { Link } from 'react-router-dom';
import "./dashboard.scss";
import DayCard from "../../components/card/DayCard";
import MonthCard from "../../components/card/MonthCard";
import WeekCard from "../../components/card/WeekCard";
import echarts from "echarts";
import OrderLineCharts from "./OrderLineCharts";
import ApiRequest from "../../service/request/ApiRequest";
import { urls } from "../../service/apis/1.0/urls";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;



class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state={
      dataInfo:{},
      number:111
    }
  }



  componentDidMount(){
    ApiRequest.get(urls.INDEXINFO).then(res=>{
      if(res.status==200){
        this.setState({
          dataInfo:res.data
        })
      }
    })
  }
 
  //  select
  select = key => {
  };

  toPage = val => {

    switch (val) {
      case 1:
        this.props.history.push({ pathname: '/user' })
        break
      case 2:
        this.props.history.push({ pathname: '/product' })
        break
      case 3:
        this.props.history.push({ pathname: '/order' })
        break
      case 4:
        this.props.history.push({ pathname: '/companyList' })
        break
      case 5:
        this.props.history.push({ pathname: '/billList' })
        break
    }
  }

  

  

  render() {
    return (
      <div className="dashboard-container">
        {/* 卡片 */}

        <div className="cards1">
          {/* <DayCard allLogin={this.state.dataInfo.allLogin}/> */}
          <div className="dayCard-container">
              <p className="title">
                  <span>访问量</span>
                  <span>日</span>
              </p>
              <div className="number">{this.state.dataInfo.todayLogin||0}</div>
              {/* <div className="volum">
                  <span>日同比  12.5% <span className="rise">↑</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>周同比  12.5% <span className="fall">↓</span></span>
              </div> */}
              <div className="total">
                  <span>总访问量</span>
                  <span>{this.state.dataInfo.allLogin||0}</span>
              </div>
          </div>
          <WeekCard id="1" type="周" info="本周订单金额" title="订单量" num1={this.state.dataInfo.thsWeekOrder} num2={this.state.dataInfo.thsWeekOrderAmount} />

          <WeekCard id="2" type="月" info="本月订单金额" title="订单量" num1={this.state.dataInfo.thsMothOrder} num2={this.state.dataInfo.thsMothOrderAmount} />
          <MonthCard allOrderAmount={this.state.dataInfo.allOrderAmount}  />

        </div>
        <div className="cards2">
          <WeekCard id="3" type="月" title="本月办结公司个数" num1={this.state.dataInfo.thsMothCmp} num2='' />
          <WeekCard id="4" type="总" title="全部办结公司个数" num1={this.state.dataInfo.allCmp} num2='' />
          <WeekCard id="5"  type="月" title="本月开票数量" info="本月开票额度" num1={this.state.dataInfo.thsMothInvoice} num2={this.state.dataInfo.thsMothInvoiceAmount} />
          <WeekCard id="6" type="总" title="全部开票数量" info="全部开票额度" num1={this.state.dataInfo.allInvoice} num2={this.state.dataInfo.allInvoiceAmount} />
        </div>
        {/* 卡片导航模块 */}
        <div className="modal">
          <div>
            <span> 用户</span>
          </div>
          <div>
            <span>产品</span>
          </div>
          <div>
            <span>订单</span>
          </div>
          <div>
            <span>公司</span>
          </div>
          <div>
            <span>发票</span>
          </div>
          <div>
            <span>数据</span>
          </div>
          <div>
            <span>设置</span>
          </div>
        </div>
        {/*         订单        */}
        <div style={{margin:'20px'}}>
        <OrderLineCharts  />
        </div>
        {/* <div className="order-container">
          <div className="order-content">
            <div style={{height:'20px'}}></div>
            <div className="order-header">
              <div>订单</div>
              <div>
                <Tabs onChange={this.select}>
                  <TabPane tab="今年" key="1" />
                  <TabPane tab="本月" key="2" />
                  <TabPane tab="全年" key="3" />
                </Tabs>
                <RangePicker
                  size="small"
                  style={{ width: "229px", marginTop: "10px" }}
                />
              </div>
            </div>
            <div className="charts-content">
              <OrderLineCharts  />
              <div className="charts-right" >
                <div className="line-number">
                  <p>3006.1</p>
                  <span>上个30天销售额</span>
                </div>

                <div className="line-number">
                  <p>1010.68</p>
                  <span>最近30天销售额</span>
                  <a>100% <Icon type="caret-up" /></a>
                </div>
                <Progress status="active" size="small" percent={100} showInfo={false} />
                <div className="line-number">
                  <p>450</p>
                  <span>上个30天订单总数</span>
                </div>

                <div className="line-number">
                  <p>206</p>
                  <span>最近30天订单总数</span>
                  <a>50% <Icon type="caret-up" /></a>
                </div>

                <Progress status="active" size="small" percent={50} showInfo={false} />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Dashboard;
