import React from 'react';
import { Button, Card, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

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

const Cards = ({ id, title, type, beds, bathrooms, thumbnail, reviews, price }) => {
  const navigate = useNavigate();
  const editListing = () => {
    navigate(`/edit-listing/${id}`); // Assume your path to edit a listing looks like this
  };
  // 确保reviews是数组并且不为空，然后计算平均评分
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0; // 如果reviews未定义或为空数组，平均评分为0
  const totalReviews = reviews ? reviews.length : 0; // 如果reviews未定义，则评价数量为0

  return (
    <Card
      hoverable
      style={{ width: 290 }}
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
