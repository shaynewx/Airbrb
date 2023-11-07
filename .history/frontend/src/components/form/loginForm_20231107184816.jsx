import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './apiService';

// const LOGIN_API_URL = 'http://localhost:5005/user/auth/login';

const LoginForm = () => {
  const navigate = useNavigate(); // 创建navigate函数实例

  const onFinish = async (values) => {
    try {
      const data = await loginUser(values);
      if (data.token) {
        message.success('Login successful');
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        message.error(data.message || 'Login failed');
      }
    } catch (error) {
      message.error('Login request failed. Please try again later.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
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
    <div>Have not register?</div>
  </Form>
  );
};

export default LoginForm;
