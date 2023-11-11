import React, { useState } from 'react';
import { Button, Card, Rate, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import TimeSet from '../form/TimeSet';

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
    'owner:', owner,
    'post时间', postedOn,
    '是否发布:', published,
    '可用时间:', availability)
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

  // 发布房源
  const [showTimeSet, setShowTimeSet] = useState(false);
  // 处理发布房源按钮的点击事件
  const handlePublishListing = () => {
    // 设置 showTimeSet 为 true 来显示 TimeSet 弹窗
    setShowTimeSet(true);
  };

  // 关闭 TimeSet 弹窗的函数
  const handleCloseTimeSet = () => {
    // 设置 showTimeSet 为 false 来隐藏 TimeSet 弹窗
    setShowTimeSet(false);
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
       {/* 条件渲染 TimeSet 弹窗 */}
       {showTimeSet && (
        <Modal
          title="Set Availability"
          visible={showTimeSet}
          onCancel={handleCloseTimeSet}
          footer={null} // 无默认底部按钮
        >
          <TimeSet onTimesSet={handleCloseTimeSet} />
        </Modal>
      )}
    </>
  );
};

export default Cards;
