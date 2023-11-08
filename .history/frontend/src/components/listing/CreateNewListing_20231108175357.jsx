import React, { useState } from 'react';
import { Button, Modal, Form, message } from 'antd';
import FormDisabledDemo from './CreateListingForm';

const CreateNewListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [setImagesBase64] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const apiPOST = (values) => {
    const metadata = { ...values };
    delete metadata.title;
    delete metadata.address;
    delete metadata.price;
    delete metadata.thumbnail;
    delete metadata.images;

    const dataToSubmit = {
      title: values.title,
      address: values.address,
      price: values.price,
      thumbnail: thumbnailBase64,
      metadata: metadata
    };

    // Here you would handle the submission to the backend
    console.log('Submitted Data:', dataToSubmit);

    // Reset the base64 states
    setThumbnailBase64('');
    setImagesBase64([]);

    // Additional API submission logic...
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
