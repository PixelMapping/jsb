import React, { Component } from "react";
import MasterPage from "../layout/MasterPage";
import { Table, Divider, Tag, Progress } from "antd";
import "./index.scss";
import echarts from "echarts";

class WeekCard extends Component {

  constructor(props){
      super()
  }

  componentDidMount(){
    this.init();
  }

  componentWillReceiveProps(props,nextProps){
  }
  
  init(){
    // echarts 实例初始化
    let weekCharts =  echarts.init(this.refs[`weekCharts${this.props.id}`]);
    weekCharts.setOption({
      grid:{
        top:10,
        bottom:0,
        left:10,
        right:10
      },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: 'transparent'
            }
        },
        // backgroundColor: 'rgba(255,255,255,1)',
        // padding: [5, 10],
        // textStyle: {
        //     color: '#7588E4',
        // },
        // extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
    },
    xAxis: {
        type: 'category',
        data: ['周一','周二','周三','周四','周五','周六','周日'],
        boundaryGap: false,
        splitLine: {
            show: false,
            interval: 'auto',
            lineStyle: {
                color: ['#D4DFF5']
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: '#609ee9'
            }
        },
        axisLabel: {
            margin: 10,
            textStyle: {
                fontSize: 14
            }
        }
    },
    yAxis: {
        type: 'value',
        splitLine: {
          show:false,
            lineStyle: {
                color: ['#D4DFF5']
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
          show:false,
            lineStyle: {
                color: '#609ee9'
            }
        },
        axisLabel: {
            // margin: 10,
            show:false,
            textStyle: {
                fontSize: 14
            }
        }
    },
    series: [{
        name: '订单量',
        type: 'line',
        smooth: true,
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 6,
        data: ['0', '800', '108', '700', '406', '366', '20'],
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(178, 240, 209,1)'
                }, {
                    offset: 1,
                    color: 'rgba(178, 240, 209,1)'
                }], false)
            }
        },
        itemStyle: {
            normal: {
                color: '#04CD68'
            }
        },
        lineStyle: {
            normal: {
                width: 2
            }
        }
    }]
    },true);
    //页面大小改变 ehcarts 重新渲染自适应
        window.addEventListener("resize",()=>{
            weekCharts.resize();
        })
  }








  render() {
   
    return (
    <div className="weekCard-container">
        {
            this.props.type == '周' &&
            <p className="title" >
            <span>{this.props.title}</span>
            <span style={{color:'#08979c',border:'1px #08979c solid'}}>{this.props.type}</span>
        </p>
        }
        {
            this.props.type == '月' &&
            <p className="title" >
            <span>{this.props.title}</span>
            <span style={{color:'#fa8c16',border:'1px #fa8c16 solid'}}>{this.props.type}</span>
        </p>
        }
        {
            this.props.type == '总' &&
            <p className="title" >
            <span>{this.props.title}</span>
            <span style={{color:'#40a9ff',border:'1px #40a9ff solid'}}>{this.props.type}</span>
        </p>
        }
    <div className="number">{this.props.num1}</div>
        <div className="volum">
        <div ref={`weekCharts${this.props.id}`} style={{width:"100%",height:"40px"}}>
          {/* echarts 图表 */}
        </div>
        </div>
        <div className="total">
            <span>{this.props.info}</span>
            <span>{this.props.num2}</span>
        </div>
    </div>
    );
  }
}

export default WeekCard;
