/* eslint-disable no-undef */
import React from 'react';
import { mount } from '@cypress/react';
import TimeSetForm from '../../src/components/form/TimeSet';
import { Form } from 'antd';

// Create a wrapper component for mounting TimeSetForm in tests
const TimeSetFormWrapper = () => {
  const [form] = Form.useForm();
  return <TimeSetForm form={form} />;
};

describe('TimeSetForm Component Test', () => {
  it('should mount and contain a date range picker', () => {
    // Mount packaged components using Cypress
    mount(<TimeSetFormWrapper />);

    // Confirm if DatePicker.RangePicker exists
    cy.get('.ant-picker-range').should('exist');
  });
});
