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

const FormDisabledDemo = ({ form, setThumbnailBase64 }) => {

  const handleFileChange = info => {
    if (info.file.status === 'uploading' || info.file.status === 'done') {
      getBase64(info.file.originFileObj, setThumbnailBase64);
    }
    return info.fileList;
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      {/* Other form items */}
      {/* ... */}
      
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

      {/* Other form items */}
      {/* ... */}
    </Form>
  );
};

export default FormDisabledDemo;
