import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import { Form, Input, InputNumber, Select, Upload } from 'antd';

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormDisabledDemo = ({ form }) => {
  return (
    <>
      <Form
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

        {/* 设置Title为必填项 */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        {/* 设置Address为必填项 */}
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input the address!' }]}
        >
          <Input />
        </Form.Item>

        {/* 设置Price为必填项 */}
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
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload a thumbnail!' }]}
            >
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

        <Form.Item label="Type">
          <Select>
            <Select.Option value="Apartment">Apartment</Select.Option>
            <Select.Option value="House">House</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Bathrooms">
          <InputNumber />
        </Form.Item>
        {/* <Form.Item label="Bedrooms">
          <InputNumber />
        </Form.Item> */}
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
