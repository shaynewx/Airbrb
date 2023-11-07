import React from 'react';
import { Button, message, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './form/apiService';

function LoginResult () {
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

  const jumpToHostedListing = () => {
    navigate('/hosted-listing');
  };

  const jumpToAllListing = () => {
    navigate('/all-listing');
  }

  return (
      <><Result
        status="success"
        title="Successfully Log in to Airbrb!"
        extra={[
          <Button type="primary" key="hosted-listings" onClick={jumpToHostedListing}>
            View Hosted Listings
            </Button>,
          <Button type="primary" key="all-listings">
            View All Listings
            </Button>,
          <Button style={{ margin: '5px' }} key="logout" onClick={handleLogout}>
            Logout</Button>
        ]} />
  </>
  );
}

export default LoginResult;
