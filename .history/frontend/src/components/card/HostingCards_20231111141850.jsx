import React from 'react';
import { Button, Card, Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

function deleteListing () {
  // TODO: 删除房源信息
  console.log('delete listing');
}

function publishListing () {
  // TODO: 发布房源信息
  console.log('publish listing');
}

const Cards = ({ id, title, address, type, beds, bedrooms, bathrooms, amenities, thumbnail, reviews, price, images }) => {
  console.log(
    'id: ', id,
    'title: ', title,
    'address: ', address,
    ''type, beds, bedrooms, bathrooms, amenities, thumbnail, reviews, price, images)
  const navigate = useNavigate();
  const editListing = () => {
    navigate(`/edit-listing/${id}`, {
      state: {
        title,
        address,
        type,
        beds,
        bedrooms,
        bathrooms,
        amenities,
        thumbnail: thumbnail ? [thumbnail] : [], // 将字符串转换为数组或空数组
        reviews,
        price,
        // eslint-disable-next-line no-undef
        images: images ? [images] : [] // 假设 images 也需要被处理
      }
    });
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
      <Rate disabled defaultValue={averageRating} />
      <p>{totalReviews} reviews</p>
      <Button type="primary" style={{ margin: '5px' }} onClick={editListing}>Edit</Button>
      <Button style={{ margin: '5px' }} onClick={deleteListing}>Delete</Button>
      <Button style={{ margin: '5px' }} onClick={publishListing}>Publish</Button>
    </Card>
  );
};

export default Cards;
