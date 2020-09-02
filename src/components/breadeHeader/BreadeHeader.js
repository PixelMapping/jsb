import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Breadcrumb } from "antd";
import "./index.scss";
import { goBack } from "connected-react-router";

class BreadeHeader extends Component {

  goBack = (item)=>{
    if(item.back == "isBack"){
      window.history.back(-1); 
    }
  }



  render() {
    let { routerList } = this.props;
    
    for(let i =1; i< routerList.length-1; i++){
      routerList[i].back = "isBack"
    }






    return (
      <div className="breadeHeader-container">
        {/* 面包屑头部 */}
        <Breadcrumb>
          {/* routerList */}
          {
              routerList ? routerList.map((item,key)=>{
                 return (
                 <Breadcrumb.Item className={item.back == "isBack" ? "cur" : ""}  onClick={this.goBack.bind(this,item)} key = {key}>{item.name}</Breadcrumb.Item>
                 )
              }) :""
          }
        </Breadcrumb>
        <p>
            {
                routerList ? routerList[routerList.length-1].name : ""
            }
        </p>
      </div>
    );
  }
}

export default BreadeHeader;
