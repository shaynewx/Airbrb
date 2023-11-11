// EditListing.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, message, Button } from 'antd';
import ListingForm from './ListingForm'; // 表单组件
// import { getListingById, updateListing } from './apiService'; // API服务函数

const EditListing = () => {
  // const [form] = Form.useForm();
  // const navigate = useNavigate();
  // const { id } = useParams();

  // useEffect(() => {
  //   const fetchListingData = async () => {
  //     try {
  //       const response = await getListingById(id);
  //       if (response) {
  //         // 假设响应直接包含房源详情数据
  //         form.setFieldsValue({ ...response });
  //       }
  //     } catch (error) {
  //       message.error('Failed to fetch listing data');
  //     }
  //   };

  //   fetchListingData();
  // }, [id, form]);

  // const onSave = async (values) => {
  //   try {
  //     const response = await updateListing(id, values);
  //     if (response.success) {
  //       message.success('Listing updated successfully');
  //       navigate('/'); // 保存后返回房源列表
  //     } else {
  //       message.error('Failed to update listing');
  //     }
  //   } catch (error) {
  //     message.error('An error occurred while updating the listing');
  //   }
  // };

  return (
    <div>
      <h2>Edit Listing</h2>
      {/* <Form form={form} onFinish={onSave}>
        <ListingForm form={form} />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
          <Button onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Form.Item>
      </Form> */}
    </div>
  );
};

export default EditListing;
