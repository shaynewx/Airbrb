import React from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/card';
import './style/cards.css';

// 作为房东的房源页面
function HostedListing () {
  return (
      <div>
        <h2>Hosted Listing</h2>
        <CreateNewListing />
        <p>房源列表</p>
        <div className='cards-container'>
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
  );
}

export default HostedListing;
