import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag } from "antd";
import "./index.scss";

class DayCard extends Component {


  render() {
    
    return (
    <div className="dayCard-container">
        <p className="title">
            <span>访问量</span>
            <span>日</span>
        </p>
        <div className="number">25848</div>
        {/* <div className="volum">
            <span>日同比  12.5% <span className="rise">↑</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>周同比  12.5% <span className="fall">↓</span></span>
        </div> */}
        <div className="total">
            <span>总访问量</span>
            <span>280万</span>
        </div>
    </div>
    );
  }
}

export default DayCard;
