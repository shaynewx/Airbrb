import React, { useState } from 'react';
import { Button, Modal, Form, message } from 'antd';
import FormDisabledDemo from './CreateListingForm';

const CreateNewListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const apiPOST = (values) => {
    // Process the values and create the data structure you want
    const dataToSubmit = {
      title: values.title,
      address: values.address,
      price: values.price,
      thumbnail: thumbnailBase64,
      metadata: { /* ...other values except title, address, price, thumbnail... */ }
    };

    console.log('Ready to submit: ', dataToSubmit);
    // Here you would handle the actual POST request, for example:
    // axios.post('your-api-endpoint', dataToSubmit)
    //   .then(response => { /* ... */ })
    //   .catch(error => { message.error('Upload failed'); });
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        apiPOST(values);
        setIsModalOpen(false);
      })
      .catch(info => {
        console.error('Validate Failed:', info);
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
        <FormDisabledDemo form={form} setThumbnailBase64={setThumbnailBase64} />
      </Modal>
    </>
  );
};

export default CreateNewListing;
