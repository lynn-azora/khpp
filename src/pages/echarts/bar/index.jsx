import React, { Component } from 'react'
import {Card} from 'antd'
import echartTheme from './../echartTheme' //主题配置文件
//import echarts from 'echarts'
//按需加载
import echarts from 'echarts/lib/echarts'
//导入柱形图
import 'echarts/lib/chart/bar'
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
        text:'用户骑行订单'
      },
      tooltip:{
        trigger:'axis'
      },
      xAxis:{
        data:['周一','周二','周三','周四','周五','周六','周日']
      },//x轴数据
      yAxis:{
        type:'value'
      },//y轴数据
      series:[
        {
          name:'订单量',
          type:'bar',
          data:[1000,2000,4300,4000,2800,1000,800]
        }
      ]//核心数据，定义整个数据量
    };
    return option;
  }
  getOption2 = () => {
    let option = {
      title:{
        text:'用户骑行订单'
      },
      legend:{
        data:['OFO','摩拜',"小蓝"]
      },
      tooltip:{
        trigger:'axis'
      },
      xAxis:{
        data:['周一','周二','周三','周四','周五','周六','周日']
      },//x轴数据
      yAxis:{
        type:'value'
      },//y轴数据
      series:[
        {
          name:'OFO',
          type:'bar',
          data:[1000,2000,4300,4000,2800,1000,800]
        },
        {
          name:'摩拜',
          type:'bar',
          data:[1000,2000,4300,4500,2500,1000,800]
        },
        {
          name:'小蓝',
          type:'bar',
          data:[1200,2600,3400,3000,2400,900,600]
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
      </div>
    )
  }
}
