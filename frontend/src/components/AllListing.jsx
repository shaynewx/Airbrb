import React from 'react';
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import PublishedListings from '../components/listing/PublishedListing';

function AllListing () {
  const navigate = useNavigate();

  const jumpToHostedListing = () => {
    navigate('/hosted-listing');
  };
  return (
    <div>
      <Button type="primary" onClick={jumpToHostedListing} style={{ margin: '10px' }}>Check Hosted Listings</Button>
      <div className="welcome-container">
        <h4 className="Welcome">Welcome! {localStorage.getItem('userId')}</h4>
        <LogoutButton />
      </div>
      <PublishedListings />
    </div>
  );
}

export default AllListing;
