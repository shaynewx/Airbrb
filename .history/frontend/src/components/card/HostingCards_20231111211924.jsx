import React from 'react';
import { Button, Card, Rate, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { publishListing } from '../form/apiService';

// TODO: 添加删除房源信息的API调用
const deleteListing = () => {
  console.log('delete listing');
}

// 每个具体的卡片组件都会接收一个包含所有房源信息的对象作为props
const Cards = ({ id, title, address, type, beds, bedrooms, bathrooms, amenities, thumbnail, reviews, price, images, owner, postedOn, published, availability }) => {
  console.log(
    'id:', id,
    //   'title:', title,
    //   'address:', address,
    //   'type:', type,
    //   'beds:', beds,
    //   'bedrooms:', bedrooms,
    //   'bathrooms', bathrooms,
    //   'amenities:', amenities,
    //   'thumbnail:', thumbnail,
    //   'reviews', reviews,
    //   'price:', price,
    'owner：', owner,
    '', postedOn,
    published,
    availability)
  const navigate = useNavigate();
  // 检查当前登录用户是否是房源的房东,如果不是房东，不渲染这个房源卡片
  const currentUserId = localStorage.getItem('userId');
  const isOwner = owner === currentUserId;
  if (!isOwner) {
    return null;
  }
  // 定义editListing函数，当点击编辑按钮时触发
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
        images
      }
    });
  };
  // 确保reviews是数组并且不为空，然后计算平均评分
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0; // 如果reviews未定义或为空数组，平均评分为0
  const totalReviews = reviews ? reviews.length : 0; // 如果reviews未定义，则评价数量为0

  const handlePublishListing = async () => {
    // TODO:需要先跳出来一个弹框让用户选择时间
    // 然后判断availability是否为空
    if (!availability || availability.length === 0) {
      message.error('Cannot publish listing without available dates.');
      return;
    }
    try {
      const result = await publishListing(id, availability);
      if (result.success) {
        message.success('Listing published successfully!');
        // TODO: 更新页面状态或重定向
      } else {
        message.error(result.error || 'Failed to publish listing.');
      }
    } catch (error) {
      message.error('An error occurred while publishing the listing.');
      console.error(error);
    }
  };

  return (
    <Card
      hoverable
      style={{ width: 290 }}
      cover={<img alt="Thumbnail" src={thumbnail} className="card-cover-img" />}
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
      <Button style={{ margin: '5px' }} onClick={handlePublishListing}>Publish</Button>
    </Card>
  );
};

export default Cards;
