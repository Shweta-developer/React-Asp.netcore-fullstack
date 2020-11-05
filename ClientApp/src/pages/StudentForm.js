import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/student";
import * as actions1 from "../actions/classes";
import { notification } from 'antd';
import {
    Form,
    Input,
    Select,
    Button,
} from 'antd';

const { Option } = Select;
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 9,
    },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const StudentForm = ({ ...props }) => {
    const [ClassId, setClassId] = React.useState(0);
    const onFinish = values => {
        const { email, ClassId, ...rest } = values
        const val = { email, ClassId, user: { ...rest, passwordHash: "", passwordSalt: "", role: "user" } }
        console.log(val);
        const args = {
            message: 'Update Notification ',
            description:
                'Successfully Updated',
            duration: 0,
        };
        const onSuccess = () => {
            notification.open(args);
        }

        props.createStudent(val, onSuccess)

    };
    const callClass = () => {
        props.fetchAllClass()
        console.log(props.classList)
    }
    const callSelect = e => {
        setClassId(e)
    }

    return (
        <div style={{ textAlign: "left" }}>
            <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish} >
                <Form.Item
                    name="firstName"
                    label="First Name"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                >
                    <Input name="lastname" />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="UserName"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name='email'
                    label="Email"
                    rules={[{ type: 'email', message: 'not a validate email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="ClassId"
                    label="Type"
                    rules={[{ required: true, message: 'Please choose the Class' }]}
                >
                    <Select placeholder="Please choose the Class" onClick={callClass} onSelect={callSelect}>
                        {
                            props.classList.map((record, index) => {
                                return (
                                    <Option key={index} value={record?.cId} label={record?.className}>
                                        {record?.className}
                                    </Option>)
                            })}
                    </Select>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const mapStateToProps = state => ({
    studentList: state.student.list,
    classList: state.classes.list
})

const mapActionToProps = {
    createStudent: actions.create,
    fetchAllClass: actions1.fetchAll,
}

export default connect(mapStateToProps, mapActionToProps)(StudentForm);