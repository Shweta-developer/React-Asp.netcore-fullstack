import React, { useState } from "react";
import { BrowserRouter as Router, NavLink,Link, Route, Switch } from "react-router-dom";
import { useAuth } from "../context/auth";
import AdminInfo from "./AdminInfo";
import Teacher from "./Teacher";
import { Avatar } from 'antd';
import { Layout, Menu, Breadcrumb, Dropdown } from 'antd';
import {
    DesktopOutlined,
    SettingOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    DownOutlined,
    LaptopOutlined,
    NotificationOutlined
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
    function logOut() {
        setAuthTokens();

    }
    const menu = (
        <Menu onClick={ logOut }>
            <Menu.Item key="1"  icon={<PoweroffOutlined />}>
                LogOut
    </Menu.Item>
         
        </Menu>
    );

    return (
        <Provider store={store}>
            <Router>
            <Layout >
                    <Header className="site-layout-background" style={{ marginTop: '-15px', padding: 15, width: '100%' }}>
                        <Dropdown overlay={menu} style={{
                            float: 'right', margin: '-15px 20px '
                        }}>
                            <a className="ant-dropdown-link" style={{
                                float: 'right', margin: '-15px 20px' 
                            }} onClick={e => e.preventDefault()}>
                                Hi Jane!! <DownOutlined />
                            </a>
                        </Dropdown>
                     <Avatar icon={<UserOutlined />} style={{ float: 'right', margin: '0 28px' }} />
                    <div className="logo" />
                    
                </Header>
                <Content style={{ padding: '0 0' }}>
                    
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider collapsible collapsed={collapsed} onCollapse={e => setcollapsed(e)}>

                                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
                                <Menu.Item key="1" icon={<SettingOutlined />}>
                                    <NavLink  to="/admin">Admin Details Setting</NavLink>
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
                        <Content style={{ padding: '0 24px', minHeight: 280 }}><Route exact path="/admin" component={AdminInfo} />
                            <Route exact path="/teacher" component={Teacher} /></Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
                </Router>
            </Provider>
    );
}

export default Admin;