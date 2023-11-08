import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormDisabledDemo from './CreateListingForm';

const CreateNewListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 这是你想要在点击确定按钮后调用的其他函数
  const apiPOST = (values) => {
    console.log('The other function is called with values:', values);
    // 在这里执行你的逻辑，比如发送数据到服务器
  };

  const handleOk = () => {
    // 点击确定之后，与后端交互，传入数据
    apiPOST();
    // 然后关闭模态窗口
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create a New Listing
      </Button>
      <Modal
        title="Create a New Listing"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormDisabledDemo />
      </Modal>
    </>
  );
};

export default CreateNewListing;
