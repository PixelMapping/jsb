import React, { Component } from "react";
import MasterPage from "../layout/MasterPage";
import { Table, Divider, Tag,Progress  } from "antd";
import "./index.scss";

class MonthCard extends Component {
  render() {
   
    return (
    <div className="monthCard-container">
        <p className="title">
            <span>销售额</span>
            <span>总</span>
        </p>
        <div className="number">￥{this.props.allOrderAmount}</div>
        <div className="volum">
        <Progress  status="active"  percent={50} showInfo={false}/>
        </div>
        {/* <div className="total">
            <span>总访问量</span>
            <span>280万</span>
        </div> */}
    </div>
    );
  }
}

export default MonthCard;
