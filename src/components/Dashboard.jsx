import React from 'react'
import hand_wave_icon from '../../public/hand wave.png'
export default function Dashboard() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className='flex'>
                    <h1 className="text-2xl me-4 font-weight-">Welcome back, Tejeswar</h1>
                    <img src={hand_wave_icon} />
                </div>
                <div className='flex items-center'>
                    <div className=''>icons</div>
                    <button
                        className="px-4 py-2 rounded cursor-pointer border-2 font-medium"
                    >
                        Invite
                    </button>
                </div>
            </div>
            <div className='flex'>
                <div>
                    <div>
                        <div>To-Do</div>
                        <div>
                            <button>Add Task</button>
                        </div>
                    </div>
                    <div></div>
                </div>
                <div>20 June, Today</div>
                <div>
                    {/* {todos?.map()} */}
                </div>
            </div>
        </div>
    )
}
