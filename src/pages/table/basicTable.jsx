import React, { Component } from 'react'
import {Card,Table,Modal,Button,message} from 'antd'
import axios from './../../axios'
import Utils from './../../utils/utils'

export default class BasicTable extends Component {
    state = {
        dataSouuce2:[]
    }
    params = {
        page:1
    }
    componentDidMount(){
        const dataSource = [
            {
                id:'0',
                userName:'Tom',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2010-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },
            {
                id:'1',
                userName:'Jarry',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2010-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            },{
                id:'2',
                userName:'Susan',
                sex:'1',
                state:'1',
                interest:'1',
                birthday:'2010-01-01',
                address:'北京市海淀区奥林匹克公园',
                time:'09:00'
            }
        ]
        dataSource.map((item,index)=>{
            item.key = index;
        })
        this.setState({dataSource})
        this.request();
    }
    request = () => {
        let _this = this;
        axios.ajax({
            url:'/table/list1',
            params:{
                page:this.params.page
            }
        }).then(res=>{
            if(res.code === 0){
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current; //这里mock数据中page不为1页面不显示数据
                        _this.request();
                    })
                })
            }
        })
    }
    onRowClick = (record,index) => {
        let selectKey = [index];
        Modal.info({
            title:'信息',
            content:`用户名：${record.userName}，用户爱好：${record.interest}`
        })
        this.setState({
            selectedRowKeys:selectKey, //值为数组，选中此项
            selectedItem:record //没有用到吗？
        })
    }
    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map(item=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title:'删除提示',
            content:`您确定要删除这些数据吗${ids.join(',')}`,
            onOk:()=>{
                message.success('删除成功');
                this.request();
            }
        })
    }
    render() {
        const columns = [
            {
                title:'id',
                key:'id',
                dataIndex:'id'
            },
            {
                title:'用户名',
                key:'userName',
                dataIndex:'userName'
            },
            {
                title:'性别',
                key:'sex',
                dataIndex:'sex',
                render(sex){
                    return sex===1?'男':'女'
                }
            },
            {
                title:'状态',
                key:'state',
                dataIndex:'state',
                render(state){
                    let config ={
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者',
                    }
                    return config[state];
                }
            },
            {
                title:'爱好',
                key:'interest',
                dataIndex:'interest',
                render(state){
                    let config ={
                        '1':'唱歌',
                        '2':'跳舞',
                        '3':'跑步',
                        '4':'爬山',
                        '5':'桌球',
                        '6':'轮滑',
                        '7':'吃饭',
                        '8':'睡觉',
                    }
                    return config[state];
                }
            },
            {
                title:'生日',
                key:'birthday',
                dataIndex:'birthday'
            }
            ,
            {
                title:'地址',
                key:'address',
                dataIndex:'address'
            },
            {
                title:'早起时间',
                key:'time',
                dataIndex:'time'
            }
        ]
        const {selectedRowKeys} =this.state;
        const rowSelection = {
            type:'radio',  //多选/单选，checkbox or radio
            selectedRowKeys //指定选中项的 key 数组，需要和 onChange 进行配合
        }
        const rowCheckSelection = {
            type:'checkbox',
            selectedRowKeys,
            onChange:(selectedRowKeys,selectedRows)=>{
                this.setState({
                    selectedRowKeys,//选中行下标
                    selectedRows //选中行?
                })
            }
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered //显示边框
                        columns={columns} //表头
                        dataSource={this.state.dataSource} //内容
                        pagination={false} //不分页
                    />
                </Card>
                <Card title="动态Mock数据渲染表格" style={{margin:'10px 0'}}>
                    <Table
                        bordered 
                        columns={columns} 
                        dataSource={this.state.dataSource2} 
                        pagination={false} 
                    />
                </Card>
                <Card title="mock - 单选" style={{margin:'10px 0'}}>
                    <Table
                        bordered 
                        columns={columns} 
                        dataSource={this.state.dataSource2} 
                        pagination={false} 
                        rowSelection={rowSelection} //表格行是否可选择
                        onRow={(record,index)=>{
                            return {
                                onClick:()=>{
                                    this.onRowClick(record,index);
                                }
                            }
                        }}
                    />
                </Card>
                <Card title="mock - 多选" style={{margin:'10px 0'}}>
                    <div style={{marginBottom:10}}>
                        <Button type="primary" onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        bordered 
                        columns={columns} 
                        dataSource={this.state.dataSource2} 
                        pagination={false} 
                        rowSelection={rowCheckSelection} //表格行是否可选择
                    />
                </Card>
                <Card title="mock - 表格分页" style={{margin:'10px 0'}}>
                    <Table
                        bordered 
                        columns={columns} 
                        dataSource={this.state.dataSource2} 
                        pagination={this.state.pagination} 
                        // rowSelection={rowCheckSelection} //表格行是否可选择
                    />
                </Card>
            </div>
        )
    }
}
