import React, { useEffect, useState } from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/HostingCards';
import './style/card.css';
import { getListing, getListingById } from './form/apiService';

// 房东的房源页面
function HostedListing () {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // 先获取所有房源的ID
        const initialData = await getListing();
        if (initialData && initialData.listings) {
          // 对于每个ID，获取详细的房源信息
          const listingsDetails = await Promise.all(initialData.listings.map(async (listing) => {
            const detailedData = await getListingById(listing.id);
            return detailedData; // 返回详细信息
          }));
          setListings(listingsDetails); // 设置状态以包含所有详细信息
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
      <div>
        <h2>Hosted Listing</h2>
        <CreateNewListing />
        <div className='cards-container'>
          {/* 在这里，我需要先写获取后台数据，当获取后台数据之后，每有一个房源，就生成一个card */}
          <Cards />
        </div>
      </div>
  );
}

export default HostedListing;
