import React, { ReactComponentElement } from 'react'
import Dashboard from '../../dashboard/'
import Login from '../../login'
import MyAccount from '../../userProfile'
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

const history = createBrowserHistory();


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
            return decoded
        }
    }
    
}

const PrivateRoute = ({component, path, history}:{component: React.FC; history: any; path: string}) => {
    const handleAuth = isAuth();
    const finalComponent = handleAuth ? component : Login;
    return <Route history={history} path={path} component={finalComponent} />
}


// const handleAuthRoute = (Component: React.FC) => {
//     debugger;
//     let handleAuth = isAuth();
//     if(!handleAuth) {
//         history.push("/")
//         return <Login />
//     } else {
//         if(handleAuth.role === "Admin") {
//             return <Component/>
//         } else {
//             return <MyAccount/>
//         }
//     }
//     // return (handleAuth ? <Component /> : <Redirect to="/"/>)
// }


const Navigation = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" history={history} component={Login} />
                <PrivateRoute path="/Dashboard" history={history} component={Dashboard}/>
                <PrivateRoute path="/MyAccount" history={history} component={MyAccount}/>
                    
                {/* <Route render={() => handleReRoute()} /> */}
            </Switch>
        </Router>
    )
}


export default Navigation