import React from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/card';

// 作为房东的房源页面
function HostedListing () {
  return (
      <div>
        <h2>Hosted Listing  <CreateNewListing /></h2>
        <p>房源列表</p>
        <div >
          <Cards />
          <Cards />
        </div>
      </div>
  );
}

export default HostedListing;
