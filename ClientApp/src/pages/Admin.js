﻿import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { useAuth } from "../context/auth";
import AdminInfo from "./AdminInfo";
import Teacher from "./Teacher";
import { Avatar } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    SettingOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { store } from "../actions/store";
import { Provider } from "react-redux";
import Home from "./Home"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function Admin(props) {
    const { setAuthTokens } = useAuth();
    
    function logOut() {
        setAuthTokens();
        
    }
    const [collapsed, setcollapsed] = useState(false);
    

    return (
        <Provider store={store}>
            <Router>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={e => setcollapsed(e)}>
                
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<SettingOutlined />}>
                                <Link to="/admin">Admin Details Seting</Link>
            </Menu.Item>
                            <Menu.Item key="2" icon={<DesktopOutlined />}>
                                <Link to="/teacher">Manage Teacher</Link>
                               
            </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9" icon={<FileOutlined />} />
                </Menu>
            </Sider>
            <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 15, margin: '0 16px' }}><Avatar style={{ float: 'right' }} icon={<UserOutlined />} />
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        onClick={logOut} style={{ float: 'right', margin:'0 20px' }}
                    /></Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 400 }}>
                                
                                <Route exact path="/admin" component={AdminInfo} />
                                <Route exact path="/teacher" component={Teacher} />
            </div>
                </Content>
                <Footer style={{ textAlign: 'center', margin: '0 16px' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
                </Layout>
                </Router>
            </Provider>
    );
}

export default Admin;