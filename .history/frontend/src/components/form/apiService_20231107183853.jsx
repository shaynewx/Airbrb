const BASE_URL = 'http://localhost:5005/user/auth';

const request = async (url, method, data) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Register request
export const registerUser = (userData) => {
  return request(`${BASE_URL}/register`, 'POST', userData);
};

// 登录请求
export const loginUser = (userData) => {
  return request(`${BASE_URL}/login`, 'POST', userData);
};
