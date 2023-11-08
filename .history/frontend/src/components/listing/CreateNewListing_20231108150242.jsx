import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const CreateNewListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // 这是你想要在点击确定按钮后调用的其他函数
  const otherFunction = () => {
    console.log('The other function is called');
    // 在这里执行你的逻辑
  };

  const handleOk = () => {
    // 调用其他函数
    otherFunction();
    // 然后关闭模态窗口
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default CreateNewListing;
