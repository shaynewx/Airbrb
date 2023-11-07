import React from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './form/apiService';

function Dashboard () {
  const navigate = useNavigate();

  // Logout reqquest
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      console.log('Logged out successfully');
      
      localStorage.removeItem('token');
      navigate('/');
    } else {
      message.error(result.error || 'Logout failed. Please try again.');
    }
  };

  return (
    <div>
      <div>Dashboard Page</div>
      <Button style={{ margin: '5px' }} onClick={handleLogout}>
          Logout
        </Button>
    </div>
  );
}

export default Dashboard;
