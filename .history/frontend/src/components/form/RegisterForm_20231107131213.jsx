import React from 'react';
import { Button, Form, Input } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const RegisterForm = () => (
      // 检查确认密码是否与密码匹配
  const compareToFirstPassword = (rule, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject(new Error('Two passwords that you enter is inconsistent!'));
    } else {
      return Promise.resolve();
    }
  };
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          type: 'email', // 使用内置的电子邮件规则
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input your E-mail!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your name!',
        },
        {
          whitespace: true,
          message: 'Name cannot be empty!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        {
          pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          message: 'Password must be at least 8 characters, including 1 letter and 1 number',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            min: 6,
            message: 'Password must be at least 6 characters long.',
          },
          {
            validator: compareToFirstPassword,
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit" style={{ margin: '5px' }}>
        Submit
      </Button>
      <Button style={{ margin: '5px' }} >
        Cancel
      </Button>
    </Form.Item>
  </Form>
);

export default RegisterForm;
