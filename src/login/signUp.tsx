import React, {useState} from 'react'
import Field from './field'
import RadioSelector from './radioSelector'
import { useSignUp } from './service'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    // const [country, setCountry] = useState("");
    const [fullTimeEmployee, setFullTimeEmployee] = useState(true);
    const [role, setRole] = useState(false)
    const [roleName, setRoleName] = useState("unassigned");
     const history = useHistory();
    const dispatch = useDispatch();

    const handleValueChange =(value: string | boolean, type: any)=> {
        type(value);
    }
    const handleRoleChange = (value: boolean, type: any) => {
        let role = ""
        if(value === true) {
            role = "Admin"
            setRole(true);
            setRoleName(role)
        } else {
            role = "unassigned"
            setRole(value);
            setRoleName(role)

        }
    }

    const handleSignUp = () => {
        HandleLogin();
    }

    function HandleDispatchUser(userId: string) {
        dispatch({ type: "USER_DETAILS", payload: userId })
        history.push("/dashboard");
    }

    async function HandleLogin() {
        const signup = await useSignUp(email, password, firstName, lastName, fullTimeEmployee ,city, state, roleName);
        if(signup) {
            HandleDispatchUser(signup);
       } else {
           alert("Error Signing up. Please try again");
       }
    }

    return (
        <section className="container">
            <div className="columns column is-6 is-offset-3 box">
             <form className="container">
                 <div className="columns">
                     <div className="column is-10 is-offset-1">
                        <h3 className="title is-3">Register</h3>
                     </div>
                 </div>
                <hr/>
                <Field title="Email Address" value={email} type={setEmail} handleInputChange={handleValueChange}/>
                <Field title="Password" isPassword value={password} type={setPassword} handleInputChange={handleValueChange}/>
                <Field title="First Name" value={firstName} type={setFirstName} handleInputChange={handleValueChange}/>
                <Field title="Last Name" value={lastName} type={setLastName} handleInputChange={handleValueChange}/>
                <Field title="City" value={city} type={setCity} handleInputChange={handleValueChange}/>
                <Field title="State" value={state} type={setState} handleInputChange={handleValueChange}/>
                {/* <Field title="Country" value={country} type={setCountry} handleInputChange={handleValueChange}/> */}
                <RadioSelector value={fullTimeEmployee} type={setFullTimeEmployee} handleInputChange={handleValueChange} firstValue="Full Time" secondValue="Contractor"/>
                <RadioSelector value={role} type={setRole} handleInputChange={handleRoleChange} firstValue="TPS" secondValue="Employee"/>
                <div className="column">
                <button className="button is-block is-info is-large is-fullwidth is-info" onClick={(e) => {
                    e.preventDefault()
                    handleSignUp()}}>
                Sign Up<i className="fa fa-sign-in" aria-hidden="true"></i>
                </button>
                </div>
                 </form>
            </div>
        </section>
    )
}

export default SignUp