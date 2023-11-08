import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormDisabledDemo from './CreateListingForm';

const CreateNewListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 这是你想要在点击确定按钮后调用的其他函数
  const apiPOST = (values) => {
    console.log('The other function is called with values:', values);
    // 在这里执行你的逻辑，比如发送数据到服务器
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // 如果表单数据有效，调用apiPOST
        apiPOST(values);
        // 关闭模态窗口
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
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
        {/* 传递form实例给FormDisabledDemo */}
        <FormDisabledDemo form={form} />
      </Modal>
    </>
  );
};

export default CreateNewListing;
