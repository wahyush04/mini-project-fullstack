import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { UserService, useUserStore } from '../service/userService';

// Interface for component route params
interface UserDetailParams {
  id: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
//   const userId = id ? parseInt(id, 10) : undefined;
  const userId = "fb42f25f-d970-47a0-80d1-262bf932619c"
  
  // Get user data
  const {
    user,
    isLoading: userLoading,
    isError: userError,
    errorMessage: userErrorMessage,
    deleteUser
  } = useUser(userId);
  
  // Get user's posts
  const { state: postsState, fetch: fetchPosts } = useUserStore();
  const { 
    data: postsData, 
    isLoading: postsLoading, 
    isError: postsError 
  } = postsState;
  
  // Load user's posts when component mounts
  useEffect(() => {
    if (userId) {
      UserService.getUserById(userId);
    }
  }, [userId]);
  
  // Handle delete user
  const handleDelete = async () => {
    if (!userId || !user) return;
    
    if (window.confirm(`Are you sure you want to delete ${user.fullname}?`)) {
      const result = await deleteUser(userId);
      if (result) {
        navigate('/users');
      }
    }
  };
  
  // Show loading state
  if (userLoading) {
    return <div className="loading">Loading user details...</div>;
  }
  
  // Show error state
  if (userError) {
    return (
      <div className="error">
        <h3>Error loading user</h3>
        <p>{userErrorMessage}</p>
        <button onClick={() => navigate('/users')}>Back to Users</button>
      </div>
    );
  }
  
  // If no user found
  if (!user) {
    return (
      <div className="not-found">
        <h3>User not found</h3>
        <button onClick={() => navigate('/users')}>Back to Users</button>
      </div>
    );
  }
  
  return (
    <div className="user-detail">
      <h2>User Details</h2>
      
      <div className="user-info">
        <div className="user-header">
          <div>
            <h3>{user.fullname}</h3>
            <p className="user-role">{user.email}</p>
          </div>
        </div>
     
        <div className="actions">
          <button onClick={() => navigate(`/users/${user.id}/edit`)}>
            Edit User
          </button>
          <button onClick={handleDelete} className="delete">
            Delete User
          </button>
        </div>
      </div>
      
      <div className="user-posts">
        
        {postsLoading && <p>Loading posts...</p>}
        
        {postsError && <p>Error loading posts.</p>}
        
      </div>
    </div>
  );
};

export default UserDetail;