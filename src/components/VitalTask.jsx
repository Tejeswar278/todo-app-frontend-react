import React, { useEffect, useState } from 'react'
import task_icon from '../../public/Extreme_icon.png'
import moderate_icon from '../../public/Moderate_icon.png'
import completed_circle_icon from '../../public/Vector (1).png'
import task_image_icon from '../../public/task_img.png'
import office_icon from '../../public/office.png'
import school_icon from '../../public/school.png'
import menu_icon from '../../public/menu.png'
import edit_icon from '../../public/edit_icon.png'
import delete_icon from '../../public/delete_icon.png'

export default function VitalTask() {

	const [selectedTask, setSelectedTask] = useState({})

	const vital_tasks_list = [
		{
			"title": "Attend Nischal's birthday party",
			"date": "20-10-2025",
			"time": "06:00PM",
			"place": "Fresh Elements",
			"priority": "Extreme",
			"status": "Not started",
			"created_on": "18-10-2024",
			"image": task_image_icon,
			"description": "Get a bouque while going to attend for the party and a wine bottle.",
			"add_ons": [
				"listen to podcast audio book",
				"Practice mindfullness of meditation"
			]
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

	useEffect(() => {
		setSelectedTask(vital_tasks_list[0])
	}, [])

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



	const handleTaskChange = (e) => {
		setSelectedTask(e)
		console.log(priority[selectedTask.priority]['colour'], "priority")
	}

	return (
		<div className='flex w-full gap-3'>
			<div className='border-2 border-gray-300 shadow-xl w-1/2 rounded-2xl py-4'>
				<div className='font-bold ps-4 mb-4'><span className='decorator'>Vital</span> Tasks</div>
				<div>
					{vital_tasks_list?.map((e, i) => {
						return (
							<div onClick={() => handleTaskChange(e)} key={i} className='rounded-2xl border-2 border-gray-300 p-4 flex w-7/8 m-auto mb-2'>
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
			<div className='border-2 border-gray-300 shadow-xl w-1/2 rounded-2xl flex flex-col justify-between'>
				<div>
					<div className='flex p-4 gap-4'>
						<img className='w-40' src={selectedTask.image} />
						<div className='flex flex-col justify-end gap-2'>
							<div className='font-semibold'>{selectedTask.title}</div>
							<div className="grid grid-cols-3 gap-2 w-fit">
								<div className="font-semibold">Priority</div>
								<div>:</div>
								<div className={selectedTask?.priority && priority[selectedTask.priority] ? priority[selectedTask.priority]['colour'] : ''}>
									{selectedTask?.priority}
								</div>
								<div className="font-semibold">Status</div>
								<div>:</div>
								<div className={selectedTask?.status && status[selectedTask.status] ? status[selectedTask.status]['colour'] : ''}>
									{selectedTask?.status}
								</div>
							</div>
							<div className='text-sm text-gray-400'>Created on : {selectedTask.created_on}</div>
						</div>
					</div>
					<div className='p-4 text-gray-500'>
						{selectedTask.description}
					</div>
				</div>
				<div className='flex justify-end gap-2 p-4'>
					<button><img src={edit_icon} /></button>
					<button><img src={delete_icon} /></button>
				</div>
			</div>
		</div>
	)
}
