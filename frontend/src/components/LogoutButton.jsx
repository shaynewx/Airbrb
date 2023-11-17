import React from 'react';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './form/apiService';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      message.success('Logged out successfully');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/');
    } else {
      message.error(result.error || 'Logout failed. Please try again.');
    }
  };

  return (
    <Button onClick={handleLogout} style={{ margin: '10px' }} name='logout-button'>
      Logout
    </Button>
  );
};

export default LogoutButton;
