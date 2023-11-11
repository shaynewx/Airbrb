import React, { useState } from 'react';
import { Modal, Button, DatePicker, message } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const TimeSet = ({ onPublish }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dates, setDates] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (dates.length === 2) {
      // 调用onPublish，传递日期范围
      onPublish(dates);
      setIsModalOpen(false);
    } else {
      message.error('Please select a date range!');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDateChange = (dates, dateStrings) => {
    setDates(dateStrings);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Publish
      </Button>
      <Modal
        title="Set Availability Dates"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <RangePicker
          format="YYYY-MM-DD"
          onChange={onDateChange}
        />
      </Modal>
    </>
  );
};

export default TimeSet;
