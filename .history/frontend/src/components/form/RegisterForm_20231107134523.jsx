// import React from 'react';
// import { Button, Form, Input } from 'antd';

// const onFinish = (values) => {
//   console.log('Success:', values);
// };

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

// // 定义确认密码的校验规则
// const validatePasswords = ({ getFieldValue }) => ({
//   validator (_, value) {
//     if (!value || getFieldValue('password') === value) {
//       return Promise.resolve();
//     }
//     return Promise.reject(new Error('The two passwords that you entered do not match!'));
//   },
// });

// const RegisterForm = () => (
//   <Form
//     name="register"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >

//     <Form.Item
//       label="Email"
//       name="email"
//       rules={[
//         {
//           type: 'email',
//           message: 'The input is not valid E-mail!',
//         },
//         {
//           required: true,
//           message: 'Please input your E-mail!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Name"
//       name="name"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your name!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your password!',
//         },
//         {
//           pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//           message: 'Password must be at least 8 characters, including 1 letter and 1 number',
//         },
//       ]}
//       hasFeedback
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item
//       label="Confirm Password"
//       name="confirm"
//       dependencies={['password']}
//       hasFeedback
//       rules={[
//         {
//           required: true,
//           message: 'Please confirm your password!',
//         },
//         validatePasswords,
//       ]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
//       <Button type="primary" htmlType="submit" style={{ margin: '5px' }}>
//         Register
//       </Button>
//       <Button style={{ margin: '5px' }}>
//         Cancel
//       </Button>
//     </Form.Item>
//   </Form>
// );

// export default RegisterForm;

import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

// 假设你的后端注册API的URL
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
          // 成功处理逻辑，例如存储token到localStorage
          localStorage.setItem('token', data.token);
          // 导航到其他页面，例如dashboard
          navigate('/dashboard');
        } else {
          // 如果后端返回错误，展示错误信息
          message.error(data.error || 'Registration failed');
        }
      } catch (error) {
        // 网络或其他错误处理
        message.error('Registration failed. Please try again later.');
      }
    };

    return (

  <Form
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
          type: 'email',
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
      hasFeedback
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      label="Confirm Password"
      name="confirm"
      dependencies={['password']}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
        validatePasswords,
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
        Register
      </Button>
      <Button style={{ margin: '5px' }}>
        Cancel
      </Button>
    </Form.Item>
  </Form>
);

export default RegisterForm;
