import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateListing } from '../form/apiService';

const { TextArea } = Input;
const { Option } = Select;

// 用于将文件转换为 Base64 编码的函数
const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => callback(reader.result);
  reader.onerror = error => message.error(`Error: ${error}`);
};

const EditListing = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // 如果location.state存在，就使用它来设置表单的初始值
    if (location.state) {
      // 假设 thumbnail 和 images 是 base64 字符串数组
      const thumbnailFileList = location.state.thumbnail.map((base64, index) => ({
        uid: '-thumbnail-' + index,
        name: 'thumbnail-' + index,
        status: 'done',
        url: base64,
      }));

      const imagesFileList = location.state.images.map((base64, index) => ({
        uid: '-image-' + index,
        name: 'image-' + index,
        status: 'done',
        url: base64,
      }));

      form.setFieldsValue({
        title: location.state.title,
        address: location.state.address,
        type: location.state.type,
        beds: location.state.beds,
        bedrooms: location.state.bedrooms,
        bathrooms: location.state.bathrooms,
        amenities: location.state.amenities,
        price: location.state.price,
        thumbnail: thumbnailFileList,
        images: imagesFileList,
        // 注意: 这里可能需要对thumbnail和images做更多处理以符合Upload组件的格式
      });
    }
  }, [form, location.state]);

  const onSave = async (values) => {
    // 处理表单数据，准备发送到后端
    // 注意: 根据后端API的要求，这里可能需要对图片数据进行额外的处理
    // 首先处理 thumbnail 图片
    if (values.thumbnail && values.thumbnail.length > 0) {
      // 如果有 thumbnail 图片上传，就转换为 Base64
      getBase64(values.thumbnail[0].originFileObj, base64 => {
        const thumbnailBase64 = base64;
        // ... 使用 thumbnailBase64 继续处理或发送数据
      });
    }
    // 然后处理 images 图片
    const imagesBase64Promises = values.images?.filter(file => !!file.originFileObj).map(file => new Promise((resolve, reject) => {
      getBase64(file.originFileObj, base64 => {
        resolve(base64); // 将每个图片转换为 Base64 并解析 Promise
      });
    })) || [];

    Promise.all(imagesBase64Promises).then(imagesBase64 => {

    const listingDetails = {
      title: values.title,
      address: values.address,
      price: values.price,
      // 注意：这里的 thumbnail 和 images 应该是处理过的 Base64 字符串
      thumbnail: '', // 这里稍后设置实际的 Base64 字符串
      metadata: {
        type: values.type,
        beds: values.beds,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        amenities: values.amenities,
        images: imagesBase64 // 设置转换后的 Base64 字符串数组
      }
    };
    console.log('Listing Details:', listingDetails);

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
          <Upload listType="picture-card"
          fileList={form.getFieldValue('thumbnail') || []}
          >
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
          <Upload listType="picture-card"
          fileList={form.getFieldValue('images') || []}
          multiple
          >
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
