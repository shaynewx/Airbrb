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
      localStorage.removeItem('token'); // 清除本地存储的令牌
      navigate('/'); // 重定向到首页或登录页面
    } else {
      message.error(result.error || 'Logout failed. Please try again.');
    }
  };

  return (
    <Button onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
