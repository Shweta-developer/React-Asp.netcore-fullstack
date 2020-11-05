import React, {  useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/student";
import { Table } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'user',
        key: 'user',
        render:( record) => (
        <p>{record.firstName}</p>   
)   
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    }
];
const StudentList = ({ ...props }) => {
    var newArr1 = []
    useEffect(() => {
        console.log("Student1 call")
        props.fetchAllStudent()
    }, [])
    if ((props.studentList?.sId)) {
        return <p>Loading...</p>
    }
    else {
        newArr1 = props.studentList.filter(city => city.classId == props.ClassId);
        console.log("arr1", newArr1, props.ClassId)
    }
    return (<div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        <Table dataSource={newArr1} columns={columns} />
    </div>
    );
}

const mapStateToProps = state => ({
    studentList: state.student.list
})

const mapActionToProps = {

    fetchAllStudent: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(StudentList);