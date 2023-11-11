import React, { useState } from 'react';
import { Button, Card, Rate, Modal, message, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import TimeSetForm from '../form/TimeSet';
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

  const [isTimeSetModalOpen, setIsTimeSetModalOpen] = useState(false);
  const [timeSetForm] = Form.useForm();

  const showTimeSetModal = () => {
    setIsTimeSetModalOpen(true);
  };

  // const handleTimeSetOk = async () => {
  //   try {
  //     // 修改日期格式
  //     const values = await timeSetForm.validateFields();
  //     console.log('Date Range values:', values.dateRange);
  //     if (!values.dateRange || values.dateRange.length !== 2) {
  //       throw new Error('Both start and end dates must be selected.');
  //     }

  //     // Format the date range correctly
  //     const availability = [
  //       {
  //         start: values.dateRange[0].format('YYYY-MM-DD'),
  //         end: values.dateRange[1].format('YYYY-MM-DD'),
  //       },
  //     ];
  //     console.log('Date Range:', availability);

  //     // 与后台API交互，将日期将可用性数据发布到后台，然后关闭模态框
  //     const response = await publishListing(id, { availability });
  //     if (response) {
  //       message.success('Listing published with date range: ' + JSON.stringify(availability));
  //       console.log('Listing published with date range:', availability);
  //       setIsTimeSetModalOpen(false);
  //     } else {
  //       console.error('Failed to publish listing:', response.status, response.statusText);
  //       message.error('Failed to publish listing.');
  //     }
  //   } catch (error) {
  //     console.error('Failed to publish listing:', error);
  //     message.error(error.message || 'Failed to publish listing.');
  //   }
  // };
  const handleTimeSetOk = async () => {
    try {
      const values = await timeSetForm.validateFields();
      if (!values.dateRange || values.dateRange.length !== 2) {
        throw new Error('Both start and end dates must be selected.');
      }

      // 正确地构建 availability 数据
      const availabilityData = {
        availability: [
          {
            start: values.dateRange[0].format('YYYY-MM-DD'),
            end: values.dateRange[1].format('YYYY-MM-DD'),
          },
        ],
      };

      // 传递正确的数据结构到 publishListing 函数
      const response = await publishListing(id, availabilityData);

      // 检查响应状态
      if (response.ok) {
        message.success('Listing published with date range.');
        setIsTimeSetModalOpen(false);
      } else {
        throw new Error(`Failed to publish listing with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to publish listing:', error);
      message.error(error.message || 'Failed to publish listing.');
    }
  };
  

  const handleTimeSetCancel = () => {
    setIsTimeSetModalOpen(false);
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
      <Button style={{ margin: '5px' }} onClick={showTimeSetModal}>Publish</Button>
      <Modal
        title="Set Availability"
        open={isTimeSetModalOpen}
        onOk={handleTimeSetOk}
        onCancel={handleTimeSetCancel}
      >
        <TimeSetForm form={timeSetForm} />
      </Modal>
    </Card>
  );
};

export default Cards;
