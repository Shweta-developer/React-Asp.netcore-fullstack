import React, {  useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/admin";
import {
    Form,
    Input,
    Button, notification, Divider
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


const AdminInfo = ({ ...props }) => {
    const [aId, setaid] = React.useState(0);
    const [adminuserref, setadminuserref] = React.useState(0);

    useEffect(() => {
        console.log("admin call")
        props.fetchByIdAdmin(localStorage.getItem('userid'))
        console.log(props.adminList)

    }, [])//componentDidMount
    if (props.adminList?.aId === null) {
        return <p> Loading</p>
    }

   
    const onFinish = (values) => {
        const { aId, adminUserRef, ...others } = props.adminList;
        setaid(aId)
        setadminuserref(localStorage.getItem('userid'))
        const args = {
            message: 'Update Notification ',
            description:
                'Successfully Updated',
            duration: 0,
        };
        const onSuccess = () => {
            notification.open(args);
        }
        const { email, schoolName, phoneNumber,  ...rest } = values;
        const val = {
            aId,
            email,
           phoneNumber,
            schoolName,
            adminUserRef
        }
        console.log(val)
        props.updateAdmin(aId, val, onSuccess)
    };

    const [form] = Form.useForm();
    const onFill = () => {
        form.setFieldsValue({
            lastName: props.adminList?.user?.lastName,
            firstName: props.adminList?.user?.firstName,
            username: props.adminList?.user?.username,
            phoneNumber: props.adminList?.phoneNumber,
            schoolName: props.adminList?.schoolName,
            email: props.adminList?.email
        });
    };
    return (
        <div style={{ textAlign: "left" }} style={{backgroundColor:'white'}}>
            <Divider orientation="left">Admin Details</Divider>
            <Form {...layout} form={form} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish} >
                <Form.Item
                    name="firstName"
                    label="first Name"
                    rules={[{ required: true }]}
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true }]}
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true }]}
                >
                    <Input disabled/>
                </Form.Item>
                <Divider orientation="left">Contact Details</Divider>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, type: 'number'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="schoolName"
                    label="School Name"

                >
                    <Input />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button type="link" htmlType="button" onClick={onFill}>Fill form</Button>
                </Form.Item>
            </Form>
        </div>
    );
}


const mapStateToProps = state => ({
    adminList: state.admin.list
})

const mapActionToProps = {
    fetchByIdAdmin: actions.fetchById,
    updateAdmin: actions.update
    
}

export default connect(mapStateToProps, mapActionToProps)(AdminInfo);