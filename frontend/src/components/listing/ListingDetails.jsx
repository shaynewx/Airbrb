import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById } from '../form/apiService';
import { Descriptions, Button } from 'antd';
import LogoutButton from '../LogoutButton';

const ListingDetails = () => {
  const { id } = useParams();
  const [listingDetail, setListingDetail] = useState('');
  const navigate = useNavigate();

  const jumpToAllListing = () => {
    navigate('/all-listing');
  };

  useEffect(() => {
    const fetchListingDetail = async () => {
      const data = await getListingById(id);
      setListingDetail(data);
    };

    fetchListingDetail();
  }, [id]);

  if (!listingDetail) {
    return <div>Loading...</div>;
  }

  console.log('listingDetail:', listingDetail);
  const { title, address, price, thumbnail, metadata, reviews, availability } = listingDetail.listing;
  const { bedrooms, bathrooms, beds, type, amenities, images } = metadata;

  return (
    <div>
      <div className='welcome-container'>
        <h4 className='Welcome'>Welcome! {localStorage.getItem('userId')}</h4>
        <LogoutButton />
      </div>
      <Button type='primary' onClick={jumpToAllListing}>Check All Listings</Button>
      <h1>Listing Detail</h1>
      <img src={thumbnail} alt={title} />
      <img src={images} alt='images' />
      <h2>{title}</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Address">{address}</Descriptions.Item>
        <Descriptions.Item label="Amenities">{amenities}</Descriptions.Item>
        <Descriptions.Item label="Price">${price} per night</Descriptions.Item>
        <Descriptions.Item label="Type">{type}</Descriptions.Item>
        <Descriptions.Item label="Number of Beds">{beds}</Descriptions.Item>
        <Descriptions.Item label="Bedrooms">{bedrooms}</Descriptions.Item>
        <Descriptions.Item label="Number of Bathrooms">{bathrooms}</Descriptions.Item>
        {availability && availability.map((range, index) => (
          <>
            <Descriptions.Item key={`start-${index}`} label="Available From">
              {range.start}
            </Descriptions.Item>
            <Descriptions.Item key={`end-${index}`} label="Available Until">
              {range.end}
            </Descriptions.Item>
          </>
        ))}
      </Descriptions>
      <div>
        <h3>Reviews: {reviews}</h3>
      </div>
    </div>
  );
}

export default ListingDetails;
