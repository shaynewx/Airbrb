import React from 'react';
import { Card, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

// Each card will receive an object containing all listing information as props
const Cards = ({ id, title, address, type, beds, bedrooms, bathrooms, amenities, thumbnail, reviews, price, images, owner, postedOn, published, availability }) => {
  const navigate = useNavigate();
  // Click on the card and navigate to the property details page
  const handleCardClick = () => {
    navigate(`/listing/${id}`);
  };

  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
  const totalReviews = reviews ? reviews.length : 0;

  return (
    <Card
      hoverable
      style={{ width: 290 }}
      cover={<img alt="Thumbnail" src={thumbnail} className="card-cover-img" />}
      onClick={handleCardClick}
    >
      <h3>{title}</h3>
      <p>{address}</p>
      <p>Beds: {beds}</p>
      <p>Price: ${price} per night</p>
      <Rate disabled defaultValue={averageRating} />
      <p>{totalReviews} reviews</p>
    </Card>
  );
};

export default Cards;
