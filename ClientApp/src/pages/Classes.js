import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/teacherclasses";
import * as actions1 from "../actions/classes";
import Classesform from "./Classesform";
import { notification } from 'antd';
import { Card, Tag } from 'antd';
import {
    Row,
    Col,
    Button,
} from 'antd';
import { DeleteOutlined} from '@ant-design/icons';

const Classes = ({ ...props }) => {
    const [currentId,setcurrentId]=useState(0)
    const classnamearray=[]
    
    useEffect(() => {
        console.log("teacherclasses call")
        props.fetchAllTeacherClasses()
    }, [currentId])
    
    if (!Array.isArray(props.teacherclassesList)) {
        return <p>Loading</p>
    }
    function checkForDuplicates(cId) {
        let valuesAlreadySeen=[]

        for (let i = 0; i < props.teacherclassesList.length; i++) {
            let value = props.teacherclassesList[i].cId
            let values = props.teacherclassesList[i].teacher?.email
            
            if (cId === value) {
                valuesAlreadySeen.push(values)
            }
        }
        return valuesAlreadySeen
    }
    const onDelete = (id)=>
{
        console.log(id)
        const args = {
            message: 'Update Notification ',
            description:
                'Successfully Updated',
            duration: 0,
        };
        const onSuccess = () => {
            notification.open(args);
            setcurrentId(currentId => currentId + 1)
        }
        if (window.confirm('Are you sure to delete this record?')) {
            props.deleteClasses(id, () => onSuccess())
            
        }
    }
   
    return (
        <div style={{ textAlign: "left" }} style={{ backgroundColor: 'white' }}>
            <Classesform {...({ currentId, setcurrentId })}/>
            <Row gutter={16}>
                <Col span={8}>
                    {  
                        props.teacherclassesList.map((record, index) => {
                            return (
                                !(classnamearray.includes(record.cId)) &&
                                <Card key={record.cId} title={record.classInfo?.className} bordered={false} extra={<Button icon={<DeleteOutlined />} onClick={() => onDelete(record.cId)} ></Button>}>
                                    {
                                        console.log(classnamearray.push(record.cId))
                                    }
                                    <div>
                                        <Tag color="#87d068">{record.classInfo?.schoolYear?.year}</Tag>
                                        </div>
                                    <div>
                                        {
                                            checkForDuplicates(record.cId).map((teachers) => <div><Tag color="#f50">{teachers}</Tag></div>) 
                                        }
                                        </div>
                                </Card>
                            )
                        })}
                </Col>
                </Row>
        </div>
    );
}


const mapStateToProps = state => ({
    teacherclassesList: state.teacherclasses.list,
    classList: state.classes.list
})

const mapActionToProps = {
    fetchAllTeacherClasses: actions.fetchAll,
    deleteClasses: actions1.Delete,
}

export default connect(mapStateToProps, mapActionToProps)(Classes);