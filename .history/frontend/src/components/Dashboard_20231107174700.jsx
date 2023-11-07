import React from 'react';
import Button from 'antd';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
  const navigate = useNavigate();
  const BackHome = () => {
    console.log('BackHome');
    navigate('/');
  }

  return (
    <div>
      <div>Dashboard Page</div>
      <Button style={{ margin: '5px' }} onClick={() => navigate('/')}>
          Cancel
        </Button>
    </div>
  );
}

export default Dashboard;
