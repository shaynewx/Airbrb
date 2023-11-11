import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const EditListing = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams(); // 我们假设路由是 "/edit-listing/:id"

  // 模拟保存函数
  const onSave = (values) => {
    console.log('Form Values:', values);
    // 这里你可以添加调用 API 的代码来保存数据
    // 假设保存成功，我们将导航回房源列表页面
    navigate('/listings');
  };

  // 取消编辑并返回房源列表
  const onCancel = () => {
    navigate('/listings');
  };

  return (
    <div>
      <h2>Edit Listing</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSave}
        initialValues={{
          // 这里设置表单的初始值，实际开发中应从API加载
          title: '',
          address: '',
          price: '',
          type: '',
          bathrooms: '',
          beds: '',
          bedrooms: '',
          amenities: '',
        }}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select>
            <Option value="apartment">Apartment</Option>
            <Option value="house">House</Option>
          </Select>
        </Form.Item>

        <Form.Item name="bathrooms" label="Bathrooms" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item name="beds" label="Beds" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>

        <Form.Item name="bedrooms" label="Bedrooms" rules={[{ required: true }]}>
          <TextArea />
        </Form.Item>

        <Form.Item name="amenities" label="Amenities">
          <Input />
        </Form.Item>

        <Form.Item name="thumbnail" label="Thumbnail">
          <Upload listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="images" label="Images">
          <Upload listType="picture-card" multiple>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditListing;
