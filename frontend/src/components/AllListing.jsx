import React from 'react';
import LogoutButton from './LogoutButton';
import PublishedListings from '../components/listing/PublishedListing';

// 所有房源信息
function AllListing () {
  return (
    <div>
      <h2>All Listing</h2>
      <div className="welcome-container">
        <h4 className="Welcome">Welcome! {localStorage.getItem('userId')}</h4>
        <LogoutButton />
      </div>
      <PublishedListings />
    </div>
  );
}

export default AllListing;
