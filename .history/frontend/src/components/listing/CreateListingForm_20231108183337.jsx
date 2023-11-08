import React from 'react';
import { Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// This function is responsible for converting the file into a Base64 encoded string
const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = error => message.error(`Error: ${error}`);
};

const FormDisabledDemo = ({ form, setThumbnailBase64, setImagesBase64 }) => {
  const handleThumbnailChange = info => {
    if (info.file.status === 'uploading' || info.file.status === 'done') {
      getBase64(info.file.originFileObj, setThumbnailBase64);
    }
    return info.fileList;
  };

  const handleImagesChange = info => {
    // Filter out removed files and convert the rest to base64
    const newImages = info.fileList.filter(file => !!file.originFileObj);
    Promise.all(newImages.map(file => new Promise((resolve, reject) => {
      getBase64(file.originFileObj, (result) => {
        file.base64 = result; // Assign base64 property for each file
        resolve();
      });
    }))).then(() => {
      // After all files have been processed, update the state
      setImagesBase64(newImages.map(file => file.base64));
    });
    return info.fileList;
  };

  return (
    <>
      <Form form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
        label="Thumbnail"
        name="thumbnail"
        valuePropName="fileList"
        getValueFromEvent={handleThumbnailChange}
        rules={[{ required: true, message: 'Please upload a thumbnail!' }]}
      >
        <Upload
          name="thumbnail"
          listType="picture-card"
          onChange={handleThumbnailChange}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

        <Form.Item label="Type" name="type"}>
          <Select>
            <Select.Option value="Apartment">Apartment</Select.Option>
            <Select.Option value="House">House</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bathrooms" name={['metadata', 'bathrooms']}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Bedrooms" name={['metadata', 'bedrooms']}>
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Amenities" name={['metadata', 'amenities']}>
          <Input />
        </Form.Item>

        <Form.Item
        label="Images"
        name="images"
        valuePropName="fileList"
        getValueFromEvent={handleImagesChange}
      >
        <Upload
          name="images"
          listType="picture-card"
          onChange={handleImagesChange}
          multiple
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      </Form>
    </>
  );
};
// eslint-disable-next-line react/display-name
export default FormDisabledDemo;
