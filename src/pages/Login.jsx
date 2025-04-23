import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export default function Login() {
    const Navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const base_url = import.meta.env.VITE_API_URL;
    console.log(base_url, "base url")

    const handleUserName = (e) => {
        const value = e.target.value
        console.log(value)
        setUserName(value)
        console.log(userName, "username")
    }
    const handlePassword = (e) => {
        const value = e.target.value
        console.log(value)
        setPassword(value)
        console.log(userName, "username")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${base_url}/api/users/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email : userName, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const authHeader = response.headers.get('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                throw new Error('No Bearer token found');
            }

            const token = authHeader.split(' ')[1];

            Cookies.set('access_token', token, {
                expires: 1, 
                secure: true,
                sameSite: 'Strict',
            });

            Navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>User Name</label>
                <input
                    type='text'
                    value={userName}
                    onChange={handleUserName}
                    placeholder='Enter user name' /><br />
                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    onChange={handlePassword}
                    placeholder='Enter password name' /><br />
                <input type='submit' name='Submit' />
            </form>
            <a href='/signup' >Click here</a><span> if not signed In</span>
        </div>
    )
}
