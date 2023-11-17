import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function LoginResult () {
  const navigate = useNavigate();

  const jumpToHostedListing = () => {
    navigate('/hosted-listing');
  };

  const jumpToAllListing = () => {
    navigate('/all-listing');
  }

  return (
      <Result
        status="success"
        title="Successfully Log in to Airbrb!"
        extra={[
          <Button name='view-hosted-listings' type="primary" key="hosted-listings" onClick={jumpToHostedListing}>
            View Hosted Listings
            </Button>,
          <Button type="primary" key="all-listings" onClick={jumpToAllListing}>
            View All Listings
            </Button>,
            // eslint-disable-next-line react/jsx-key
            <LogoutButton />
        ]} />
  );
}

export default LoginResult;
