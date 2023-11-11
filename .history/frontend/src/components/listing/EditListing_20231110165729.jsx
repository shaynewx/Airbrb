import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// const { TextArea } = Input;
// const { Option } = Select;

const EditListing = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (location.state) {
      const { thumbnail, images, ...rest } = location.state;
      // 处理 Base64 编码的缩略图
      const formattedThumbnail = thumbnail
        ? [{
            uid: '-1',
            name: 'thumbnail.png',
            status: 'done',
            url: thumbnail,
          }]
        : [];

      // 如果 images 也是以 Base64 编码的字符串数组
      const formattedImages = images
        ? images.map((img, index) => ({
          uid: String(-index - 2),
          name: `image-${index}.png`,
          status: 'done',
          url: img,
        }))
        : [];

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
    // TODO: 这里你可以添加调用 API 的代码来保存数据
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
          // 这里设置表单的初始值，实际开发中应从 API 加载
          title: '',
          address: '',
          price: 0,
          type: 'apartment',
          bathrooms: 0,
          beds: 0,
          bedrooms: '',
          amenities: '',
        }}
      >
        {/* 这里插入表单字段 */}
        {/* 例如：<Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item> */}

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
