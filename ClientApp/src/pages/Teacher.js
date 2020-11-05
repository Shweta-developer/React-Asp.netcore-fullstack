import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/teacher";
import { Table } from 'antd';
import TeacherForm from "./TeacherForm";
import { Menu } from 'antd';
import { Button } from 'antd';
import * as actions1 from "../actions/user";
import { notification } from 'antd';
import { Collapse } from 'antd';
import {
    DeleteOutlined, MailOutlined 

} from '@ant-design/icons';

const { Panel } = Collapse;
const Teacher = ({ ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    const columns = [
        {
            title: 'Name',
            dataIndex: 'user',
            key: 'user',
            render: (record) => (
                <p>{record.firstName}</p>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            dataIndex: 'user',
            key: 'user',
            render: (record) => <Button icon={<DeleteOutlined />} onClick={() => onDelete(record.id)}></Button>}
        
    ];

    useEffect(() => {
        console.log("teacher call")
        props.fetchAllTeacher()
        console.log(props.teacherList)
    }, [currentId])//componentDidMount
    if (props.teacherList.tId === null) {
        return <p>Loading...</p>
    }
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
            <Collapse defaultActiveKey={['1']}>
                <Panel header="Add Teacher" key="1">
                    <TeacherForm  {...({ currentId, setCurrentId })} />
                </Panel>
                <Panel header="Existing Teachers" key="2">
                    <Table dataSource={props.teacherList} columns={columns} />     
                        
                </Panel>
            </Collapse>
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