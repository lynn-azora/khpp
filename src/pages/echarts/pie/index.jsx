import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from './../themeLight' //主题配置文件
//import echarts from 'echarts'
//按需加载
import echarts from 'echarts/lib/echarts'
//导入饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react' //组件化开发 避免new对象

export default class Bar extends Component {

  componentWillMount(){
    echarts.registerTheme('Imooc',echartTheme) //注入主题
  }
  getOption = () => {
    let option = {
      title:{
        text:'用户骑行订单',
        x:'center' //标题水平居中
      },
      legend:{
        orient:'vertical',
        right:10,
        top:20,
        bottom:20,
        data:['周一','周二','周三','周四','周五','周六','周日']
      },
      tooltip:{
        trigger:'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      series:[
        {
          name:'订单量',
          type:'pie',
          data:[
            {
                value:800,
                name:'周一'
            },
            {
                value:1000,
                name:'周二'
            },
            {
                value:1400,
                name:'周三'
            },
            {
                value:1600,
                name:'周四'
            },
            {
                value:1000,
                name:'周五'
            },
            {
                value:900,
                name:'周六'
            },
            {
                value:750,
                name:'周日'
            }]
        }
      ]//核心数据，定义整个数据量
    };
    return option;
  }
  getOption2 = () => {
    let option = {
      title:{
        text:'用户骑行订单',
        x:'center' //标题水平居中
      },
      legend:{
        orient:'vertical',
        right:10,
        top:20,
        bottom:20,
        data:['周一','周二','周三','周四','周五','周六','周日']
      },
      tooltip:{
        trigger:'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      series:[
        {
          name:'订单量',
          type:'pie',
          radius:['50%','80%'],//控制内环和外环大小
          data:[
            {
                value:800,
                name:'周一'
            },
            {
                value:1000,
                name:'周二'
            },
            {
                value:1400,
                name:'周三'
            },
            {
                value:1600,
                name:'周四'
            },
            {
                value:1000,
                name:'周五'
            },
            {
                value:900,
                name:'周六'
            },
            {
                value:750,
                name:'周日'
            }]
        }
      ]//核心数据，定义整个数据量
    };
    return option;
  }
  getOption3 = () => {
    let option = {
      title:{
        text:'用户骑行订单',
        x:'center' //标题水平居中
      },
      legend:{
        orient:'vertical',
        right:10,
        top:20,
        bottom:20,
        data:['周一','周二','周三','周四','周五','周六','周日']
      },
      tooltip:{
        trigger:'item',
        formatter:'{a}<br/>{b}:{c}({d}%)'
      },
      series:[
        {
          name:'订单量',
          type:'pie',
          data:[
            {
                value:800,
                name:'周一'
            },
            {
                value:1000,
                name:'周二'
            },
            {
                value:1400,
                name:'周三'
            },
            {
                value:1600,
                name:'周四'
            },
            {
                value:1000,
                name:'周五'
            },
            {
                value:900,
                name:'周六'
            },
            {
                value:750,
                name:'周日'
            }].sort((a,b)=>{
              return a.value-b.value;
            }), //排序
            roseType:'radius' //南丁格尔玫瑰图
        }
      ]//核心数据，定义整个数据量
    };
    return option;
  }

  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}}/>
        </Card>
        <Card title="柱形图表之二" style={{marginTop:10}}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>
        </Card>
        <Card title="柱形图表之三" style={{marginTop:10}}>
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{height:500}}/>
        </Card>
      </div>
    )
  }
}
