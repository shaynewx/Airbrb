import React from 'react';
import { useParams, useNavigate, useLocation,useEffect } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = Select;

const EditListing = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // 如果路由状态存在，使用该状态作为表单的初始值
    if (location.state) {
      form.setFieldsValue({ ...location.state });
    } else {
      // 如果没有状态传递，可能需要从 API 加载数据
      // const fetchData = async () => { ... };
      // fetchData();
      console.log('No data');
    }
  }, [location, form]);

  // 模拟保存函数
  const onSave = (values) => {
    console.log('Saving listing with ID:', id);
    console.log('Form Values:', values);
    // 这里你可以添加调用 API 的代码来保存数据
    // 假设保存成功，我们将导航回房源列表页面
    navigate('/hosted-listing');
  };

  // 取消编辑并返回房源列表
  const onCancel = () => {
    navigate('/hosted-listing');
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
          title: 'a',
          address: 'a',
          price: 'a',
          type: 'a',
          bathrooms: 'a',
          beds: 'a',
          bedrooms: 'a',
          amenities: 'a',
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
            <Option value="other">Other</Option>
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

        <Form.Item
        name="thumbnail"
        label="Thumbnail"
        valuePropName="fileList"
        >
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
