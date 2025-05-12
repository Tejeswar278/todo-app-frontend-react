import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { CgProfile } from "react-icons/cg";
import serach_icon from '../../public/SearchICon.png'
import notification_icon from '../../public/Notifications.png'
import calender_icon from '../../public/Cal.png'

export default function Navbar({ user }) {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(prev => !prev);

    const handleLogout = () => {
        Cookies.remove('access_token');
        window.location.href = '/';
    };
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="logo font-bold text-2xl flex justify-center items-center">Dashboard</div>
            <div className='flex '><input type='text' className='w-98 bg-white'/><img src={serach_icon}/></div>
            <div className='flex gap-2'>
                <img src={notification_icon}/>
                <img src={calender_icon} />
                <div>
                    <div>Tuesday</div>
                    <div>12/05/2025</div>
                </div>

            </div>
            {/* <div className="relative pb-0">
                <CgProfile onClick={toggleMenu} className='bg-gray-800 rounded-full w-8 h-8 cursor-pointer' />
                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                        <div className="px-4 py-2 border-b cursor-pointer">{user.name}</div>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-800 hover:text-white cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div> */}
        </nav>
    );
}