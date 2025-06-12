'use client';

import { useEffect, useState } from 'react';
import { deleteUser } from '../lib/admin';

type User = {
  user_id: number;
  user_name: string;
  email: string;
  user_type: string;
};

export default function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch {
        setError('Failed to load users.');
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (user: User) => {
    try {
      await deleteUser(user.user_id, user.user_type);
      setUsers((prev) => prev.filter((u) => u.user_id !== user.user_id));
    } catch {
      setError('Error deleting user');
    }
  };

  return (
    <>
      {error && <p className="text-red-600">{error}</p>}
      <table className="w-full border text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Type</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id} className="border-t">
              <td className="p-2">{user.user_id}</td>
              <td className="p-2">{user.user_name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.user_type}</td>
              <td className="p-2">
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
