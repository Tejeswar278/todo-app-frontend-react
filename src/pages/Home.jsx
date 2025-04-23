import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

export default function Home() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [openTodoId, setOpenTodoId] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const base_url = import.meta.env.VITE_API_URL;

  // Fetch user details once
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          window.location.href = '/';
          return;
        }

        if (!base_url) {
          console.error('VITE_API_URL is not defined');
          return;
        }

        const res = await fetch(`${base_url}/api/users/get-user-details`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          console.error('Fetch failed with status', res.status);
          window.location.href = '/';
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    fetchUserDetails();
  }, [base_url]);

  // Fetch todos once (or refetch by calling trigger refetch function)
  useEffect(() => {
    const fetchTodos = async () => {
      const token = Cookies.get('access_token');
      if (!token) return;

      const res = await fetch(`${base_url}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        console.error('Todo fetch failed', res.status);
        return;
      }
      setTodos(await res.json());
    };

    fetchTodos();
  }, [base_url]);

  const toggleTodo = (id, description) => {
    if (openTodoId === id) {
      setOpenTodoId(null);
      setEditingTodoId(null);
    } else {
      setOpenTodoId(id);
      setEditingTodoId(null);
      setEditValue(description);
    }
  };

  const startEditing = (id, description) => {
    setEditingTodoId(id);
    setEditValue(description);
  };

  const saveEdit = async (id, original) => {
    const token = Cookies.get('access_token');
    if (editValue === original) return;

    try {
      const res = await fetch(`${base_url}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description: editValue }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      // refresh the specific todo in state
      setTodos(prev => prev.map(t => t.id === id ? { ...t, description: editValue } : t));
      setEditingTodoId(null);
    } catch (error) {
      console.error('Failed to update todo', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Navbar user={user} />
      <main className="p-4">
        <h1 className="text-2xl mb-4">Your Todos</h1>
        <ul className="space-y-2">
          {todos.map(({ id, todo, description }) => (
            <li key={id} className="p-2 border rounded">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleTodo(id, description)}
              >
                <span>{todo}</span>
                <span>{openTodoId === id ? '▾' : '▸'}</span>
              </div>

              {openTodoId === id && (
                <div className="mt-2">
                  {editingTodoId !== id ? (
                    <>
                      <p className="mb-2">{description}</p>
                      <button
                        onClick={() => startEditing(id, description)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        className="border p-1 flex-1"
                      />
                      <button
                        onClick={() => saveEdit(id, description)}
                        disabled={editValue === description}
                        className={`px-3 py-1 rounded ${
                          editValue === description
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