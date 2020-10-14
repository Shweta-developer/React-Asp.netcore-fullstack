import React from "react";
import { Button } from "../components/AuthForms";
import { useAuth } from "../context/auth";

function User(props) {
    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
        
    }

    return (
        <div>
            <div>User Page</div>
            <Button onClick={logOut}>Log out</Button>
        </div>
    );
}

export default User;