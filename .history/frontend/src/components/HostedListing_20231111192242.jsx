import React, { useEffect, useState } from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/HostingCards';
import { getListing, getListingById } from './form/apiService';
import LogoutButton from './LogoutButton';
import './style/card.css';

// 获取房东的房源信息
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
            return { ...detailedData, id: listing.id }; // 确保每个房源详情都有id属性
          }));
          console.log('Listings with details:', listingsDetails); // 查看每个房源信息
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
      <h2>Hosted Listings <LogoutButton /></h2>
      <CreateNewListing />
      <div className='cards-container'>
      {listings.map((item) => {
        const { listing } = item; // 解构出嵌套的 listing 对象
        return (
          <Cards
            key={item.id}
            id={item.id}
            title={listing.title}
            address={listing.address}
            available={listing.available}
            owner={listing.owner}
            postedOn={listing.postedOn}
            published={listing.published}
            type={listing.metadata?.type}
            bathrooms={listing.metadata?.bathrooms}
            beds={listing.metadata?.beds}
            bedrooms={listing.metadata?.bedrooms}
            amenities={listing.metadata?.amenities}
            thumbnail={listing.thumbnail}
            reviews={listing.reviews}
            price={listing.price}
            images={listing.metadata?.images}
          />
        );
      })}
      </div>
    </div>
  );
}

export default HostedListing;
