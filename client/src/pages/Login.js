import React from 'react'
import { useMutation } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';


export default function Login() {

    const POST_LOGIN = gql`
        mutation Login($loginData: loginData!) {
            login(loginData: $loginData)
            {
                success
                error { msg }
            }
        }
    `;

        let [login] = useMutation(POST_LOGIN);

        
    const submitLogin = () =>
    {
        login({
            variables: {
                loginData: {
                    email: "was@gmail.cc",
                    password: "123"
                }
            }
        }).then(res => {
            console.log(res)
        }).catch(e =>{
            console.error('LOGIN_ERROR: ', e)
        })
    }

    return (
        <div>

            <button onClick={submitLogin} className='bg-gray-800 text-gray-400 px-3 py-2 rounded'> Login </button>
        </div>
    )
}
