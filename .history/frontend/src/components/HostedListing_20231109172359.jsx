import React from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/card';

// 作为房东的房源页面
function HostedListing () {
  return (
      <div>
        <h2>Hosted Listing  <CreateNewListing /></h2>
        <div>
          <p>房源列表</p>
          <Cards />
        </div>
        
        <Cards />
      </div>
  );
}

export default HostedListing;
