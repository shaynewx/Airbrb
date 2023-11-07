import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const LoginForm = () => (
  <Form
  name="register"
  onFinish={onFinish}
  labelCol={{
    span: 8,
  }}
  wrapperCol={{
    span: 16,
  }}
  style={{
    maxWidth: 600, // 设置最大宽度与登录表单一致
  }}
  initialValues={{
    remember: true,
  }}
  scrollToFirstError
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
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
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

export default LoginForm;
