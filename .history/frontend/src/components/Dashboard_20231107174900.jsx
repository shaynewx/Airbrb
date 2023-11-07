import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

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
          Cancel
        </Button>
    </div>
  );
}

export default Dashboard;
