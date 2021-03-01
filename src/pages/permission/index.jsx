import React, { Component } from 'react'
import {Card,Button,Modal,Form,Select,Input,Tree,Transfer} from 'antd'
import ETable from './../../components/ETable'
import Utils from './../../utils/utils'
import axios from './../../axios'
import menuConfig from './../../config/menuConfig'
const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = Tree.TreeNode;

export default class Permission extends Component {
  state = {};
  componentWillMount(){
    axios.requestList(this,'/role/list',{})
  }
  //打开创建角色弹窗
  handleRole = () => {
    this.setState({
      isRoleVisible:true
    })
  }
  //创建角色提交
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    axios.ajax({
      url:'role/create',
      data:{
        params:data
      }
    }).then((res)=>{
      if(res.code==0){
        this.setState({
          isRoleVisible:false
        })
        this.roleForm.props.form.resetFields();
        axios.requestList(this,'/role/list',{})
      }
    })
  }
  //权限设置
  handlePermission = () =>{
    let item = this.state.selectedItem;
    if(!item){
      Modal.info({
        title:'提示',
        content:'请选择一个角色'
      })
      return;
    }
    this.setState({
      isPermVisible:true,
      detailInfo:item,
      menuInfo:item.menus
    })
  }
  //权限设置提交
  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    axios.ajax({
      url:'/permission/edit',
      data:{
        params:{
          ...data
        }
      }
    }).then((res)=>{
      if(res){
        this.setState({
          isPermVisible:false
        })
        axios.requestList(this,'/role/list',{})
      }
    })
  } 

  //用户授权
  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if(!item){
      Modal.info({
        title:'提示',
        content:'请选择一个角色'
      })
      return;
    }
    this.setState({
      isUserVisible:true,
      detailInfo:item
    })
    this.getRoleUserList(item.id);
  }
  //
  getRoleUserList = (id) => {
    axios.ajax({
      url:'/role/user_list',
      data:{
        params:{
          id
        }
      }
    }).then(res=>{
      if(res){
        this.getAuthUserList(res.result)
      }
    })
  }
  //筛选目标用户
  getAuthUserList = (dataSource) => {
    const mockData = [];
    const targetKeys = [];
    if(dataSource && dataSource.length>0){
      for(let i=0;i<dataSource.length;i++){
        const data = {
          key:dataSource[i].user_id,
          title:dataSource[i].user_name,
          status:dataSource[i].status
        }
        if(data.status==1){
          targetKeys.push(data.key);
        }
        mockData.push(data)
      }
      this.setState({
        mockData,targetKeys
      })
    }
  }
  //用户授权提交
  handleUserSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios.ajax({
      url:'/role/user_role_edit',
      data:{
        params:{
          ...data
        }
      }
    }).then(res=>{
      if(res){
        this.setState({
          isUserVisible:false
        })
        axios.requestList(this,'/role/list',{})
      }
    })
  }
  render() {
    const columns = [
      {
        title:'角色ID',
        dataIndex:'id'
      },{
        title:'角色名称',
        dataIndex:'role_name'
      },{
        title:'创建时间',
        dataIndex:'create_time',
        render:Utils.formateDate
      },{
        title:'使用状态',
        dataIndex:'status',
        render(status){
          return status == 1 ? '启用' : '停用'
        }
      },{
        title:'授权时间',
        dataIndex:'authorize_time',
        render:Utils.formateDate
      },{
        title:'授权人',
        dataIndex:'authorize_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole} style={{marginRight:10}}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission} style={{marginRight:10}}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource = {this.state.list}
            columns={columns}
          />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={()=>{
            this.roleForm.props.form.resetFields();//表单重置
            this.setState({
              isRoleVisible:false
            })
          }}
        >
          <RoleForm wrappedComponentRef={(inst)=>this.roleForm=inst}></RoleForm>
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={()=>{
            this.setState({
              isPermVisible:false
            })
          }}
        >
          <PermEditForm 
            wrappedComponentRef={(inst)=>this.permForm=inst}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                menuInfo:checkedKeys
              })
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={()=>{
            this.userAuthForm.props.form.resetFields(); //表单重置
            this.setState({
              isUserVisible:false
            })
          }}
        >
          <RoleAuthForm 
            wrappedComponentRef={(inst)=>this.userAuthForm=inst}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={targetKeys=>{
              this.setState({
                  targetKeys
              })
            }}
          />
        </Modal>
      </div>
    )
  }
}

class RoleForm extends Component{
  render(){
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    return(
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('role_name')(
              <Input type="text" placeholder="请输入角色名称"/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('state')(
              <Select>
                <Option value={0}>关闭</Option>
                <Option value={1}>开启</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
RoleForm = Form.create({})(RoleForm)

class PermEditForm extends Component{

  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }
  renderTreeNodes = data => {
    return data.map(item=>{
      if(item.children){
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      }else{
        return <TreeNode title={item.title} key={item.key} />
      }
    })
  }

  render(){
    const {getFieldDecorator} = this.props.form; //实现双向绑定
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('status',{
              initialValue:'1'
            })(
              <Select>
                <Option value="1">启用</Option>
                <Option value="0">停用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable //复选框
          defaultExpandAll //默认展开
          onCheck={(checkedKeys)=>{
            this.onCheck(checkedKeys)
          }} //点击复选框触发
          checkedKeys={menuInfo} //默认选中的keys
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}
PermEditForm = Form.create({})(PermEditForm)

class RoleAuthForm extends Component {
  filterOption = (inputValue,option) => option.title.indexOf(inputValue)

  handleChange = targetKeys => {
    this.props.patchUserInfo(targetKeys)
  }

  render(){
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    const detail_info = this.props.detailInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="选择用户" {...formItemLayout}>
          <Transfer
            listStyle={{width:200,height:400}} //自定义样式
            dataSource={this.props.mockData} //数据源
            titles={['待选用户','已选用户']} //标题集合，顺序从左到右
            showSearch //是否显示搜索框
            locale={{searchPlaceholder:'输入用户名'}} //各种语言
            filterOption={this.filterOption} //接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
            targetKeys={this.props.targetKeys} //显示在右侧框数据的 key 集合
            onChange={this.handleChange} //选项在两栏之间转移时的回调函数
            render={item=>item.title} //每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 ReactElement。或者返回一个普通对象，其中 label 字段为 ReactElement，value 字段为 title
          />
        </FormItem>
      </Form>
    )
  }
}
RoleAuthForm = Form.create({})(RoleAuthForm)