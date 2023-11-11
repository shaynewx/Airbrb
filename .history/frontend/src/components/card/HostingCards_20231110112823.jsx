import React from 'react';
import { Button, Card, Rate } from 'antd';

function editListing () {
  // TODO: 编辑房源信息
  console.log('edit listing');
}

function deleteListing () {
  // TODO: 删除房源信息
  console.log('delete listing');
}

function publishListing () {
  // TODO: 发布房源信息
  console.log('publish listing');
}

const Cards = ({ title, type, beds, bathrooms, thumbnail, reviews, price }) => {
  // 假设reviews是一个包含评分的对象数组，例如：[{ rating: 5 }, { rating: 4 }]
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={<img alt="Thumbnail" src={thumbnail} />}
    >
      <h3>{title}</h3>
      <p>Type: {type}</p>
      <p>Beds: {beds}</p>
      <p>Bathrooms: {bathrooms}</p>
      <p>Price: ${price} per night</p>
      {/* 显示星级评分和总评价数量 */}
      <Rate disabled defaultValue={averageRating} />
      <p>{totalReviews} reviews</p>
      <Button type="primary" style={{ margin: '5px' }} onClick={editListing}>Edit</Button>
      <Button style={{ margin: '5px' }} onClick={deleteListing}>Delete</Button>
      <Button style={{ margin: '5px' }} onClick={publishListing}>Publish</Button>
    </Card>
  );
};

export default Cards;
