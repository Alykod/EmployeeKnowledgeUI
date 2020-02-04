import React, { ReactComponentElement } from 'react'
import Dashboard from '../../dashboard/'
import Login from '../../login'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { createBrowserHistory } from "history";

import JwtDecode from 'jwt-decode'


const isAuth = ()  => {
    const token: string | null = localStorage.getItem("token");
    if(!token) {
        return false
    } else {
        const decoded: any = JwtDecode(token);
        let currentTime = new Date().getTime() / 1000;
        if(currentTime > decoded.exp) {
            localStorage.removeItem("token");
            return false
        } else {
            return true
        }
    }
    
}


const handleAuthRoute = (Component: React.FC) => {
    let handleAuth = isAuth();
    return (handleAuth ? <Component /> : <Redirect to="/"/>)
}




const Navigation = () => {
    const history = createBrowserHistory();
    return (
        <Router>
            <Switch>
                <Route exact path="/" history={history}>
                    <Login />
                </Route>
                <Route path="/dashboard" history={history}>
                    {handleAuthRoute(Dashboard)}
                </Route>
            </Switch>
        </Router>
    )
}


export default Navigation