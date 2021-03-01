import React, { Component } from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Admin from './admin' 
import Home from './pages/home'
import Button from './pages/ui/button'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/message'
import Tab from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carousels from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import RegLogin from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city'
import Order from './pages/order'
import Common from './common'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import Permission from './pages/permission'
import Rich from './pages/rich'

import NoMatch from './pages/nomatch'

export default class IRouter extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/common" render={()=>(
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
                            </Common>
                        )}/>
                        <Route path="/" render={()=>(
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/ui/buttons" component={Button} />
                                    <Route path="/ui/modals" component={Modals} />
                                    <Route path="/ui/loadings" component={Loadings} />
                                    <Route path="/ui/notification" component={Notice} />
                                    <Route path="/ui/messages" component={Messages} />
                                    <Route path="/ui/tabs" component={Tab} />
                                    <Route path="/ui/gallery" component={Gallery} />
                                    <Route path="/ui/carousel" component={Carousels} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={RegLogin} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path="/bikeMap" component={BikeMap} />
                                    <Route path="/charts/bar" component={Bar} />
                                    <Route path="/charts/pie" component={Pie} />
                                    <Route path="/charts/line" component={Line} />
                                    <Route path="/permission" component={Permission} />
                                    <Route path="/rich" component={Rich} />
                                    
                                    <Redirect to="/home" /> 
                                    {/* 重定向在前 NoMatch匹配不到 */}
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        )} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
