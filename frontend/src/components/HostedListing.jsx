import React, { useEffect, useState } from 'react';
import CreateNewListing from './listing/CreateNewListing';
import Cards from './card/HostingCards';
import { getListing, getListingById } from './form/apiService';
import LogoutButton from './LogoutButton';
import './style/card.css';
import './style/style.css';

// get listing info from backend
function HostedListing () {
  const [listings, setListings] = useState([]);
  const fetchListings = async () => {
    try {
      const initialData = await getListing();
      if (initialData && initialData.listings) {
        const listingsDetails = await Promise.all(initialData.listings.map(async (listing) => {
          const detailedData = await getListingById(listing.id);
          return { ...detailedData, id: listing.id };
        }));
        setListings(listingsDetails);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <div>
      <h2>Hosted Listings</h2>
      <div className='welcome-container'>
        <h4 className='Welcome'>Welcome! {localStorage.getItem('userId')}</h4>
        <LogoutButton />
      </div>
      <CreateNewListing onListingCreated={fetchListings} />
      <div className='cards-container'>
      {listings.map((item) => {
        // deconstruct nested listing objects
        const { listing } = item; // 解构出嵌套的 listing 对象
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

export default HostedListing;
