import React, { Component } from 'react'
import {Card} from 'antd'
import axios from '../../axios'
import './detail.less'

export default class Order extends Component {
  state = {}
  componentDidMount(){
    let orderId = this.props.match.params.orderId;
    if(orderId){
      this.getDetailInfo(orderId)
    }
  }
  getDetailInfo = (orderId) => {
    axios.ajax({
      url:'/order/detail',
      data:{
        params:{
          orderId
        }
      }
    }).then(res=>{
      if(res.code === 0){
        this.setState({
          orderInfo:res.result
        })
        this.renderMap(res.result);
      }
    })
  }
  renderMap = (result) => {
    this.map = new window.BMap.Map("orderDetailMap");//使用地图2.0版本
    this.addMapControl();//添加地图控件
    this.drawBikeRoute(result.position_list);//调用路线图绘制方法
    this.drawServiceArea(result.area);//调用服务区绘制方法
  }
  //添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))
    map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))
  }
  //绘制用户行驶路线
  drawBikeRoute = (positionList) => {
    let startPoint = '';
    let endPoint = '';
    if(positionList.length>0){
      let first = positionList[0];
      let last = positionList[positionList.length-1];
      //创建起始坐标点 lon经度 lat纬度
      startPoint = new window.BMap.Point(first.lon,first.lat);
      //起始点的图标
      let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,42),{
        imageSize: new window.BMap.Size(36,42),
        anchor:new window.BMap.Size(18,42)
      })
      //起始点的坐标和图标放在起始点标记中
      let startMarker = new window.BMap.Marker(startPoint,{icon:startIcon});
      this.map.addOverlay(startMarker);
      //创建终止坐标点 lon经度 lat纬度
      endPoint = new window.BMap.Point(last.lon,last.lat);
      //终止点的图标
      let endIcon = new window.BMap.Icon('/assets/end_point.png',new window.BMap.Size(36,42),{
        imageSize: new window.BMap.Size(36,42),
        anchor:new window.BMap.Size(18,42)
      })
      //终止点的坐标和图标放在终止点标记中
      let endMarker = new window.BMap.Marker(endPoint,{icon:endIcon});
      this.map.addOverlay(endMarker);
      //连接路线图
      let trackPoint = [];
      for(let i=0;i<positionList.length;i++){
        let point = positionList[i];
        trackPoint.push(new window.BMap.Point(point.lon,point.lat))
      }
      let polyline = new window.BMap.Polyline(trackPoint,{
        strokeColor: '#1869AD',
        strokeWeight: 3,
        strokeOpacity: 1
      })
      this.map.addOverlay(polyline);
      this.map.centerAndZoom(endPoint,11);
    }
  }
  //绘制服务区
  drawServiceArea = (positionList) => {
    let trackPoint = [];
    for(let i=0;i<positionList.length;i++){
      let point = positionList[i];
      trackPoint.push(new window.BMap.Point(point.lon,point.lat));
    }
    //绘制服务区
    let polygon = new window.BMap.Polygon(trackPoint,{
      strokeColor:'#CE0000',
      strokeWeight:4,
      strokeOpaicity:1,
      fillColor:'#ff8605',
      fillOpacity: 0.4
    })
    this.map.addOverlay(polygon);
  }
  render() {
    const info = this.state.orderInfo || {};
    return (
      <div>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">{info.mode===1?'服务区':'停车点'}</div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">{info.distance/1000}公里</div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    )
  }
}
