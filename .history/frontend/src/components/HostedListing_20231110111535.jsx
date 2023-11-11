import React, { useEffect, useState } from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/HostingCards';
import './style/card.css';
import { getListing, getListingById } from './form/apiService';

function HostedListing () {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // 先获取所有房源的ID
        const initialData = await getListing();
        if (initialData && initialData.listings) {
          // 打印所有房源ID
          console.log('All listing IDs:', initialData.listings.map(listing => listing.id));

          // 对于每个ID，获取详细的房源信息
          const listingsDetails = await Promise.all(initialData.listings.map(async (listing) => {
            const detailedData = await getListingById(listing.id);
            // 打印每个房源ID获取的后台信息
            console.log(`Details for listing ID ${listing.id}:`, detailedData);
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
      <h2>Hosted Listings</h2>
      <CreateNewListing />
      <div className='cards-container'>
        {listings.map((listing) => (
          <Cards 
            key={listing.id}
            // 以下是假设Cards组件可以接受这些props
            title={listing.title}
            owner={listing.owner}
            address={listing.address}
            thumbnail={listing.thumbnail}
            price={listing.price}
            reviews={listing.reviews}
            // ...其他您需要传递的props
          />
        ))}
      </div>
    </div>
  );
}

export default HostedListing;
