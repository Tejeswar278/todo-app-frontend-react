import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

export default function Home() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([])
  const base_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('access_token');
        console.log('token:', token);

        if (!token) {
          window.location.href = '/';
          return;
        }

        if (!base_url) {
          console.error('VITE_API_URL is not defined');
          return;
        }

        const res = await fetch(`${base_url}/api/users/get-user-details`, {
          method: 'GET',
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
        console.log('fetched user:', data);

        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    fetchUserDetails();
  }, [base_url]);

  useEffect(() => {
    const fetchTodos = async () => {
      const token = Cookies.get('access_token');
      if (!token) return;

      const url = new URL(`${base_url}/api/todos`);
      const res = await fetch(url.toString(), {
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

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <main>
      <ul className="space-y-2">
          {todos.map(todo => (
            <li key={todo.id} className="p-2 border rounded">
              {todo.todo}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
