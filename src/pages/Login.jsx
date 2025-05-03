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
                body: JSON.stringify({ email: userName, password }),
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

    const isFormValid = userName.trim() !== '' && password.trim() !== '';

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <form className="m-0 w-2/9 border-blue-300 p-10 rounded shadow-xl" onSubmit={handleSubmit}>
                <div className='flex justify-between mb-5'>
                    <label className='text-gray-600'>User Name</label>
                    <input
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900 placeholder-gray-400'
                        type="text"
                        value={userName}
                        onChange={handleUserName}
                        placeholder="Enter user name"
                    />
                </div>
                <div className='flex justify-between mb-5'>
                    <label className='text-gray-600'>Password</label>
                    <input
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900 placeholder-gray-400'
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        placeholder="Enter password"
                    />
                </div>
                <div className='flex justify-around mb-2'>
                    {/* <input className='border rounded-2xl bg-blue-400 text-white px-3 py-1 cursor-pointer hover:bg-blue-600 ' type="submit" name="Submit" /> */}
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`px-4 py-2 mt-2 rounded transition-colors duration-200 ${isFormValid
                                ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Submit
                    </button>
                </div>
                <div className='flex justify-center'>
                    <a className='text-blue-500 me-2' href="/signup">Click here</a>
                    <span className='text-gray-500'> if not signed In</span>
                </div>
            </form>
        </div>

    )
}
