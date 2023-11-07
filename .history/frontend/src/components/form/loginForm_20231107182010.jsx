import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const LOGIN_API_URL = 'http://localhost:5005/user/auth/login'; 

const LoginForm = () => {
  const navigate = useNavigate(); // 创建navigate函数实例

  const onFinish = async (values) => {
    try {
      // 向登录API发送POST请求
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // 将表单数据转换为JSON字符串
      });
      const data = await response.json(); // 解析JSON响应

      if (response.ok) {
        // 如果登录成功
        message.success('Login successful'); // 显示成功信息
        localStorage.setItem('token', data.token); // 存储token
        navigate('/dashboard'); // 跳转到dashboard页面
      } else {
        // 如果登录失败
        message.error(data.message || 'Login failed'); // 显示错误信息
      }
    } catch (error) {
      // 如果请求失败
      message.error('Login request failed. Please try again later.'); // 显示错误信息
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
