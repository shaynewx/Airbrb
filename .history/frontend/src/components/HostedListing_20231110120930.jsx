import React, { useEffect, useState } from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/HostingCards';
import './style/card.css';
import { getListing, getListingById } from './form/apiService';

// 获取房东的房源信息
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
            return { ...detailedData, id: listing.id }; // 确保每个房源详情都有id属性
          }));
          console.log('Listings with details:', listingsDetails); // 这里应该显示完整的数据结构
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
      {listings.map((item) => {
        const { listing } = item; // 解构出嵌套的 listing 对象
        return (
          <Cards
          key={item.id}
      title={listing.title}
      type={listing.metadata?.type}
      beds={listing.metadata?.beds}
      bathrooms={listing.metadata?.bathrooms}
      thumbnail={listing.thumbnail}
      reviews={listing.reviews}
      price={listing.price}
    />
        );
      })}
      </div>
    </div>
  );
}

export default HostedListing;
