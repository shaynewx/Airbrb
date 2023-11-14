import React, { useEffect, useState } from 'react';
import Cards from '../card/PublishCards';
import { getListing, getListingById } from '../form/apiService';
import '../style/card.css';
import '../style/style.css';

function PublishedListings () {
  const [publishedListings, setPublishedListings] = useState([]);

  useEffect(() => {
    const fetchPublishedListings = async () => {
      try {
        const initialData = await getListing();

        if (initialData && initialData.listings) {
          // 使用 Promise.all 来并发获取所有房源的详细信息
          const allListingsDetails = await Promise.all(
            initialData.listings.map(async (listing) => {
              const detailedData = await getListingById(listing.id);
              return { ...detailedData, id: listing.id };
            })
          );
          // 过滤出已发布的房源
          const filteredPublishedListings = allListingsDetails
            .filter(listing => listing.listing.published)
            .sort((a, b) => {
              const titleA = a.listing.title.toUpperCase();
              const titleB = b.listing.title.toUpperCase();
              if (titleA < titleB) {
                return -1;
              }
              if (titleA > titleB) {
                return 1;
              }
              return 0;
            });
          console.log('Filter published listings:', filteredPublishedListings); // 检查过滤后的已发布房源
          setPublishedListings(filteredPublishedListings);
        }
      } catch (error) {
        console.error('Error fetching published listings:', error);
      }
    };

    fetchPublishedListings();
  }, []);

  return (
    <div>
      <h2>All Listings</h2>
      <div className='cards-container'>
        {publishedListings.map((item) => {
          const { listing } = item;
          return (
            <Cards
            key={item.id}
            id={item.id}
            title={listing.title}
            owner={listing.owner}
            address={listing.address}
            price={listing.price}
            thumbnail={listing.thumbnail}
            availability={listing.availability}
            type={listing.metadata?.type}
            bathrooms={listing.metadata?.bathrooms}
            beds={listing.metadata?.beds}
            bedrooms={listing.metadata?.bedrooms}
            amenities={listing.metadata?.amenities}
            images={listing.metadata?.images}
            reviews={listing.reviews}
            published={listing.published}
            postedOn={listing.postedOn}
            />
          );
        })}
      </div>
    </div>
  );
}

export default PublishedListings;
