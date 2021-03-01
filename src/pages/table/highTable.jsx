import React, { Component } from 'react'
import {Card,Table,Modal,Button,message} from 'antd'
import axios from './../../axios'

export default class HighTable extends Component {
    state = {
        dataSouuce2:[]
    }
    params = {
        page:1
    }
    componentDidMount(){
        this.request();
    }
    request= () => {
        let _this = this;
        axios.ajax({
            url:'/table/high/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                res.result.list.map((item,index)=>{
                    item.key = index;
                })
                _this.setState({
                    dataSource2:res.result.list
                })
            }
        })
    }
    handleChange = (pagination,filters,sorter) => {
        this.setState({
            sortOrder:sorter.order
        })
    }
    handleDelete = (item) => {
        // let id = item.id;
        Modal.confirm({
            title:'确认',
            content:"您确定要删除此条数据吗？",
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
        const columns2 = [
            {
                title:'id',
                key:'id',
                dataIndex:'id',
                width:80,
                fixed:'left'
            },
            {
                title:'用户名',
                key:'userName',
                dataIndex:'userName',
                width:80,
                fixed:'left'
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
            },
            {
                title:'生日',
                key:'birthday2',
                width:120,
                dataIndex:'birthday'
            },
            {
                title:'生日',
                key:'birthday3',
                dataIndex:'birthday'
            },
            {
                title:'生日',
                key:'birthday13',
                dataIndex:'birthday'
            },
            {
                title:'生日',
                key:'birthday4',
                dataIndex:'birthday'
            },
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
        const columns3 = [
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
                title:'年龄',
                key:'age',
                dataIndex:'age',
                sorter:(a,b)=> {
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder
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
        const columns4 = [
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
                title:'年龄',
                key:'age',
                dataIndex:'age'
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
                title:'操作',
                key:'time',
                dataIndex:'time',
                render:(text,item)=>{
                    return <Button type="primary" size="small" onClick={()=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ]
        return (
            <div>
                <Card title="头部固定" >
                    {/* 设置滚动条和高度就可以了 */}
                    <Table
                        bordered 
                        columns={columns} 
                        dataSource={this.state.dataSource2} 
                        pagination={false} 
                        scroll ={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" style={{margin:'10px 0'}}>
                    <Table
                        bordered 
                        columns={columns2} 
                        dataSource={this.state.dataSource2} 
                        pagination={false} 
                        scroll={{x:2000}}
                    />
                </Card>
                <Card title="表格排序" style={{margin:'10px 0'}}>
                    <Table
                        bordered 
                        columns={columns3} 
                        dataSource={this.state.dataSource2} 
                        pagination={false} 
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{margin:'10px 0'}}>
                    <Table
                        bordered 
                        columns={columns4} 
                        dataSource={this.state.dataSource2} 
                        pagination={false} 
                    />
                </Card>
            </div>
        )
    }
}
