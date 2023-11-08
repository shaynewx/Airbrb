import React from 'react';
import CreateNewListing from './listing/CreateNewListing';

// 作为房东的房源页面
function HostedListing () {
  return (
      <div>
        <h2>Hosted Listing</h2>
        <p></p>
        <CreateNewListing />
      </div>
  );
}

export default HostedListing;
