// EditListing.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { updateListing, getListingById } from './form/apiService';

const EditListing = () => {
  const { listingId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const data = await getListingById(listingId);
      form.setFieldsValue({ ...data });
    };
    fetchListing();
  }, [listingId, form]);

  const handleSave = async (values) => {
    try {
      const response = await updateListing(listingId, values);
      if (response.success) {
        message.success('Listing updated successfully');
        navigate('/listings'); // Navigate to the listings page
      } else {
        message.error('Failed to update listing');
      }
    } catch (error) {
      message.error('An error occurred while updating the listing');
    }
  };

  const handleCancel = () => {
    navigate('/listings'); // Navigate to the listings page
  };

  // Form layout and fields...
};

export default EditListing;
