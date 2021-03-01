import React, { Component } from 'react'
import { Card ,message,Tabs,Icon} from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane

export default class Tab extends Component {
    newTabIndex = 0;
    handlecallback = key => {
        message.info("Hi，您选择了页签：" +key)
    }
    componentWillMount(){
        const panes = [
            {
                title:'Tab 1',
                content: 'Tab1',
                key:'1'
            },
            {
                title:'Tab 2',
                content: 'Tab2',
                key:'2'
            },
            {
                title:'Tab 3',
                content: 'Tab3',
                key:'3'
            }
        ]
        this.setState({
            avtiveKey:panes[0].key,
            panes
        })
    }
    onChange = activeKey => {
        this.setState({activeKey})
    }
    onEdit = (targetKey,action) => {
        this[action](targetKey)
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    };
    
    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
    };
    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab="Tab 1" key="1">
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            欢迎学习巴拉巴拉巴不拉分！
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs defaultActiveKey="1" onChange={this.handlecallback}>
                        <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2">
                            欢迎学习React课程
                        </TabPane>
                        <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">
                            欢迎学习巴拉巴拉巴不拉分！
                        </TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrap">
                    <Tabs 
                        activeKey={this.state.activeKey}
                        onChange={this.onChange}
                        onEdit={this.onEdit}
                        type='editable-card'
                    >
                        {
                            this.state.panes.map(panel=>{
                                return <TabPane tab={panel.title} key={panel.key}/>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
