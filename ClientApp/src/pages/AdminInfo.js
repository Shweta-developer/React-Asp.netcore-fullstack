import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/admin";
import { Divider } from 'antd';
import { notification } from 'antd';

import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';
import {
    EditFilled, UserOutlined, MailOutlined, HomeOutlined, PhoneOutlined
    
} from '@ant-design/icons';

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
const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);

const AdminInfo = ({ ...props }) => {
    const [disabled, setdisabled] = useState(true)
    const enable = () => {
        setdisabled(false);
    }
    const [aId, setaid] = React.useState(0);
    const [adminuserref, setadminuserref] = React.useState(0);
    const [username, setusername] = React.useState('');
    const [schoolName, setschool] = React.useState('');
    const [email, setemail] = React.useState('');
    const [firstName, setfirstname] = React.useState('');
    const [lastName, setlastname] = React.useState('');
    const [phoneNumber, setphoneNumber] = React.useState('');


    useEffect(() => {
        console.log("admin call")


        props.fetchByIdAdmin(localStorage.getItem('userid'))
        console.log(props.adminList)

        //console.log(props.adminList)
        // const val = JSON.parse(localStorage.getItem('tokens'))
        // const { username, firstName, lastName, role } = val
        // setusername(username)


    }, [])//componentDidMount
    //const [disabled, setDisabled] = useState(false);

    // function handleGameClick() {
    //     setDisabled(!disabled);
    //  }
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
        //console.log(rest);
    };

    const formval = (list) => {
        const { aId,schoolName, email, phoneNumber, ...rest } = list;
        const { user: {firstName,lastName,username,...val } }=rest
        setschool(schoolName)
        setemail(email)
        setusername(username)
        setlastname(lastName)
        setfirstname(firstName)
        setphoneNumber(phoneNumber)
        setaid(aId)
        console.log(phoneNumber)
    }

    const changefirstname = () => {
        setfirstname(firstName)
        return firstName
    }
    const [form] = Form.useForm();
    const onFill = () => {
        form.setFieldsValue({
            
            lastName: props.adminList.user.lastName,
            firstName: props.adminList.user.firstName,
            username: props.adminList.user.username,
            phoneNumber: props.adminList.phoneNumber,
            schoolName: props.adminList.schoolName,
            email:props.adminList.email
            
        });
    };
    return (
        <div style={{ textAlign: "left" }}>


            <Divider orientation="left">Admin Details</Divider>


            <Form {...layout} form={form} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish} >
                
                
                <Form.Item
                    name="firstName"
                    label="first Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true }]}
                >
                    <Input  />
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
                    <Button type="primary" htmlType="submit" >
                        Submit
        </Button>
                    
                    
                    <Button type="link" htmlType="button" onClick={onFill}>
                        Fill form
        </Button>
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