import React, { useState, useEffect } from 'react'
import {  Button } from 'bloomer'
import { useHandleSignIn, validateUserInfo, useLoginUser } from './service'
import { client } from '../services/apolloClient';
import { SignIn } from '../services/queries'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SignUp from './signUp';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [registration, setRegistration] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const isInformationValid = validateUserInfo(user, password);
        if (isInformationValid) {
            HandleLogin();
        } else {
            alert("Invalid User/Password")
        }
    }
    function HandleDispatchUser(userId: string) {
        dispatch({ type: "USER_DETAILS", payload: userId })
        return history.push("/MyAccount");
    }

    async function HandleLogin() {
        const loginHandler = await useLoginUser(user, password);
        if (loginHandler) {
            HandleDispatchUser(loginHandler)
        } else {
            alert("invalid user")
        }
    }

    return (
        <section className="hero is-fullheight ">
            <div className="hero-body">
                {!registration && <div className="container has-text-centered">
                    <div className="column is-4 is-offset-4">
                        <h3 className="title has-text-black">Login</h3>
                        <hr className="login-hr" />
                        <div className="box">
                            <form>
                                <div className="field">
                                    <div className="control">
                                        <input className="input is-large" type="email" placeholder="Your Email" value={user} onChange={(event: any) => setUser((event.target as HTMLInputElement).value)} />
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="control">
                                        <input className="input is-large" type="password" placeholder="Your Password" value={password} onChange={(event: any) => setPassword((event.target as HTMLInputElement).value)} />
                                    </div>
                                </div>
                                <Button className="button is-block is-info is-large is-fullwidth" isColor="info" onClick={() => handleLogin()}>
                                    Login<i className="fa fa-sign-in" aria-hidden="true"></i>
                                </Button>
                                {/* <button className="button is-block is-info is-large is-fullwidth" onClick={()=> handleLogin()}>Login <i className="fa fa-sign-in" aria-hidden="true"></i></button> */}
                            </form>
                        </div>
                        <p className="has-text-grey">
                            <a href="SignUp" onClick={(e)=> {
                                e.preventDefault();
                                setRegistration(true);
                            }}>Sign Up</a> &nbsp;·&nbsp;
                            {/* <a href="../">Forgot Password</a> &nbsp;·&nbsp; */}
                        </p>
                    </div>
                </div>}
                {registration && <SignUp />}
            </div>
        </section>
    )
}