import { PlusOutlined } from '@ant-design/icons';
import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  Upload,
} from 'antd';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormDisabledDemo = () => {
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

        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item label="Address">
          <Input />
        </Form.Item>
        <Form.Item label="Price">
          <Input />
        </Form.Item>

        <Form.Item label="Thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
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
          <Input />
        </Form.Item>

        <Form.Item label="Bathrooms">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Bedrooms">
          <InputNumber />
        </Form.Item>

        <Form.Item label="Amenities">
          <Input />
        </Form.Item>

        <Form.Item label="Thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
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
export default () => <FormDisabledDemo />;
