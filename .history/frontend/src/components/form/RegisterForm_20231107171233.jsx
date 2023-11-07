import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const REGISTER_API_URL = 'http://localhost:5005/user/auth/register';

const RegisterForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch(REGISTER_API_URL, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        message.error(data.error || 'Registration failed');
      }
    } catch (error) {
      message.error('Registration failed. Please try again later.');
    }
  };

  return (
    <Form
      form={form}
      name="register"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      initialValues={{
        remember: true,
      }}
      scrollToFirstError
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { type: 'email', message: 'The input is not a valid E-mail!' },
          { required: true, message: 'Please input your E-mail!' },
        ]}
      >
        <Input placeholder='Email'/>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
      >
        <Input placeholder="Name" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your Password!' },
          // Add additional rules if needed
        ]}
      >
        <Input.Password placeholder='Password'/>
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
        >
        <Button type="primary" htmlType="submit" style={{ margin: '5px' }}>
          Register
        </Button>
        <Button style={{ margin: '5px' }} onClick={() => navigate('/')>
          Cancel
        </Button>

      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
