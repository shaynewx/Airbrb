import React from 'react';
import { Form, Input, InputNumber, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

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
        getValueFromEvent={handleFileChange}
        rules={[{ required: true, message: 'Please upload a thumbnail!' }]}
      >
        <Upload
          name="thumbnail"
          action="/upload.do"
          listType="picture-card"
          onChange={handleFileChange}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

        <Form.Item label="Type">
          <Select>
            <Select.Option value="Apartment">Apartment</Select.Option>
            <Select.Option value="House">House</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bathrooms">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Bedrooms">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Amenities">
          <Input />
        </Form.Item>

        <Form.Item label="Images" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
// eslint-disable-next-line react/display-name
export default FormDisabledDemo;
