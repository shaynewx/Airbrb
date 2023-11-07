import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './apiService';

function Dashboard () {
  const navigate = useNavigate();
  
  const BackHome = () => {
    console.log('BackHome');
    localStorage.removeItem('token');
    navigate('/');
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
