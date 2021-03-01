import React, { Component } from 'react'
import {Row,Col} from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'
import Util from './../../utils/utils'
import './index.less'

class Header extends Component {
    state = {};
    componentWillMount(){
        this.setState({
            name:'狂欢泡泡'
        })
        this.getWeatherAPIData();
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        }, 1000);
    }
    getWeatherAPIData=()=>{
        axios.get('https://devapi.qweather.com/v7/weather/now?location=101010100&key=42dd0342fcec4b0c90aeb3d74f9d3ac8')
        .then(res=>{
            this.setState({weather:res.data.now.text})
        })
    }
    render() {
        const {menuType} = this.props;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType?<Col span={6} className="logo">
                        <img src='assets/logo-ant.svg' alt=''/>
                        <span>IMooc 通用管理系统</span>
                        </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.name}</span>
                        <a href='javascript;:'>退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':(<Row className="breadcrumb">
                        <Col span={4} className="breadcrumb-title">
                            {this.props.menuName}
                        </Col>
                        <Col span={20} className="weather">
                            <span className="date">{this.state.sysTime}</span>
                            <span className="weather-detail">{this.state.weather}</span>
                        </Col>
                    </Row>)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuName: state.menuName
    }
}

export default connect(mapStateToProps)(Header)