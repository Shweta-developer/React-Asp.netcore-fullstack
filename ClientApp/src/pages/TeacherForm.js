import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/teacher";
import { notification } from 'antd';
import {
    Form,
    Input,
    Button,
} from 'antd';


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


const TeacherForm = ({ ...props }) => {

    const onFinish = values => {
        const {email,...rest }=values
        const val = { email, user: { ...rest, passwordHash: "", passwordSalt:"", role: "user" } }
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
        props.createTeacher(val, onSuccess)
    };
    return (
        <div style={{ textAlign: "left" }}>
                        <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish} >
                            <Form.Item
                                name="firstname"
                                label="First Name"
                                
                            >
                                <Input  />
                            </Form.Item>
                            <Form.Item
                                name="lastname"
                                label="Last Name"
                                
                            >
                                <Input name="lastname"  />
                            </Form.Item>
                            <Form.Item
                                name="username"
                                label="UserName"
                                
                            >
                                <Input  />
                            </Form.Item>
                           
                            <Form.Item
                                name='email'
                                label="Email"
                                rules={[{ type: 'email', message: 'not a validate email' }]}
                                
                            >
                                <Input  />
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
    teacherList: state.teacher.list
})

const mapActionToProps = {
    createTeacher: actions.create
}

export default connect(mapStateToProps, mapActionToProps)(TeacherForm);