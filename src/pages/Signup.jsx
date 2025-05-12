import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import user_icon from '../../public/R 2.png';
import edit_user from '../../public/icon-park-solid_edit-name.png'
import user_email_icon from '../../public/ic_baseline-email.png'
import password_icon from '../../public/mdi_password.png';
import confirm_pass_icon from '../../public/mdi_password-outline.png'
import { Eye, EyeOff } from 'lucide-react';
import { CheckCircle, XCircle } from 'lucide-react';
import mobile_icon from '../../public/mdi_mobile-phone.png'
import female_icon from '../../public/tabler_gender-female.png'
import male_icon from '../../public/tabler_gender-male.png'
import gender_icon from '../../public/icons8_gender.png'

export default function Signup() {
    const Navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const base_url = import.meta.env.VITE_API_URL;
    console.log(base_url, "base url")

    const togglePassword = () => setShowPassword(prev => !prev);
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

    const isFormValid = firstName.trim() !== '' && password.trim() !== '' && userEmail.trim() !== '';

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-50'>
            <img src="/public/R 2.png" className='me-10' />
            <form className='m-0 w-2/9 border-blue-300 p-10 rounded shadow-xl bg-white relative' onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold  mb-6">Sign Up</h2>

                <div className="relative mb-6">
                    <img src={edit_user} alt="user" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="firstname"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className={`pl-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer`}
                    />
                    <label
                        htmlFor="username"
                        className={`absolute left-10 transition-all duration-200 
                    ${firstName ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                    peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        First Name
                    </label>
                </div>

                <div className="relative mb-6">
                    <img src={edit_user} alt="user" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="username"
                        type="text"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        required
                        className={`pl-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer`}
                    />
                    <label
                        htmlFor="username"
                        className={`absolute left-10 transition-all duration-200 
                    ${middleName ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                    peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        Middle Name
                    </label>
                </div>

                <div className="relative mb-6">
                    <img src={edit_user} alt="user" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="username"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className={`pl-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer`}
                    />
                    <label
                        htmlFor="username"
                        className={`absolute left-10 transition-all duration-200 
                    ${lastName ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                    peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        Last Name
                    </label>
                </div>

                <div className="relative mb-6">
                    <img src={user_email_icon} alt="user" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="firstname"
                        type="text"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                        className={`pl-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer`}
                    />
                    <label
                        htmlFor="username"
                        className={`absolute left-10 transition-all duration-200 
                    ${userEmail ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                    peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        User Email
                    </label>
                </div>

                <div className="relative mb-6">
                    <img src={password_icon} alt="password" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={`pl-10 pr-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer`}
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-10 transition-all duration-200 
                    ${password ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                    peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        Password
                    </label>
                    <div
                        className="absolute right-3 top-3.5 cursor-pointer text-gray-500 hover:text-gray-800"
                        onClick={togglePassword}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                </div>

                <div className="relative mb-6">
                    <img src={confirm_pass_icon} alt="password" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={`pl-10 pr-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer`}
                    />
                    <label
                        htmlFor="password"
                        className={`absolute left-10 transition-all duration-200 
                    ${confirmPassword ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                    peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        Confirm Password
                    </label>
                    <div
                        className={`absolute right-3 top-3.5 cursor-pointer ${password==confirmPassword ? 'text-green-500':'text-red-500'}`}
                        onClick={togglePassword}
                    >
                        {password==confirmPassword ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    </div>
                </div>

                {/* Mobile Input */}
                <div className="relative mb-6">
                    <img src={mobile_icon} alt="mobile" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="mobile"
                        type="tel"
                        value={mobile}
                        onChange={handleMobile}
                        placeholder="123-45-678"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        maxLength={10}
                        required
                        className="pl-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer text-gray-900 placeholder-transparent"
                    />
                    <label
                        htmlFor="mobile"
                        className={`absolute left-10 transition-all duration-200 
                        ${mobile ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        Mobile
                    </label>
                </div>

                {/* Gender Select */}
                <div className="relative mb-6">
                    <img src={gender_icon} alt="gender" className="w-8 h-8 absolute left-3 top-3.5" />
                    <select
                        id="gender"
                        value={gender}
                        onChange={handleGender}
                        required
                        className="pl-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer text-gray-900 bg-transparent"
                    >
                        <option value="" disabled hidden></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                    <label
                        htmlFor="gender"
                        className={`absolute left-10 transition-all duration-200
                        ${gender && gender !== "Select Gender" ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                        peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        Gender
                    </label>
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
