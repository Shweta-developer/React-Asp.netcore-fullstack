import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions1 from "../actions/classes";
import StudentList from './StudentList';
import StudentForm from './StudentForm';
import { notification } from 'antd';
import { Tabs } from 'antd';
import { Collapse } from 'antd';
import { store1 } from "../actions/store1";
import { Provider } from "react-redux";
const { Panel } = Collapse;
const { TabPane } = Tabs;

const Student = ({ ...props }) => {
    const [ClassId, setClasstId] = useState(0)
    const [count, setcount] = useState(0)
    var newArr = []
    const callback = (key) => {
        console.log(key);
        setClasstId(key)
    }
    useEffect(() => {
        console.log("Student call")
        props.fetchAllClass()
    }, [])//componentDidMount

    const onDelete = id => {
        //setCurrentId(id)
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
    if (!(Array.isArray(props.classList))) {
        return <p>Loading...</p>
    }
    else {
        if (!newArr?.length ) {
            newArr = props.classList.slice();  
        } 
    }
    if (ClassId===0) {
        setClasstId(props.classList[0]?.cId)
    }

    return (<div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        <Collapse defaultActiveKey={['1']}>
            <Panel header="This is panel header 1" key="1">
                <StudentForm/>
            </Panel>
            <Panel header="This is panel header 2" key="2">
                <Tabs onTabClick={callback} >
                {  
                        newArr.map((record, index) => {
                        return (
                            <TabPane tab={record?.className} key={record?.cId} >
                                <Provider store={store1}>
                                <StudentList {...({ ClassId, setClasstId })}/>   
                                </Provider>   
                            </TabPane> 
                        )
                    })} </Tabs>
            </Panel>
        </Collapse>
    </div>
    );
}

const mapStateToProps = state => ({
    classList: state.classes.list,
})

const mapActionToProps = {
    fetchAllClass: actions1.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(Student);