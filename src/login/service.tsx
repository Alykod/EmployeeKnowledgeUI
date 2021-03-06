import { useQuery } from '@apollo/react-hooks';
import { SignIn, CreateNewUser } from '../services/queries'
import { ApolloError } from 'apollo-boost'
import { client } from '../services/apolloClient';

interface Login {
    login: LoginData
}

interface LoginData {
    token: string,
    tokenExpiration: number,
    userId: string
}


export function useHandleSignIn(email: String, password: String) {
    const { loading, error, data }: { loading: boolean, error?: ApolloError | undefined | null, data: Login | null | undefined } = useQuery(SignIn, { variables: { email: email, password: password } })
    if (error) {
        return { error: true, loading }
    }
    const tokenData = data && data.login
    // dispatch({type:"SET_TOKEN", payload: {data}})


    return { tokenData, error: false, loading }

}


export function validateUserInfo(email: String, password: String) {
    const emailValidatorRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const emailCheck = emailValidatorRegex.test(String(email).toLowerCase());

    if (emailCheck && password !== "") {
        return true
    }

    else return false
}

export const useLoginUser = async(email: String, password: String) => {
    try {
        let result = await client.query({
            query: SignIn,
            variables: {
                email: email,
                password: password
            }
        })
        localStorage.setItem("token", result.data.login.token);
        
        return result.data.login.userId
    } catch (err) {
        console.log(err)
        return false
    }
}

export const useSignUp = async(email: String, password: String, firstName: String, lastName: String, fullTimeEmployee: Boolean, city: String, state: String, role: String) => {
    try {
        let result = await client.mutate({
            mutation: CreateNewUser,
            variables: {
                email: email,
                password: password,
                firstName,
                lastName,
                fullTimeEmployee,
                city,
                state,
                role
             }
        })
        localStorage.setItem("token", result.data.CreateUser.token);
         return result.data.CreateUser.userId
    } catch (err) {
        console.error(err)
        return false
    }
}