import React, {useState, useEffect} from 'react'
import {Card, CardHeader, CardHeaderTitle, CardContent, CardFooter, Field, Label, Control, Input, Button} from 'bloomer'
import {useHandleSignIn, validateUserInfo, loginUser} from './service'
import { client } from '../services/apolloClient';
import {SignIn} from '../services/queries'
import { useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
       const isInformationValid = validateUserInfo(user, password);
        if(isInformationValid) {
            handleLoginQuery();
        }
    }

    const handleLoginQuery = async() => {
        const handleLogin = await loginUser(user, password);
        if(!handleLogin) {
            alert('Invalid User/Password')
        }  else {
            history.push('/dashboard')
        } 
    }

    return (
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
                <Button isColor="info" onClick={()=> {handleLogin()}}>
                    Login
                </Button>
            </CardFooter>
        </Card>
    )
}
