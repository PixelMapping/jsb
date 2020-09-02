import React, { Component } from "react";
import MasterPage from "../../components/layout/MasterPage";
import { Table, Divider, Tag, Tabs, DatePicker, Row, Col } from "antd";
import "./dashboard.scss";
import echarts from "echarts"

import ApiRequest from "../../service/request/ApiRequest";
import { urls } from "../../service/apis/1.0/urls";

var list = {
    'charts-left': '订单数量',
    'charts-center': '订单金额',
    'charts-right': '总开票额'
}

class OrderLineCharts extends Component {

    // componentDidMount(){
    //     this.init();
    //   }

    componentDidMount() {
        ApiRequest.get(urls.INDEXCHART).then(res => {
            if (res.status == 200) {
                this.state = {
                    oderList: res.data.oderList,
                    oderAmountList: res.data.oderAmountList,
                    invoiceList:res.data.invoiceList
                }
                list['charts-right']=`总开票额（￥${res.data.invoiceTaotal}）`
                this.init('charts-left');
                this.init('charts-center');
                this.init('charts-right');
            }
        })
    }
    init(name) {
        // echarts 实例初始化
        let weekCharts = echarts.init(this.refs[name]);
        weekCharts.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: 'transparent'
                    }
                },
            },
            title: {
                text: list[name],
                left: 'center'
            },
            grid: {
                top: 'middle',
                left: '3%',
                right: '4%',
                top: '10%',
                bottom: '5%',
                height: '90%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                axisLine: {
                    lineStyle: {
                        color: "#CECECE"
                    },

                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#333333',  //更改坐标轴文字颜色
                        fontSize: 12     //更改坐标轴文字大小
                    }
                },
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false,
                    lineStyle: {
                        type: 'dashed',
                        color: '#DDD'
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#333"
                    },
                },
                axisTick: {
                    show: false
                },
                nameTextStyle: {
                    color: "#999"
                },
                splitArea: {
                    show: false
                }
            },
            series: [
                name == 'charts-left' ?
                    {
                        name: '订单数',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 4,
                        data: this.state.oderList,
                        color: "#3C90F7",
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: 'linear',
                                    colorStops: [{
                                        offset: 0,
                                        color: '#3C90F7' // 0% 处的颜色
                                    }, {
                                        offset: 0.4,
                                        color: '#3C90F7' // 100% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#3C90F7' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                // shadowColor: 'rgba(245,128,128, 0.5)',
                                // shadowBlur: 10,
                                // shadowOffsetY: 7
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#3C90F7',
                                borderWidth: 3,
                                /*shadowColor: 'rgba(72,216,191, 0.3)',
                                 shadowBlur: 100,*/
                                borderColor: "#3C90F7"
                            }
                        },
                        smooth: false
                    }: name == 'charts-center' ?
                    {
                        name: '订单金额',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 4,
                        data: this.state.oderAmountList,
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: 'linear',

                                    colorStops: [{
                                        offset: 0,
                                        color: '#55BFC0' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.4,
                                        color: '#55BFC0' // 100% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#55BFC0' // 100% 处的颜色
                                    }
                                    ],
                                    globalCoord: false // 缺省为 false
                                },
                                // shadowColor: 'rgba(71,216,190, 0.5)',
                                // shadowBlur: 2,
                                // shadowOffsetY: 7
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#55BFC0',
                                borderWidth: 3,
                                /*shadowColor: 'rgba(72,216,191, 0.3)',
                                 shadowBlur: 100,*/
                                borderColor: "#55BFC0"
                            }
                        },
                        smooth: false
                    }:{
                        name: '开票额',
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 4,
                        data: this.state.invoiceList,
                        lineStyle: {
                            normal: {
                                width: 2,
                                color: {
                                    type: 'linear',

                                    colorStops: [{
                                        offset: 0,
                                        color: '#00cd6a' // 0% 处的颜色
                                    },
                                    {
                                        offset: 0.4,
                                        color: '#00cd6a' // 100% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#00cd6a' // 100% 处的颜色
                                    }
                                    ],
                                    globalCoord: false // 缺省为 false
                                },
                                // shadowColor: 'rgba(71,216,190, 0.5)',
                                // shadowBlur: 2,
                                // shadowOffsetY: 7
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#00cd6a',
                                borderWidth: 3,
                                /*shadowColor: 'rgba(72,216,191, 0.3)',
                                 shadowBlur: 100,*/
                                borderColor: "#00cd6a"
                            }
                        },
                        smooth: false
                    }
            ]
        }, true);
        //页面大小改变 ehcarts 重新渲染自适应
        window.addEventListener("resize", () => {
            // this.init();
            weekCharts.resize();
        })
    }



    render() {

        return (
            <React.Fragment>
                <Row gutter={20}>
                    <Col span={8}>
                        <div ref="charts-left" style={{  height: "300px",background:'#fff',padding:20 }}>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div ref="charts-center" style={{  height: "300px",background:'#fff',padding:20  }}>
                        </div>

                    </Col>
                    <Col span={8}>
                        <div ref="charts-right" style={{ height: "300px",background:'#fff',padding:20  }}>
                        </div>
                    </Col>
                </Row>



            </React.Fragment>

        );
    }
}

export default OrderLineCharts;
