import React, { useState } from 'react';
import { Button, Card, Rate, Modal, message, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import TimeSetForm from '../form/TimeSet';
import { publishListing, deleteListing as deleteListingApi } from '../form/apiService';

// Each card will receive an object containing all listing information as props
const Cards = ({ id, title, address, type, beds, bedrooms, bathrooms, amenities, thumbnail, reviews, price, images, owner, postedOn, published, availability }) => {
  const navigate = useNavigate();

  // Check whether the currently logged in user is the landlord of the property.
  // If not, the property card will not be rendered.
  const currentUserId = localStorage.getItem('userId');
  const isOwner = owner === currentUserId;
  if (!isOwner) {
    return null;
  }
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
        thumbnail: thumbnail ? [thumbnail] : [], // Convert string to array or empty array
        reviews,
        price,
        images
      }
    });
  };
  // Make sure reviews is an array and not empty, then calculate the average rating
  const averageRating = reviews && reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
  const totalReviews = reviews ? reviews.length : 0;

  const [isTimeSetModalOpen, setIsTimeSetModalOpen] = useState(false);
  const [timeSetForm] = Form.useForm();

  const showTimeSetModal = () => {
    setIsTimeSetModalOpen(true);
  };

  const handleTimeSetOk = async () => {
    try {
      const values = await timeSetForm.validateFields();
      if (!values.dateRange || values.dateRange.length !== 2) {
        throw new Error('Both start and end dates must be selected.');
      }

      const availabilityData = {
        availability: [
          {
            start: values.dateRange[0].format('YYYY-MM-DD'),
            end: values.dateRange[1].format('YYYY-MM-DD'),
          },
        ],
      };

      const response = await publishListing(id, availabilityData);

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

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  // Show delete confirmation modal box
  const showDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(true);
  };

  // confirm delete operation
  const handleDeleteConfirm = async () => {
    const success = await deleteListingApi(id);
    if (success) {
      message.success('Listing has been deleted successfully.');
    } else {
      message.error('Failed to delete listing.');
    }
    setIsDeleteConfirmModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteConfirmModalOpen(false);
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
      <Button type="primary" style={{ margin: '5px' }} onClick={editListing} name='edit-button'>Edit</Button>
      <Button style={{ margin: '5px' }} onClick={showDeleteConfirmModal} name='delete-button'>Delete</Button>
      <Button style={{ margin: '5px' }} onClick={showTimeSetModal} name='publish-button'>Publish</Button>
      <Modal
        title="Set Availability"
        open={isTimeSetModalOpen}
        onOk={handleTimeSetOk}
        onCancel={handleTimeSetCancel}
      >
        <TimeSetForm form={timeSetForm} />
      </Modal>
      <Modal
        title="Confirm Delete"
        open={isDeleteConfirmModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this listing?</p>
      </Modal>
    </Card>
  );
};

export default Cards;
