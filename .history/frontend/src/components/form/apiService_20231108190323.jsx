const BASE_URL = 'http://localhost:5005';

// request function
const post = async (url, method, data = null, authed = false) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // 如果需要认证，则添加Authorization头
      ...(authed && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
    // 如果有数据传入，就添加body属性
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(url, config);

  // 对于注销请求，因为可能不返回JSON，所以需要特别处理
  if (method === 'POST' && url.endsWith('/logout')) {
    return response.ok ? { success: true } : { success: false, error: 'Logout failed' };
  }

  // 尝试解析JSON，如果失败则返回null
  try {
    return await response.json();
  } catch (error) {
    return response.ok ? {} : null;
  }
};

// register request
export const registerUser = (userData) => {
  return request(`${BASE_URL}/user/auth/register`, 'POST', userData);
};

// login request
export const loginUser = (userData) => {
  return request(`${BASE_URL}/user/auth/login`, 'POST', userData);
};

// logout request
export const logoutUser = () => {
  return request(`${BASE_URL}/user/auth/logout`, 'POST', null, true);
};

// createNewListing request
export const createNewListing = (listingData) => {
  return request(`${BASE_URL}/listings/new`, 'POST', listingData, true);
};
