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
      const response = await createNewListing(dataToSubmit);
      // console.log('Response:', response);

      if (response && response.listingId) {
        message.success('Listing created successfully');
        setThumbnailBase64('');
        setImagesBase64([]);
        form.resetFields();
      } else {
        message.error(response.error || 'An error occurred while creating the listing');
      }
    } catch (error) {
      message.error('An error occurred while creating the listing');
      console.error('There was an error with the request:', error);
    }
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
