// TimeSetForm.jsx
import React from 'react';
import { Form, DatePicker } from 'antd';

const TimeSetForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="dateRange"
        label="Availability Date Range"
        rules={[{ required: true, message: 'Please select the date range' }]}
      >
        <DatePicker.RangePicker />
      </Form.Item>
    </Form>
  );
};

export default TimeSetForm;
