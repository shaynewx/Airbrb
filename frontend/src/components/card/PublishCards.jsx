import React from 'react';
import { Card, Rate } from 'antd';

// 每个具体的卡片组件都会接收一个包含所有房源信息的对象作为props
const Cards = ({ id, title, address, type, beds, bedrooms, bathrooms, amenities, thumbnail, reviews, price, images, owner, postedOn, published, availability }) => {
  console.log(
    'id:', id,
    'title:', title,
    'address:', address,
    'type:', type,
    'beds:', beds,
    'bedrooms:', bedrooms,
    'bathrooms', bathrooms,
    'amenities:', amenities,
    'images:', images,
    'thumbnail:', thumbnail,
    'reviews', reviews,
    'price:', price,
    'owner:', owner,
    'post time', postedOn,
    'publish:', published,
    'availability:', availability)

  // 确保reviews是数组并且不为空，然后计算平均评分
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0; // 如果reviews未定义或为空数组，平均评分为0
  const totalReviews = reviews ? reviews.length : 0; // 如果reviews未定义，则评价数量为0

  return (
    <Card
      hoverable
      style={{ width: 290 }}
      cover={<img alt="Thumbnail" src={thumbnail} className="card-cover-img" />}
    >
      <h3>{title}</h3>
      <p>{address}</p>
      <p>Beds: {beds}</p>
      <p>Price: ${price} per night</p>
      {/* <p>{availability}</p> */}
      <Rate disabled defaultValue={averageRating} />
      <p>{totalReviews} reviews</p>
    </Card>
  );
};

export default Cards;
