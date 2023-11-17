import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateListing } from '../form/apiService';

const { TextArea } = Input;
const { Option } = Select;

// convert files to Base64 encoding
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
  // Add state for tracking Base64 encoding
  const [thumbnailBase64, setThumbnailBase64] = useState('');
  const [imagesBase64, setImagesBase64] = useState([]);

  useEffect(() => {
    // If location.state exists, use it to set the form's initial value.
    if (location.state) {
      const isString = (value) => typeof value === 'string' || value instanceof String;
      const thumbnailFileList = location.state.thumbnail.map((base64, index) => ({
        uid: '-thumbnail-' + index,
        name: 'thumbnail-' + index,
        status: 'done',
        url: isString(base64) ? base64 : '', // Ensure the url is a string
      }));
      const imagesArray = Array.isArray(location.state.images) ? location.state.images : [];
      const imagesFileList = imagesArray.map((base64, index) => ({
        uid: '-image-' + index,
        name: 'image-' + index,
        status: 'done',
        url: isString(base64) ? base64 : '',
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

  // accommodate deletion operations
  const handleThumbnailChange = async ({ file, fileList }) => {
    if (file.status === 'removed') {
      setThumbnailBase64('');
      form.setFieldsValue({ thumbnail: [] });
      return;
    }

    if (file.status === 'done') {
      const base64 = await getBase64(file.originFileObj);
      setThumbnailBase64(base64);
    }

    form.setFieldsValue({ thumbnail: fileList });
  };

  const handleImagesChange = async ({ file, fileList }) => {
    if (file.status === 'removed') {
      setImagesBase64(fileList.map(file => file.status === 'done' ? file.base64 : ''));
      form.setFieldsValue({ images: fileList });
      return;
    }

    // If the file is uploaded successfully, convert it to Base64
    if (file.status === 'done') {
      const base64 = await getBase64(file.originFileObj);
      file.base64 = base64;
    }

    // Update form
    setImagesBase64(fileList.filter(file => file.status === 'done').map(file => file.base64));
    form.setFieldsValue({ images: fileList });
  };
  const [isSaving, setIsSaving] = useState(false);
  const onSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    console.log('onSave called');
    try {
      const values = await form.validateFields();
      // Construct the metadata object without the thumbnail and images
      const { title, address, price, thumbnail, images, ...rest } = values;
      const metadata = rest;
      // Handle thumbnail conversion to Base64
      let thumbnailBase64String = thumbnailBase64;
      if (thumbnail && thumbnail.length > 0 && !thumbnailBase64) {
        thumbnailBase64String = await getBase64(thumbnail[0].originFileObj).catch(e => {
          console.error('Error converting thumbnail to base64:', e);
        });
      }
      // Handle images conversion to Base64
      let imagesBase64Array = imagesBase64;
      if (images && images.length > 0 && imagesBase64.length === 0) {
        imagesBase64Array = await Promise.all(images.map(file => getBase64(file.originFileObj))).catch(e => {
          console.error('Error converting images to base64:', e);
        });
      }
      // Construct the data object to submit
      const dataToSubmit = {
        title,
        address,
        price,
        thumbnail: thumbnailBase64String,
        metadata: {
          ...metadata,
          images: imagesBase64Array,
        },
      };

      console.log('Attempting to update listing...');
      console.log('Listing Details:', dataToSubmit);

      const response = await updateListing(id, dataToSubmit);
      if (response.status >= 200 && response.status < 300) {
        message.success('Update successfully!');
        navigate('/hosted-listing');
      } else {
        console.error('Failed response:', response);
        console.error('response.status:', response.status);
        message.error(`Update Failed: ${response.statusText || 'Unknown Error'}`);
      }
    } catch (error) {
      console.error('Error on save:', error);
      message.error('Update Failed');
    }
    setIsSaving(false);
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
          <Button type="primary" htmlType="submit" name='save-button'>
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
