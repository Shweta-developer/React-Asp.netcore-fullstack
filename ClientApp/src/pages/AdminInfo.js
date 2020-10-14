import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/admin";
import { Divider } from 'antd';


const AdminInfo = ({  ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchByIdAdmin(localStorage.getItem('userid'))
    }, [])//componentDidMount

    return (
        <div><Divider orientation="left">Admin Details</Divider>
            </div>
    );
}

const mapStateToProps = state => ({
    adminList: state.admin.list
})

const mapActionToProps = {
    fetchByIdAdmin: actions.fetchById
    
}

export default connect(mapStateToProps, mapActionToProps)(AdminInfo);