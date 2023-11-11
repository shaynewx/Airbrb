import React from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/HostingCards';
import './style/card.css';
import { getListing } from './form/apiService';

// 房东的房源页面
function HostedListing () {
  data=getListing();
  console.log('getListing()');
  return (
      <div>
        <h2>Hosted Listing</h2>
        <CreateNewListing />
        <div className='cards-container'>
          {/* 在这里，我需要先写获取后台数据，当获取后台数据之后，每有一个房源，就生成一个card */}
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
  );
}

export default HostedListing;
