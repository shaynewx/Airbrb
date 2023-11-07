import React from 'react';
import { Button,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './apiService';

function Dashboard () {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const data = await logoutUser();
      if (data.success) {
        message.success('Logged out successfully');
        localStorage.removeItem('token'); // Remove the token only if logout is successful
        navigate('/');
      } else {
        // Handle the case where the logout wasn't successful
        message.error(data.message || 'Logout failed. Please try again.');
      }
    } catch (error) {
      // Handle the case where there was an error during the logout process
      message.error('An error occurred during logout. Please try again later.');
    }
  }

  return (
    <div>
      <div>Dashboard Page</div>
      <Button style={{ margin: '5px' }} onClick={BackHome}>
          Logout
        </Button>
    </div>
  );
}

export default Dashboard;
