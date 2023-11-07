import React from 'react';
import CancelButton from './button/CancelButton';
import { useNavigate } from 'react-router-dom';

function Dashboard () {
  const navigate = useNavigate();
  const BackHome = () => {
    navigate('/');
  }

  return (
    <div>
      <div></div>Dashboard Page
      <CancelButton buttonText="Logout" onClick = {BackHome} />
    </div>
  );
}

export default Dashboard;
