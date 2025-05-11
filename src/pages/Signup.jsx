import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import user_icon from '../../public/R 2.png';

export default function Signup() {
    const Navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const base_url = import.meta.env.VITE_API_URL;
    console.log(base_url, "base url")

    const togglePassword = () => setShowPassword(prev => !prev);

    const handleUserName = (e) => {
        const value = e.target.value
        setUserName(value)
    }
    const handleUserEmail = (e) => {
        const value = e.target.value
        setUserEmail(value)
    }
    const handlePassword = (e) => {
        const value = e.target.value
        setPassword(value)
    }
    const handleMobile = (e) => {
        const value = e.target.value
        setMobile(value)
    }
    const handleGender = (e) => {
        const value = e.target.value
        setGender(value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${base_url}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: userName, email: userEmail, password, mobile, gender }),
            });
            console.log(response)
            if (!response.ok) {
                console.log(response.error, "response error")
                throw new Error(response.error);
            }

            Navigate('/');
        } catch (error) {
            console.error('Login error:', error);
        }

    }

    const isFormValid = userName.trim() !== '' && password.trim() !== '' && userEmail.trim() !== '';

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-50'>
            <img src="/public/R 2.png" className='me-10'/>
            <form className='m-0 w-2/9 border-blue-300 p-10 rounded shadow-xl' onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold  mb-6">Sign Up</h2>
                <div className='flex justify-between mb-5'>
                    <label>User Name</label>
                    <input
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900 placeholder-gray-400'
                        type='text'
                        value={userName}
                        onChange={handleUserName}
                        placeholder='Enter user name' />
                </div>
                <div className='flex justify-between mb-5'>
                    <label>User Email</label>
                    <input
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900 placeholder-gray-400'
                        type='text'
                        value={userEmail}
                        onChange={handleUserEmail}
                        placeholder='Enter user email' />
                </div>
                <div className='flex justify-between mb-5'>
                    <label>Password</label>
                    <input
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900 placeholder-gray-400'
                        type='password'
                        value={password}
                        onChange={handlePassword}
                        placeholder='Enter password name' />
                    <button>Hide</button>
                </div>
                <div className='flex justify-between mb-5'>
                    <label>Confirm Password</label>
                    <input
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900 placeholder-gray-400'
                        type='password'
                        value={password}
                        onChange={handlePassword}
                        placeholder='Enter password name' />
                </div>
                <div className='flex justify-between mb-5'>
                    <label>Mobile</label>
                    <input
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900 placeholder-gray-400'
                        type='tel'
                        value={mobile}
                        onChange={handleMobile}
                        placeholder='123-45-678'
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        maxLength={10} />
                </div>
                <div className='flex justify-between mb-5'>
                    <label>Gender</label>
                    <select
                        className='border-b border-gray-300 focus:outline-blue-300 text-gray-900'
                        value={gender}
                        onChange={handleGender}
                    >
                        <option className='text-gray-900' value="Select Gender">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className='flex justify-around mb-2'>
                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`px-4 py-2 mt-2 rounded transition-colors duration-200 ${isFormValid
                            ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                    >Register</button>
                </div>
                <div className="text-center mt-4 text-sm">
                    <span className="text-gray-500">Already exist? </span>
                    <a className="text-blue-600 hover:underline" href="/">
                        Click here
                    </a>
                </div>
            </form>
            
        </div>
    )
}
