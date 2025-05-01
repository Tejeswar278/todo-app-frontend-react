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

	// const stopEditing = () => {
	// 	setEditingTodoId(null);
	// 	setEditValue(null);
	// };

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
			<main className="p-4">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-2xl">Your Todos</h1>
					<button
						onClick={() => setShowCreateModal(true)}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						Create Todo
					</button>
				</div>

				{showCreateModal && (
					<div className="fixed inset-0 flex items-center justify-center pointer-events-none">
						<div className="bg-white p-6 rounded shadow-[0_0_10px_rgba(0,0,0,0.15)] w-full max-w-md pointer-events-auto">
							<h2 className="text-xl mb-4">New Todo</h2>
							<input
								type="text"
								placeholder="Todo name"
								value={newTodo}
								onChange={e => setNewTodo(e.target.value)}
								className="w-full border p-2 mb-3"
							/>
							<textarea
								placeholder="Description"
								value={newDesc}
								onChange={e => setNewDesc(e.target.value)}
								className="w-full border p-2 mb-3"
							/>
							<div className="flex justify-end space-x-2">
								<button
									onClick={() => setShowCreateModal(false)}
									className="px-4 py-2 rounded border"
								>
									Cancel
								</button>
								<button
									onClick={createTodo}
									disabled={!newTodo || !newDesc}
									className={`px-4 py-2 rounded text-white ${!newTodo || !newDesc ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'
										}`}
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				)}

				<ul className="space-y-2">
					{todos.map(({ id, todo, description }) => (
						<li key={id} className="p-2 border rounded">
							<div
								className="flex justify-between items-center cursor-pointer"
								onClick={() => toggleTodo(id, description)}
							>
								<span className='font-bold'>{todo}</span>
								<span>{openTodoId === id ? '▾' : '▸'}</span>
							</div>

							{openTodoId === id && (
								<div className="mt-2">
									{editingTodoId !== id ? (
										<>
											<p className="mb-2"><span className='font-bold'>Description :</span> {description}</p>
											<button
												onClick={() => startEditing(id, description)}
												className="text-blue-500 hover:underline"
											>
												Edit
											</button>
											<button
												onClick={() => setShowDeletePopUp(true)}
												className="text-blue-500 hover:underline"
											>
												Delete
											</button>
											{showDeletePopUp && (
												<div className="fixed inset-0 flex items-center justify-center pointer-events-none">
													<div className="bg-white p-6 rounded shadow-[0_0_10px_rgba(0,0,0,0.15)] w-full max-w-md pointer-events-auto">
														<h2 className="text-xl mb-4">Are you sure?</h2>
														<div className="flex justify-end space-x-2">
															<button
																onClick={() => setShowDeletePopUp(false)}
																className="px-4 py-2 rounded border"
															>
																Cancel
															</button>
															<button
																onClick={() => deleteTodo(id)}
																className="px-4 py-2 rounded text-white bg-blue-500"
															>
																Yes
															</button>
														</div>
													</div>
												</div>
											)}
										</>
									) : (
										<div className="flex space-x-2">
											<lable className='font-bold'>Description :</lable>
											<input
												type="text"
												value={editValue}
												onChange={e => setEditValue(e.target.value)}
												className="border p-1 flex-1"
											/>
											{/* <button
												onClick={stopEditing}
												className='px-3 py-1 rounded bg-blue-500 text-white'
											>
												Cancel
											</button> */}
											<button
												onClick={() => saveEdit(id, description)}
												disabled={editValue === description}
												className={`px-3 py-1 rounded ${editValue === description
													? 'bg-gray-300 text-gray-600 cursor-not-allowed'
													: 'bg-blue-500 text-white'
													}`}
											>
												Save
											</button>
										</div>
									)}
								</div>
							)}
						</li>
					))}
				</ul>
			</main>
		</>
	);
}