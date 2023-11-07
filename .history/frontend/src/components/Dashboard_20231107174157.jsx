import React from 'react';
import CancelButton from './button/CancelButton';
import { useNavigate } from 'react-router-dom';

function Dashboard () {

  const navigate = useNavigate();
  const BackHome = () => {

  }

  return (
    <div>
      Dashboard Page
      {/* Dashboard界面代码 */}
      <CancelButton buttonText="Logout" onClick = {BackHome} />
    </div>
  );
}

export default Dashboard;
