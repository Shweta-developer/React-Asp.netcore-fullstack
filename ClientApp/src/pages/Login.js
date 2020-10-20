import React, { useState } from "react";
import { Link, Redirect,Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from '../PrivateRoute';
import axios from 'axios';
import logoImg from "../img/logo.jpg";
import { Card, Logo, Form, Input, Button, Error } from "../components/AuthForms";
import { useAuth } from "../context/auth";
import User from "./User";
import Admin from "./Admin";





function Login(props) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();
    //const referer = props.location.state.referer || '/login';

    function postLogin() {
        axios.post("http://localhost:58059/Users/authenticate/", {
            username: userName,
            Password: password
        }).then(result => {
            if (result.status === 200) {


                localStorage.setItem('myValueInLocalStorage', result.data.role);
                localStorage.setItem('userid', result.data.id);

                console.log(localStorage.getItem('myValueInLocalStorage'));
                setAuthTokens(result.data);
                setLoggedIn(true);


            } else {
                setIsError(true);
            }
        }).catch(e => {
            setIsError(true);
        });
    }
    if (isLoggedIn && (localStorage.getItem('myValueInLocalStorage') === 'admin')) {

        console.log(localStorage.getItem('myValueInLocalStorage'))
        return <Redirect to="/admin" />;
    }
    else if (isLoggedIn && (localStorage.getItem('myValueInLocalStorage') === 'user')) {
        return <Redirect to="/user" />;
    }
    
    
    
    
        
        



    return (
        
        <Card>
            <Logo src={logoImg} />
            <Form>
                <Input
                    type="username"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder="email"
                />
                <Input
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                />
                <Button onClick={postLogin}>Sign In</Button>
            </Form>
            <Link to="/signup">Don't have an account?</Link>
            {isError && <Error>The username or password provided were incorrect!</Error>}
            </Card>
            
            
            
            
            
    );
}

export default Login;