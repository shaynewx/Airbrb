import React from 'react';
import CreateNewListing from './listing/CreateNewListing';

// 作为房东的房源页面
function HostedListing () {
  return (
      <div>
        <h1>Hosted Listing</h1>
        <CreateNewListing />
      </div>
  );
}

export default HostedListing;
