import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import ListingForm from './ListingForm';
import { getListingById, updateListing } from './apiService';

const EditListing = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { listingId } = useParams();

  useEffect(() => {
    const fetchListingData = async () => {
      try {
        const response = await getListingById(listingId);
        if (response) {
          // Assuming the response structure matches your data needs
          form.setFieldsValue(response);
        }
      } catch (error) {
        message.error('Failed to fetch listing data');
      }
    };

    fetchListingData();
  }, [listingId, form]);

  const onSave = async (values) => {
    try {
      const response = await updateListing(listingId, values);
      if (response.success) {
        message.success('Listing updated successfully');
        navigate('/'); // Navigate to the listings page or wherever is appropriate
      } else {
        message.error('Failed to update listing');
      }
    } catch (error) {
      message.error('An error occurred while updating the listing');
    }
  };

  const onCancel = () => {
    navigate('/'); // Navigate to the listings page or wherever is appropriate
  };

  return (
    <div>
      <h2>Edit Listing</h2>
      <Form form={form} onFinish={onSave}>
        <ListingForm form={form} />
        <Form.Item>
          <button type="submit">Save</button>
          <button onClick={onCancel}>Cancel</button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditListing;
