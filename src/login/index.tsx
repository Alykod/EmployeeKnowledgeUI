import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardHeaderTitle, CardContent, CardFooter, Field, Label, Control, Input, Button } from 'bloomer'
import { useHandleSignIn, validateUserInfo, useLoginUser } from './service'
import { client } from '../services/apolloClient';
import { SignIn } from '../services/queries'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
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
        history.push("/myaccount");
    }

    async function HandleLogin() {
        const loginer = await useLoginUser(user, password);
        if (loginer) {
            HandleDispatchUser(loginer)
        } else {
            alert("invalid user")
        }
    }

    return (
        <section className="hero is-fullheight ">
            <div className="hero-body">
                <div className="container has-text-centered">
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
                            <a href="../">Sign Up</a> &nbsp;·&nbsp;
                        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                        <a href="../">Need Help?</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


{/* 
<Card>
            <CardHeader>
                <CardHeaderTitle>
                    Employee Skills Platform
                </CardHeaderTitle>
            </CardHeader>
            <CardContent>
            <Field>
                <Label>
                    Email
                </Label>
                <Control>
                    <Input type="text" placeholder="Enter your email address" value={user} onChange={(event: any) => setUser((event.target as HTMLInputElement).value)}/>
                </Control> 
            </Field>
            <Field>
                <Label>
                    Password
                </Label>
                <Control>
                    <Input type="password" placeholder="Enter your Password" minLength={8} value={password} onChange={(event: any) => setPassword((event.target as HTMLInputElement).value)}/>
                </Control>
            </Field>
            </CardContent>
            <CardFooter>
                <Button isColor="info" onClick={()=> handleLogin()}>
                    Login
                </Button>
            </CardFooter>
        </Card> */}