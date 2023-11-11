import React from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/HostingCards';
import './style/card.css';
import { getListing from '../services/apiService';

// 房东的房源页面
function HostedListing () {
  // function getListing () {
  //   // 这里写获取后台数据的方法
  //   console.log('get listing');
  // }
  getListing();
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
