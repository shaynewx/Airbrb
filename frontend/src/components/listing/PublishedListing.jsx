import React, { useEffect, useState } from 'react';
import Cards from '../card/PublishCards';
import { getListing, getListingById } from '../form/apiService';
import SearchFilter from '../filter/SearchFilter';
import '../style/card.css';
import '../style/style.css';

function PublishedListings () {
  const [allListings, setAllListings] = useState([]);
  const [publishedListings, setPublishedListings] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [bedroomRange, setBedroomRange] = useState([1, 5]);
  const [dateRange, setDateRange] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [reviewRange, setReviewRange] = useState([1, 5]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchPublishedListings = async () => {
      try {
        const initialData = await getListing();
        if (initialData && initialData.listings) {
          // fetch all information
          const allListingsDetails = await Promise.all(
            initialData.listings.map(async (listing) => {
              const detailedData = await getListingById(listing.id);
              return { ...detailedData, id: listing.id };
            })
          );
          // Filter out published properties and sort by name
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
          setAllListings(filteredPublishedListings);
          setPublishedListings(filteredPublishedListings);
          console.log('Filter published listings:', filteredPublishedListings);
        }
      } catch (error) {
        console.error('Error fetching published listings:', error);
      }
    };

    fetchPublishedListings();
  }, []);

  // TODO:handle search
  const handleSearch = () => {
    const filteredResults = allListings.filter(item => {
      const matchesTitleOrAddress = item.listing.title.toLowerCase().includes(searchText.toLowerCase()) || item.listing.address.toLowerCase().includes(searchText.toLowerCase());
      const matchesBedrooms = item.listing.metadata.bedrooms >= bedroomRange[0] && item.listing.metadata.bedrooms <= bedroomRange[1];
      return matchesTitleOrAddress && matchesBedrooms;
    });

    setPublishedListings(filteredResults);
  };

  return (
    <div>
      <h2>All Listings</h2>
      <SearchFilter
        searchText={searchText}
        setSearchText={setSearchText}
        bedroomRange={bedroomRange}
        setBedroomRange={setBedroomRange}
        dateRange={dateRange}
        setDateRange={setDateRange}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        reviewRange={reviewRange}
        setReviewRange={setReviewRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onSearch={handleSearch}
      />
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
