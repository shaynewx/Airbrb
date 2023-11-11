import React, { useState } from 'react';
import { Button, Modal, Form, message } from 'antd';
import FormDisabledDemo from './ListingForm';
import { createNewListing } from '../form/apiService';

const CreateNewListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [imagesBase64, setImagesBase64] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const apiPOST = async (values) => {
    const { title, address, price, ...metadata } = values;
    delete metadata.thumbnail;
    delete metadata.images;
    // 封装数据
    const dataToSubmit = {
      title,
      address,
      price,
      thumbnail: thumbnailBase64,
      metadata: {
        ...metadata,
        images: imagesBase64
      }
    };

    console.log('Submitted Data:', dataToSubmit);

    // Submit the data to the backend
    try {
      const response = await updateListing(id, dataToSubmit);
      // Assuming your API returns a 2XX status code for success
      if (response && response.ok) {  // Check if `response.ok` is true for a successful status code
        message.success('Listing updated successfully');
        setThumbnailBase64('');
        setImagesBase64([]);
        form.resetFields();
        navigate('/hosted-listing'); // Redirect or do some other action
      } else {
        // If the response has a `statusText` or other error message, display it
        message.error(response.statusText || 'An error occurred while updating the listing');
      }
    } catch (error) {
      // Generic error handling if the request itself failed
      message.error('An error occurred while updating the listing');
      console.error('There was an error with the request:', error);
    }

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // If form data is valid, call apiPOST
        apiPOST(values);
        // Close modal
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.error('Validate Failed:', info);
        message.error('Form validation failed, please check the inputs.');
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a New Listing
      </Button>
      <Modal
        title="Create a New Listing"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormDisabledDemo
          form={form}
          setThumbnailBase64={setThumbnailBase64}
          setImagesBase64={setImagesBase64}
        />
      </Modal>
    </>
  );
};

export default CreateNewListing;
