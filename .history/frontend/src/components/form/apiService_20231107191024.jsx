const BASE_URL = 'http://localhost:5005';

const request = async (url, method, data, authed = false) => {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-type': 'application/json',
      Authorization: authed
        ? `Bearer ${localStorage.getItem('token')}`
        : undefined,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// Register request
export const registerUser = (userData) => {
  return request(`${BASE_URL}/user/auth/register`, 'POST', userData);
};

// Login request
export const loginUser = (userData) => {
  return request(`${BASE_URL}/user/auth/login`, 'POST', userData);
};

// Logout request
export const logoutUser = () => {
  l
  return request(`${BASE_URL}/user/auth/logout`, 'POST', {}, true);
};
