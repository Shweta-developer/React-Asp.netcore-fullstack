import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import User from "./pages/User";
import { AuthContext } from "./context/auth";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import "./custom.css";



function App(props) {
    const [authTokens, setAuthTokens] = useState();
    
    
    const setTokens = (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setAuthTokens(data);
    }
    

    


    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router>
                
                <div>
                  
                    
                    {console.log(localStorage.getItem('myValueInLocalStorage'))}
                    
                        <ul>
                            {
                                {
                                    'admin': <Redirect to="/admin" />,
                                    'user': <Redirect to="/user" />

                                }[localStorage.getItem('myValueInLocalStorage')]
                            }




                        </ul> 
                        
                        

                    
                    
                    
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    {
                        {
                            'admin': <PrivateRoute exact path="/admin" component={Admin} />,
                            'user': <PrivateRoute exact path="/user" component={User} />
                            
                        }[localStorage.getItem('myValueInLocalStorage')]
                        }
                    
                   
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;