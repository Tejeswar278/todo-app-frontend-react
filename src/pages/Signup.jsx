import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export default function Signup() {
    const Navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
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
    const handleUserName = (e) => {
        const value = e.target.value
        console.log(value)
        setUserName(value)
        console.log(userName, "username")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${base_url}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userName, email : userEmail, password, mobile, gender }),
            });
            console.log(response)
            if (!response.ok) {
                console.log(response.error,"response error")
                throw new Error(response.error);
            }

            Navigate('/');
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
                <label>User Email</label>
                <input
                    type='text'
                    value={userEmail}
                    onChange={setUserEmail}
                    placeholder='Enter user email' /><br />
                <label>Password</label>
                <input
                    type='password'
                    value={password}
                    onChange={handlePassword}
                    placeholder='Enter password name' /><br />
                <label>Mobile</label>
                <input
                    type='number'
                    value={mobile}
                    onChange={setMobile}
                    placeholder='Enter mobile' /><br />
                <label>Gender</label>
                <input
                    type='text'
                    value={gender}
                    onChange={setGender}
                    placeholder='Enter gender' /><br />
                <input type='submit' name='Submit' />
            </form>
        </div>
    )
}
