import React, { useState } from 'react';
import { Button, Modal, Form, message } from 'antd';
import FormDisabledDemo from './ListingForm';
import { createNewListing } from './apiService';

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

    const dataToSubmit = {
      title,
      address,
      price,
      thumbnail: thumbnailBase64,
      metadata: {
        ...metadata,
        images: imagesBase64 // 将 images 作为 metadata 的一部分
      }
    };

    console.log('Submitted Data:', dataToSubmit);

    // Submit the data to the backend here
    try {
      const response = await createNewListing(dataToSubmit);
      if (response.success) {
        message.success('Listing created successfully');
        // TODO:Perform any additional actions on success (e.g., redirecting or clearing the form)
      } else {
        message.error(response.error || 'An error occurred while creating the listing');
        }
      } catch (error) {
        message.error('An error occurred while creating the listing');
        console.error('There was an error with the request:', error);
      }

    // Reset the base64 states and form after successful submission
    setThumbnailBase64('');
    setImagesBase64([]);
    form.resetFields();
  };

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
