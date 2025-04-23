import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

export default function Home() {
  const [user, setUser] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('access_token');
        console.log('token:', token);

        // Redirect if no token
        if (!token) {
          window.location.href = '/';
          return;
        }

        // Make sure base_url is set
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
          // e.g. 401 Unauthorized → redirect to login
          console.error('Fetch failed with status', res.status);
          window.location.href = '/';
          return;
        }

        const data = await res.json();
        console.log('fetched user:', data);

        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user details', error);
        // Optionally redirect on error:
        // window.location.href = '/';
      }
    };

    fetchUserDetails();
  }, [base_url]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar user={user} />
      <main>
        {/* Rest of your home page content goes here */}
      </main>
    </>
  );
}
