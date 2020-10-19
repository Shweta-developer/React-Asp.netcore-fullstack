import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/teacher";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup } from "@material-ui/core";
import TeacherForm from "./TeacherForm";
import { Space, Card } from 'antd';
import { Menu } from 'antd';
import { Button } from 'antd';
import * as actions1 from "../actions/user";
import { notification } from 'antd';
import {
    DeleteOutlined

} from '@ant-design/icons';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Teacher = ({ ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const val =[]
    const columns = [
        {
            title: 'Name',
            dataIndex: " user ",
            render: user => (<p>{console.log(props.teacherList.user)}
            </p>),
            
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },

    ];

    useEffect(() => {
        console.log("teacher call")
        props.fetchAllTeacher()
    }, [currentId])//componentDidMount

    const handleClick = e => {
        console.log('click ', e);
    }
    const onDelete = id => {
        setCurrentId(id)
        const args = {
            message: 'Update Notification ',
            description:
                'Successfully Updated',
            duration: 0,
        };
        const onSuccess = () => {
            notification.open(args);
        }
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteUser(id, () => onSuccess())
    }
    
    return (
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        <Space direction="vertical" align="center">
                <Menu
                    onClick={handleClick}
                    style={{ width: 600,height:"auto" }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <MailOutlined />
                                <span>Add Teachers</span>
                            </span>
                        }
                    >
                        <TeacherForm  {...({ currentId, setCurrentId })} />

                    </SubMenu>
                    

                </Menu>
                <Menu
                    onClick={handleClick}
                    style={{ width: 600, height: "auto" }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <MailOutlined />
                                <span>Add Teachers</span>
                            </span>
                        }
                    >
                
                
                    
                    <TableContainer>
                        <Table>
                            <TableHead >
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.teacherList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>{record.email}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.user.id)}></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                            
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    
                    </SubMenu>


                </Menu>
               
            </Space>
            </div>
            
        
    );
}

const mapStateToProps = state => ({
    teacherList: state.teacher.list,
    userList: state.user.list
})

const mapActionToProps = {
    fetchAllTeacher: actions.fetchAll,
    deleteUser: actions1.Delete
}

export default connect(mapStateToProps, mapActionToProps)(Teacher);