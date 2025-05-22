import React from 'react'
import hand_wave_icon from '../../public/hand wave.png'
import task_icon from '../../public/Extreme_icon.png'
import menu_icon from '../../public/menu.png'
import task_image_icon from '../../public/task_img.png'
import office_icon from '../../public/office.png'
import school_icon from '../../public/school.png'
import plus_icon from '../../public/plus_icon.png'
import moderate_icon from '../../public/Moderate_icon.png'
import completed_circle_icon from '../../public/Vector (1).png'
import pending_task_icon from '../../public/Pending.png'
import task_status_icon from '../../public/Task Complete.png'
import DonutChart from './TaskStatus'
import completed_icon from '../../public/Ellipse 5.png'
import in_progress_icon from '../../public/Ellipse 6.png'
import not_started_icon from '../../public/Ellipse 7.png'
import task_completed_icon from '../../public/Book.png'


export default function Dashboard() {

    const priority = {
        "Extreme": {
            "colour": "text-red-500"
        },
        "Moderate": {
            "colour": "text-blue-500"
        },
        "Low": {
            "colour": "text-gray-500"
        }
    }

    const status = {
        "Not started": {
            "colour": "text-gray-500",
            "circle_icon": task_icon
        },
        "In progress": {
            "colour": "text-yellow-500",
            "circle_icon": moderate_icon
        },
        "Completed": {
            "colour": "text-green-500",
            "circle_icon": completed_circle_icon
        }
    }

    const todo_list = [
        {
            "title": "Attend Nischal's birthday party",
            "date": "20-10-2025",
            "time": "06:00PM",
            "place": "Fresh Elements",
            "priority": "Extreme",
            "status": "Not started",
            "created_on": "18-10-2024",
            "image": task_image_icon,
            "description": "Get a bouque while going to attend for the party and a wine bottle."
        },
        {
            "title": "Drop Indu at office",
            "date": "20-10-2025",
            "time": "06:00PM",
            "place": "Fresh Elements",
            "priority": "Moderate",
            "status": "In progress",
            "created_on": "18-10-2024",
            "image": office_icon,
            "description": "Drop indu at office in begumpet area"
        },
        {
            "title": "Pick laila from school",
            "date": "20-10-2025",
            "time": "06:00PM",
            "place": "Fresh Elements",
            "priority": "Low",
            "status": "Completed",
            "created_on": "18-10-2024",
            "image": school_icon,
            "description": "description"
        }
    ]
    const completed_task_list = [
        {
            "title": "Attend Nischal's birthday party",
            "date": "20-10-2025",
            "time": "06:00PM",
            "place": "Fresh Elements",
            "priority": "Extreme",
            "status": "Completed",
            "time_diff": "one hour ago",
            "image": task_image_icon,
            "description": "Get a bouque while going to attend for the party and a wine bottle."
        },
        {
            "title": "Drop Indu at office",
            "date": "20-10-2025",
            "time": "06:00PM",
            "place": "Fresh Elements",
            "priority": "Moderate",
            "status": "Completed",
            "time_diff": "3days ago",
            "image": office_icon,
            "description": "Drop indu at office in begumpet area"
        },
        {
            "title": "Pick laila from school",
            "date": "20-10-2025",
            "time": "06:00PM",
            "place": "Fresh Elements",
            "priority": "Low",
            "status": "Completed",
            "time_diff": "one week ago",
            "image": school_icon,
            "description": "description"
        }
    ]

    return (
        <div className='border-2 border-gray-300 shadow-xl rounded p-4'>
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
            <div className='flex shadow-xl'>
                <div className='w-2/4 shadow-2xs m-4'>
                    <div>
                        <div className='flex justify-between items-center'>
                            <div className='font-bold text-lg text-gray-500 flex'>
                                <img src={pending_task_icon} />
                                <div>To-Do</div>
                            </div>
                            <div>
                                <div
                                    className='flex items-center justify-between gap-2 border-4 border-gray-400 rounded px-1 cursor-pointer'
                                    onClick={() => console.log("clicked")}
                                ><img src={plus_icon} /> <span className='text-gray-500'>Add Task</span></div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div>20 June, Today</div>
                    <div className='shadow rounded-2xl p-4 border-gray-600'>
                        {todo_list?.map((e, i) => {
                            return (
                                <div key={i} className='rounded-2xl border-2 border-gray-300 p-4 flex w-5/6 m-auto mb-2'>
                                    <div className='me-4'><img src={status[e.status]['circle_icon']} /></div>
                                    <div className='flex flex-col justify-between  me-2 w-2/3'>
                                        <div className='font-bold text-lg'>{e.title}</div>
                                        <div className='text-gray-500'>{e.description}<span> {e.time} {e.place}</span></div>
                                        <div className='flex justify-between'>
                                            <div className='me-2'>
                                                Priority : <span className={`${priority[e.priority]['colour']}`}>{e.priority}</span>
                                            </div>
                                            <div>
                                                Status : <span className={`${status[e.status]['colour']}`}>{e.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between items-end  min-h-35">
                                        <img src={menu_icon} alt="menu" />
                                        <img src={e.image} alt="task" />
                                        <div className='text-sm text-gray-400'>Created on : {e.created_on}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='w-2/4 m-4 shadow p-4'>
                    <div className='shadow-2xl rounded-2xl w-full px-4 py-8 mb-4'>
                        <div className='font-bold text-lg text-gray-500 flex mb-4'>
                            <img className='me-2' src={task_status_icon} />
                            <div className='text-xl'>Task Status</div>
                        </div>
                        <div className='flex justify-around w-4/5 m-auto'>
                            <div>
                                <DonutChart percentage={84} />
                                <div className='flex items-center text-center justify-self-center mt-4'><img src={completed_icon} /><span className='text-green-500 ms-2'>Completed</span></div>
                            </div>
                            <div>
                                <DonutChart percentage={46} />
                                <div className='flex items-center text-center justify-self-center mt-4'><img src={in_progress_icon} /><span className='text-blue-500 ms-2'>In Progress</span></div>
                            </div>
                            <div>
                                <DonutChart percentage={13} />
                                <div className='flex items-center text-center justify-self-center mt-4'><img src={not_started_icon} /><span className='text-red-500 ms-2'>Not Started</span></div>
                            </div>
                        </div>
                    </div>
                    <div className='shadow-2xl p-4 rounded-xl'>
                        <div className='font-bold text-lg text-gray-500 flex'>
                            <img className='me-2' src={task_completed_icon} />
                            <div className='text-xl'>Completed Tasks</div>
                        </div>
                        <div className=' rounded-2xl p-4 border-gray-600'>
                            {completed_task_list?.map((e, i) => {
                                return (
                                    <div key={i} className='rounded-2xl border-2 border-gray-300 p-4 flex w-5/6 m-auto mb-2'>
                                        <div className='me-4'><img src={status[e.status]['circle_icon']} /></div>
                                        <div className='flex flex-col justify-between  me-2 w-2/3'>
                                            <div className='font-bold text-lg'>{e.title}</div>
                                            <div className='text-gray-500'>{e.description}</div>
                                            <div>Status : <span className={`${status[e.status]['colour']}`}>{e.status}</span></div>
                                            <div className='text-sm text-gray-400'>Completed {e.time_diff}</div>
                                        </div>
                                        
                                        <div className="flex flex-col justify-between items-end  min-h-35">
                                            <img src={menu_icon} alt="menu" />
                                            <img src={e.image} alt="task" />
                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
