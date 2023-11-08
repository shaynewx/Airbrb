import React, { useState } from 'react';
import { Button, Modal, Form, message } from 'antd';
import FormDisabledDemo from './ListingForm';

const CreateNewListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [imagesBase64, setImagesBase64] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const apiPOST = (values) => {
    const { title, address, price, ...metadata } = values;
    delete metadata.thumbnail;
    delete metadata.images;

    const dataToSubmit = {
      title,
      address: values.address,
      price: values.price,
      thumbnail: thumbnailBase64,
      metadata: {
        ...metadata,
        images: imagesBase64 // 将 images 作为 metadata 的一部分
      }
    };

    console.log('Submitted Data:', dataToSubmit);

    // TODO:Submit the data to the backend here
    // axios.post('/your-endpoint', dataToSubmit)
    //   .then(response => {
    //     // Handle the successful response here
    //   })
    //   .catch(error => {
    //     // Handle any errors here
    //   });

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
