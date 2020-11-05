import React, { useState, Suspense} from "react";
import { BrowserRouter as Router, NavLink,Link, Route } from "react-router-dom";
import { useAuth } from "../context/auth";
import AdminInfo from "./AdminInfo";
import Teacher from "./Teacher";
import Classes from "./Classes";
import Student from "./Student";
import { Avatar } from 'antd';
import { Layout, Menu,  Dropdown } from 'antd';
import {
    DesktopOutlined,
    SettingOutlined,
    UserOutlined,
    DownOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import { store } from "../actions/store";
import { Provider } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

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
                        <Dropdown overlay={menu} style={{float: 'right', margin: '-15px 20px '}}>
                            <a className="ant-dropdown-link" style={{float: 'right', margin: '-15px 20px' }} onClick={e => e.preventDefault()}>
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
                                    <Menu.Item key="3" icon={< UsergroupAddOutlined /> }>
                                        <Link to="/classes">Manage Classes</Link>
                                    </Menu.Item>
                                    <Menu.Item key="4" icon={< UserOutlined />}>
                                        <Link to="/students">Manage STudents</Link>
                                    </Menu.Item>
                            </Menu>
                        </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                                <Route exact path="/admin" component={AdminInfo} />
                                <Route exact path="/teacher" component={Teacher} />
                                <Suspense fallback={<div>Loading Component</div>}> <Route path="/classes" component={Classes} /></Suspense>
                                <Route exact path="/students" component={Student} />
                            </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
                </Router>
            </Provider>
    );
}

export default Admin;