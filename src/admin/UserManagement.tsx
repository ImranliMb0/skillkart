import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

interface User {
  id: string;
  email: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersData: User[] = [];
    querySnapshot.forEach(doc => {
      usersData.push({ id: doc.id, ...(doc.data() as Omit<User, 'id'>) });
    });
    setUsers(usersData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Management</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.email}</strong> — Role: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
