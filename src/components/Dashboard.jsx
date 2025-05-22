import React from 'react'
import hand_wave_icon from '../../public/hand wave.png'
import task_icon from '../../public/Extreme_icon.png'
import menu_icon from '../../public/menu.png'
import task_image_icon from '../../public/task_img.png'
import office_icon from '../../public/office.png'
import school_icon from '../../public/school.png'
import plus_icon from '../../public/plus_icon.png'
import moderate_icon from '../../public/Moderate_icon.png'

export default function Dashboard() {

    const priority = {
        "Extreme": {
            "colour":"text-red-500",
            "circle_icon":task_icon
        },
        "Moderate": {
            "colour":"text-blue-500",
            "circle_icon":moderate_icon
        },
        "Low": {
            "colour":"text-gray-500",
            "circle_icon":moderate_icon
        }
    }

    const status = {
        "Not started": "text-gray-500",
        "In progress": "text-yellow-500",
        "Completed": "text-green-500"
    }

    const todo_list = [
        {
            "icon": "",
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
            "icon": "",
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
            "icon": "",
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

    return (
        <div className=''>
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
                        <div className='flex justify-between'>
                            <div>To-Do</div>
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
                                <div key={i} className='rounded-2xl border p-4 flex w-5/6 m-auto mb-2'>
                                    <div className='me-4'><img src={priority[e.priority]['circle_icon']} /></div>
                                    <div className='flex flex-col justify-between  me-2 w-2/3'>
                                        <div className='font-bold text-lg'>{e.title}</div>
                                        <div className='text-gray-500'>{e.description}<span> {e.time} {e.place}</span></div>
                                        <div className='flex justify-between'>
                                            <div className='me-2'>
                                                Priority : <span className={`${priority[e.priority]['colour']}`}>{e.priority}</span>
                                            </div>
                                            <div>
                                                Status : <span className={`${status[e.status]}`}>{e.status}</span>
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
                <div>
                    Right side bar
                </div>
            </div>
        </div>
    )
}
