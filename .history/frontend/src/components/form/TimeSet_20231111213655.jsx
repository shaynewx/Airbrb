import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const TimeSet = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 处理时间设置逻辑
    setIsModalVisible(false);
    // 可以在这里调用API或进行其他操作
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Set Availability
      </Button>
      <Modal
        title="Set Availability"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* 时间选择器或其他内容 */}
      </Modal>
    </>
  );
};

export default TimeSet;
