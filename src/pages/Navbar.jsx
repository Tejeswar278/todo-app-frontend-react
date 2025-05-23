import React, { useState } from 'react';
import serach_icon from '../../public/SearchICon.png'
import notification_icon from '../../public/Notifications.png'
import calender_icon from '../../public/Cal.png'

export default function Navbar({ user }) {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white p-4 flex justify-between">
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
        </nav>
    );
}