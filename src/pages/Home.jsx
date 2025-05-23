import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';
import profile_img from '../../public/Ellipse 1.png'
import dashboard_icon_w from '../../public/dashboard_white.png'
import dashboard_icon_b from '../../public/dashboard_black.png'
import help_icon_w from '../../public/help_white.png'
// import help_icon_b from '../../public/help_black.png'
import category_icon_w from '../../public/category_white.png'
// // import category_icon_b from '../../public/category_black.png'
import mytask_icon_w from '../../public/mytask_white.png'
// // import mytask_icon_b from '../../public/mytask_black.png'
import settings_icon_w from '../../public/settings_white.png'
// // import settings_icon_b from '../../public/settings_black.png'
import vital_icon_w from '../../public/vital_white.png'
import Dashboard from '../components/Dashboard';
import VitalTask from '../components/VitalTask';
import MyTask from '../components/MyTask';
import TaskCategory from '../components/TaskCategory';
import Settings from '../components/Settings';
import Help from '../components/Help';
// // import vital_icon_b from '../../public/vital_black.png'

import { MdDashboard } from "react-icons/md";

export default function Home() {
	const [user, setUser] = useState(null);
	const [todos, setTodos] = useState([]);
	const [openTodoId, setOpenTodoId] = useState(null);
	const [editingTodoId, setEditingTodoId] = useState(null);
	const [editValue, setEditValue] = useState('');
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [newTodo, setNewTodo] = useState('');
	const [newDesc, setNewDesc] = useState('');
	const [showDeletePopUp, setShowDeletePopUp] = useState(false);
	const [refresh, setRefresh] = useState(false)
	const base_url = import.meta.env.VITE_API_URL;
	const [activeSection, setActiveSection] = useState('Dashboard');

	// Fetch user details once
	useEffect(() => {
		const fetchUserDetails = async () => {
			const token = Cookies.get('access_token');
			if (!token) return window.location.href = '/';

			const res = await fetch(`${base_url}/api/users/get-user-details`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) return window.location.href = '/';
			setUser(await res.json());
		};
		fetchUserDetails();
	}, [base_url]);

	// Fetch todos once
	useEffect(() => {
		const fetchTodos = async () => {
			const token = Cookies.get('access_token');
			if (!token) return;

			const res = await fetch(`${base_url}/api/todos`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (res.ok) setTodos(await res.json());
		};
		fetchTodos();
	}, [base_url, refresh]);

	const toggleTodo = (id, description) => {
		setOpenTodoId(openTodoId === id ? null : id);
		setEditingTodoId(null);
		setEditValue(description);
		// setShowDeletePopUp(false)
	};

	const startEditing = (id, description) => {
		setEditingTodoId(id);
		setEditValue(description);
	};

	const stopEditing = () => {
		setEditingTodoId(null);
		setEditValue(null);
	};

	const saveEdit = async (id, original) => {
		if (editValue === original) return;
		const token = Cookies.get('access_token');
		await fetch(`${base_url}/api/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ description: editValue }),
		});
		setTodos(prev => prev.map(t => t.id === id ? { ...t, description: editValue } : t));
		setEditingTodoId(null);
	};

	const createTodo = async () => {
		const token = Cookies.get('access_token');
		const res = await fetch(`${base_url}/api/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ todo: newTodo, description: newDesc }),
		});
		if (res.ok) {
			const created = await res.json();
			setTodos(prev => [created, ...prev]);
			setShowCreateModal(false);
			setNewTodo('');
			setNewDesc('');
		}
	};

	const deleteTodo = async (id) => {
		const token = Cookies.get('access_token');
		const res = await fetch(`${base_url}/api/todos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			}
		});
		if (res.ok) {
			setShowDeletePopUp(false);
			setRefresh(true)
		}
	};

	if (!user) return <div>Loading...</div>;

	const renderContent = () => {
		switch (activeSection) {
			case 'Dashboard':
				return <Dashboard />;
			case 'Vital Task':
				return <VitalTask />;
			case 'My Task':
				return <MyTask />;
			case 'Task Categories':
				return <TaskCategory />;
			case 'Settings':
				return <Settings />;
			case 'Help':
				return <Help />;
			default:
				return <Help />;
		}
	};

	const side_tabs = ["Dashboard", "Vital Task", "My Task", "Task Categories", "Settings", "Help"]

	return (
		<div className='pt-20 h-screen'>
			<Navbar user={user} />
			<main className="flex">
				<div className='w-1/6 flex flex-col justify-between h-200 bg-gray-800 text-white mt-15 rounded relative'>
					<div className='min-h-8 max-w-7xl border-white flex flex-col items-center relative'>
						<img className='absolute -top-12' src={profile_img} />
						<div className='mt-16 text-center'>
							<span className='font-bold'>Tejeswar Muddada</span>
							<div>muddadateja1999@gmail.com</div>
						</div>
					</div>
					<div className='p-4 mx-auto '>
						{side_tabs?.map((e,i) => {
							return (
								<button key={i} onClick={() => setActiveSection(e)} className={`flex mx-auto p-4 w-1/1 hover:bg-white hover:text-gray-900 text-2xl cursor-pointer my-2 rounded-2xl border ${activeSection == e?'bg-white text-gray-900':''}`}>
									{e}
								</button>
							)
						})}

					</div>
					<div className='mx-auto pb-4'>
						<button className='flex px-10 py-4 hover:bg-white hover:text-gray-900 text-2xl cursor-pointer my-2 rounded-2xl'>
							Logout
						</button>
					</div>
				</div>
				<div className='w-5/6 mt-15 mx-20'>
					{renderContent()}
				</div>
			</main>
		</div>
	);
}