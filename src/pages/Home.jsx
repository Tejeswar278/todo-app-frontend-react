import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

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

	return (
		<>
			<Navbar user={user} />
			<main className="flex">
				<div className='w-1/6 flex flex-col justify-between h-200 bg-gray-800 text-white mt-15'>
					<div>
						<div className='min-h-8 max-w-7xl border-white'>Profile</div>
						<div>Dashboard</div>
						<div>Vital Task</div>
						<div>My Task</div>
						<div>Task Categories</div>
						<div>Settings</div>
						<div>Help</div>
					</div>
					<div>
						Logout
					</div>
				</div>
				<div className='w-5/6 mt-15 mx-4'>
					<div className="flex items-center justify-between mb-4">
						<h1 className="text-2xl">Welcome back, Tejeswar</h1>
						<div className='flex'>
							<div>icons</div>
							<button
								onClick={() => setShowCreateModal(true)}
								className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
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
			</main>
		</>
	);
}