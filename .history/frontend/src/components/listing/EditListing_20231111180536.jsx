import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateListing } from '../form/apiService';

const { TextArea } = Input;
const { Option } = Select;

// 用于将文件转换为 Base64 编码的函数
const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const EditListing = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  // 添加用于跟踪Base64编码的状态
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [imagesBase64, setImagesBase64] = useState([]);

  useEffect(() => {
    // 如果location.state存在，就使用它来设置表单的初始值
    if (location.state) {
      // 假设 thumbnail 和 images 是 base64 字符串数组
      const isString = (value) => typeof value === 'string' || value instanceof String;
      const thumbnailFileList = location.state.thumbnail.map((base64, index) => ({
        uid: '-thumbnail-' + index,
        name: 'thumbnail-' + index,
        status: 'done',
        url: isString(base64) ? base64 : '', // Ensure the url is a string
      }));
      // 确保 images 总是一个数组
      const imagesArray = Array.isArray(location.state.images) ? location.state.images : [];
      const imagesFileList = imagesArray.map((base64, index) => ({
        uid: '-image-' + index,
        name: 'image-' + index,
        status: 'done',
        url: isString(base64) ? base64 : '', // 确保url是字符串
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
      });
    }
  }, [form, location.state]);

  // 修改handleThumbnailChange和handleImagesChange函数以适应删除操作
  const handleThumbnailChange = async ({ file, fileList }) => {
    // 如果是删除操作，直接更新状态和表单值
    if (file.status === 'removed') {
      setThumbnailBase64(''); // 清空缩略图Base64编码
      form.setFieldsValue({ thumbnail: [] });
      return;
    }

    // 如果文件上传成功，转换为Base64
    if (file.status === 'done') {
      const base64 = await getBase64(file.originFileObj);
      setThumbnailBase64(base64);
    }

    form.setFieldsValue({ thumbnail: fileList });
  };

  const handleImagesChange = async ({ file, fileList }) => {
    // 处理删除操作
    if (file.status === 'removed') {
      // 更新Base64编码数组
      setImagesBase64(fileList.map(file => file.status === 'done' ? file.base64 : ''));
      form.setFieldsValue({ images: fileList });
      return;
    }

    // 如果文件上传成功，转换为Base64
    if (file.status === 'done') {
      const base64 = await getBase64(file.originFileObj);
      file.base64 = base64; // 将Base64编码存储在文件对象中
    }

    // 更新状态和表单值
    setImagesBase64(fileList.filter(file => file.status === 'done').map(file => file.base64));
    form.setFieldsValue({ images: fileList });
  };

  const onSave = async () => {
    // 从表单获取字段值
    cconst values = await form.validateFields();
    console.log('Submitted form values:', values);

    const { title, address, price, thumbnail, images, ...rest } = values;
    // Convert thumbnail and images to Base64 if they are not already
    let thumbnailBase64String = thumbnailBase64;
    let imagesBase64Array = imagesBase64;
    if (thumbnail && thumbnail.length > 0 && !thumbnailBase64) {
      thumbnailBase64String = await getBase64(thumbnail[0].originFileObj);
    }

    if (images && images.length > 0 && imagesBase64.length === 0) {
      imagesBase64Array = await Promise.all(images.map(file =>
        getBase64(file.originFileObj)
      ));
    }

    // Construct the data object to submit
    const dataToSubmit = {
      title,
      address,
      price,
      thumbnail: thumbnailBase64String,
      metadata: {
        ...rest,
        images: imagesBase64Array,
      },
    };

    console.log('尝试更新房源...');
    console.log('Listing Details:', dataToSubmit);

    try {
      // 在这里发送listingDetails到后端...
      const response = await updateListing(id, dataToSubmit);
      if (response && response.ok) {
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
          <Upload
            listType="picture-card"
            fileList={form.getFieldValue('thumbnail') || []}
            onChange={handleThumbnailChange}
            onRemove={file => {
              // 在这里处理删除逻辑
              setThumbnailBase64('');
              form.setFieldsValue({
                thumbnail: form.getFieldValue('thumbnail').filter(f => f.uid !== file.uid),
              });
            }}
          >
          {form.getFieldValue('thumbnail') && form.getFieldValue('thumbnail').length >= 1
            ? null
            : (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
              )}
          </Upload>
        </Form.Item>

        <Form.Item
          name="images"
          label="Images"
          valuePropName="fileList"
        >
          <Upload
            listType="picture-card"
            fileList={form.getFieldValue('images') || []}
            onChange={handleImagesChange}
            onRemove={file => {
              // 在这里处理删除逻辑
              setThumbnailBase64('');
              form.setFieldsValue({
                thumbnail: form.getFieldValue('thumbnail').filter(f => f.uid !== file.uid),
              });
            }}
            multiple
          >
            {form.getFieldValue('images') && form.getFieldValue('images').length >= 8
              ? null
              : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
                )}
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
