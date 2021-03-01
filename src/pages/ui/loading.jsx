import React, { Component } from 'react'
import {Card,Spin,Icon, Alert} from 'antd'
import './ui.less'

export default class Loadings extends Component {
    render() {
        const icon =<Icon type="loading" style={{fontSize:24}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{margin: "0 10px"}} />
                    <Spin size="large" />
                    <Spin style={{marginLeft:10}} indicator={icon} spinning={true}/>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="欢迎来到吧啦吧啦吧啦"
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎来到吧啦吧啦吧啦"
                            type="warning"
                        />
                    </Spin>
                    {/* 添加提示文字 */}
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="欢迎来到吧啦吧啦吧啦"
                            type="warning"
                        />
                    </Spin>
                    {/* indicator 指示信号，标志 */}
                    <Spin indicator={icon}>
                        <Alert
                            message="React"
                            description="欢迎来到吧啦吧啦吧啦"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
