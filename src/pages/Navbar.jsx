import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { CgProfile } from "react-icons/cg";

export default function Navbar({ user }) {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(prev => !prev);

    const handleLogout = () => {
        Cookies.remove('access_token');
        // clear other cookies if any
        // redirect to login
        window.location.href = '/';
    };
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="logo font-bold">TASK MANAGER</div>
            <div className="relative">
                <button onClick={toggleMenu} className="focus:outline-none">
                    <CgProfile className='bg-gray-800 rounded-full'/>
                </button>
                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                        <div className="px-4 py-2 border-b">{user.name}</div>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}