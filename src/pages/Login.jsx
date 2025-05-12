import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import user_icon from '../../public/mdi_user.png';
import password_icon from '../../public/mdi_password.png';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const base_url = import.meta.env.VITE_API_URL;

    const handleUserName = (e) => setUserName(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const togglePassword = () => setShowPassword(prev => !prev);

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

            if (!response.ok) throw new Error('Login failed');

            const authHeader = response.headers.get('Authorization');
            if (!authHeader || !authHeader.startsWith('Bearer ')) throw new Error('No Bearer token found');

            const token = authHeader.split(' ')[1];
            Cookies.set('access_token', token, {
                expires: 1,
                secure: true,
                sameSite: 'Strict',
            });

            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const isFormValid = userName.trim() !== '' && password.trim() !== '';

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
            <form
                className="w-96 bg-white p-8 rounded-xl shadow-lg relative"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold  mb-6">Sign In</h2>

                {/* Username */}
                <div className="relative mb-6">
                    <img src={user_icon} alt="user" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="username"
                        type="text"
                        value={userName}
                        onChange={handleUserName}
                        required
                        className={`pl-10 pt-6 pb-2 w-full border-b-2 focus:outline-none focus:border-blue-500 border-gray-300 peer ms-4 cursor-pointer`}
                    />
                    <label
                        htmlFor="username"
                        className={`absolute left-10 transition-all duration-200 
                    ${userName ? "top-1 text-sm text-gray-800" : "top-4 text-base text-gray-400"}
                    peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-800 ms-4 cursor-pointer`}
                    >
                        User Name
                    </label>
                </div>

                {/* Password */}
                <div className="relative mb-6">
                    <img src={password_icon} alt="password" className="w-8 h-8 absolute left-3 top-3.5" />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePassword}
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

                {/* Remember Me */}
                <div className="mb-4 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="remember"
                        className="accent-blue-600 cursor-pointer"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember" className="text-sm text-gray-700">
                        Remember me
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-2 rounded-lg font-medium text-white transition-colors ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
                        }`}
                >
                    Submit
                </button>

                {/* Signup */}
                <div className="text-center mt-4 text-sm">
                    <span className="text-gray-500">Not signed in? </span>
                    <a className="text-blue-600 hover:underline" href="/signup">
                        Click here
                    </a>
                </div>
            </form>

            <img src="/public/ach3 1.png" />
        </div>


    );
}
