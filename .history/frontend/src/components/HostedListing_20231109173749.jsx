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
        <div className='cards-container'>
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          {/* 在这里，我需要先写一个 */}
        </div>
      </div>
  );
}

export default HostedListing;
