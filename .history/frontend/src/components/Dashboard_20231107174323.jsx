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
      Dashboard Page
      {/* Dashboard界面代码 */}
      <Logout buttonText="Logout" onClick = {BackHome} />
    </div>
  );
}

export default Dashboard;
