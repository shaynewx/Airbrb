import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
    console.log('Received state:', location.state);

    if (location.state) {
      const { thumbnail, images, ...rest } = location.state;
      console.log('Original thumbnail:', thumbnail);
      console.log('Original images:', images);

      // 处理 Base64 编码的缩略图
      // eslint-disable-next-line multiline-ternary
      const formattedThumbnail = thumbnail ? [{
        uid: '-1', // UID 应该是一个字符串，且唯一
        name: 'thumbnail.png', // 因为是 Base64 编码，所以没有实际的文件名，这里可以自定义
        status: 'done', // 表示文件已经“上传”
        url: thumbnail, // Base64 编码的数据作为URL
      }] : [];
      console.log('Formatted thumbnail:', formattedThumbnail);
    console.log('Formatted images:', formattedImages);


      // 如果 images 也是以 Base64 编码的字符串数组
      // eslint-disable-next-line multiline-ternary
      const formattedImages = images ? images.map((img, index) => ({
        uid: String(-index - 2), // 确保 UID 是唯一的，字符串类型
        name: `image-${index}.png`, // 自定义文件名
        status: 'done',
        url: img, // Base64 编码的数据
      })) : [];

      form.setFieldsValue({ ...rest, thumbnail: formattedThumbnail, images: formattedImages });
    } else {
      // 如果没有状态传递，可能需要从 API 加载数据
      console.log('No data passed from the previous route!');
    }
  }, [location, form]);

  // 模拟保存函数
  const onSave = (values) => {
    console.log('Saving listing with ID:', id);
    console.log('Form Values:', values);
    // TODO:这里你可以添加调用 API 的代码来保存数据
    // 保存成功，我们将导航回房源列表页面
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
