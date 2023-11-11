import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateListing } from '../form/apiService';

const { TextArea } = Input;
const { Option } = Select;

const EditListing = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (location.state) {
      // console.log('Thumbnail type:', typeof location.state.thumbnail);
      // 创建 thumbnail 的 fileList
      // const thumbnailFileList = location.state.thumbnail.map((base64, index) => ({
      //   uid: String(-index),
      //   name: `thumbnail-${index}.png`,
      //   status: 'done',
      //   url: base64, // base64 is a string
      // }));
      // // 创建 images 的 fileList
      // const imagesFileList = location.state.images.map((base64, index) => ({
      //   uid: `image-${index}`,
      //   name: `image-${index}.png`,
      //   status: 'done',
      //   url: base64, // base64 is a string
      // }));

      // 使用form.setFieldsValue来设置表单的值
      form.setFieldsValue({
        title: location.state.title,
        address: location.state.address,
        type: location.state.type,
        beds: location.state.beds,
        bedrooms: location.state.bedrooms,
        bathrooms: location.state.bathrooms,
        amenities: location.state.amenities,
        price: location.state.price,
        // thumbnail: thumbnailFileList,
        // 同样，images也可能需要特殊处理
        // images: imagesFileList,
      });
    }
  }, [form, location.state]);

  // 模拟保存函数
  const onSave = (values) => {
    console.log('Saving listing with ID:', id);
    // TODO:这里你可以添加调用 API 的代码来保存数据
    // 提取图片文件的base64字符串
    const thumbnailBase64 = values.thumbnail?.[0]?.originFileObj;
    const imagesBase64 = values.images?.map(img => img.originFileObj) || [];
    // 把values封装成后台需要的格式
    const listingDetails = {
      title: values.title,
      address: values.address,
      type: values.type,
      beds: values.beds,
      bedrooms: values.bedrooms,
      bathrooms: values.bathrooms,
      amenities: values.amenities,
      price: values.price,
      thumbnail: thumbnailBase64, // 假设后台接受base64编码的图片
      images: imagesBase64, // 假设后台接受base64编码的图片数组
    };
      // 调用更新列表的API
  try {
    const response = await updateListing(id, listingDetails);
    if (response && response.success) {
      message.success('房源更新成功');
      navigate('/hosted-listing');
    } else {
      message.error('房源更新失败: ' + (response.error || '未知错误'));
    }
  } catch (error) {
    console.error('更新房源时发生错误:', error);
    message.error('房源更新时发生网络错误');
  }
};

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
          title: '',
          address: '',
          price: 0,
          type: 'Other',
          bathrooms: 0,
          beds: 0,
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

        <Form.Item name="type" label="Type">
          <Select>
            <Option value="apartment">Apartment</Option>
            <Option value="house">House</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item name="bathrooms" label="Bathrooms">
          <InputNumber />
        </Form.Item>

        <Form.Item name="beds" label="Beds">
          <InputNumber />
        </Form.Item>

        <Form.Item name="bedrooms" label="Bedrooms">
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

        <Form.Item
        name="images"
        label="Images"
        valuePropName="fileList"
        >
          <Upload listType="picture-card" multiple>
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={onSave}>
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
