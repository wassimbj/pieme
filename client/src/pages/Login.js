import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Input from './../components/form/Input';
import {Redirect} from 'react-router-dom';

export default function Login() {

    const POST_LOGIN = gql`
        mutation Login($loginData: loginData!) {
            login(loginData: $loginData)
            {
                success
                error
            }
        }
    `;

    let [login] = useMutation(POST_LOGIN);


    // State
    let [loginData, setLoginData] = useState({email: '', password: ''});
    let [response, setResponse] = useState({error: null, success: false});

    const handleInputChange = name => e => {
        // console.log(name ,' = ', e.target.value
        let inputVal = e.target.value;
        setLoginData(prevData => ({
            ...prevData,
            [name]: inputVal
        }))
    }
        
    const submitLogin = () =>
    {
        login({
            variables: {
                loginData: loginData
            }
        }).then(res => {
            console.log(res);
            setResponse({
                success: res.data.login.success,
                error: res.data.login.error ? JSON.parse(res.data.login.error)[0] : null
            });
        }).catch(e =>{
            console.error('LOGIN_ERROR: ', e);
        })
    }
    // console.log(error)

    return (
        <div>

            <div className='w-full md:w-2/4 mx-auto mt-32'>
                <h1 className='text-center mb-8 text-xl text-gray-600'> Login into your account </h1>
                {
                    response.success ?
                        window.location.pathname = '/'
                    :
                        null
                }

                {
                    response.error?.noAccount ? 
                        <div className='bg-red-600 text-gray-200 p-2 mb-4 rounded'> {response.error.noAccount.msg} </div>
                    :
                        null
                }

                <Input
                    name='email'
                    placeholder='email'
                    type='email'
                    changeEvent={handleInputChange}
                    submitRes={response}
                />
                {
                    response.error?.email ?
                        <p className='text-red-500 text-xs mt-1'> {response.error.email.msg} </p>
                    :
                        null
                }
                
                <Input
                    name='password'
                    placeholder='password'
                    type='password'
                    changeEvent={handleInputChange}
                    submitRes={response}
                    className='mt-5'
                />
                {
                    response.error?.password ?
                        <p className='text-red-500 text-xs mt-1'> {response.error.password.msg} </p>
                    :
                        null
                }

                <button onClick={submitLogin} className='w-full block mt-10 bg-gray-800 hover:bg-gray-900 shadow text-gray-400 px-3 py-2 rounded'> Login </button>
            </div>

        </div>
    )
}
