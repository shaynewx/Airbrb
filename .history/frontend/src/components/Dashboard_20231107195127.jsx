import React from 'react';
import { Button, message, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './form/apiService';

function Dashboard () {
  const navigate = useNavigate();

  // Logout reqquest
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      message.success('Logged out successfully');
      localStorage.removeItem('token');
      navigate('/');
    } else {
      message.error(result.error || 'Logout failed. Please try again.');
    }
  };

  return (
      <><Result
        status="success"
        title="Successfully Log in toAirbrb!"
        extra={[
          <Button type="primary" key="hosted-listings">View Hosted Listings</Button>,
          <Button type="primary" key="all-listings">View All Listings</Button>,
          <Button style={{ margin: '5px' }} key="logout" onClick={handleLogout}>Logout</Button>
        ]} />
  </>
  );
}

export default Dashboard;
