import React, { useEffect } from 'react';
import { useUserStore } from '../store/UserStore';

const UserList: React.FC = () => {
  // Access store state and actions
  const { apiState, fetchData, reset } = useUserStore();
  const { data: users, isLoading, error } = apiState;

  useEffect(() => {
    // Fetch users when component mounts
    fetchData('http://localhost:3000/users');
    
    // Clean up on unmount
    return () => {
      reset();
    };
  }, [fetchData, reset]);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      {users && users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.fullname} ({user.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
      
      <button onClick={() => fetchData('http://localhost:3000/users')}>
        Refresh Users
      </button>
    </div>
  );
};

export default UserList;