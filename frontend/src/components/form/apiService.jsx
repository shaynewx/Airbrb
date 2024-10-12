const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://airbrb-shayne-2d6f81fc9a3b.herokuapp.com';

// 1.post function
const post = async (url, method, data = null, authed = false) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      // If authentication is required
      ...(authed && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
    // If there is data to transmit
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(url, config);

  // When response nothing
  if (method === 'POST' && url.endsWith('/logout')) {
    return response.ok ? { success: true } : { success: false, error: 'Logout failed' };
  }

  try {
    return await response.json();
  } catch (error) {
    return response.ok ? {} : null;
  }
};

// 2.get function
const get = async (url, authed = false, listingid = null) => {
  // If listingid is provided, add it as a query parameter
  const fullUrl = new URL(url);
  if (listingid) {
    fullUrl.searchParams.append('listingid', listingid);
  }

  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(authed && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
    },
  };

  try {
    const response = await fetch(fullUrl, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation: ' + error.message);
    return null;
  }
};

// 3.put function

// register request
export const registerUser = (userData) => {
  return post(`${BASE_URL}/user/auth/register`, 'POST', userData);
};

// login request
export const loginUser = (userData) => {
  return post(`${BASE_URL}/user/auth/login`, 'POST', userData);
};

// logout request
export const logoutUser = () => {
  return post(`${BASE_URL}/user/auth/logout`, 'POST', null, true);
};

// createNewListing request
export const createNewListing = (listingData) => {
  return post(`${BASE_URL}/listings/new`, 'POST', listingData, true);
};

// getListing request
export const getListing = () => {
  return get(`${BASE_URL}/listings`, false);
};

// getListingById request
export const getListingById = (listingId) => {
  return get(`${BASE_URL}/listings/${listingId}`);
};

// update listing request
export const updateListing = async (id, data) => {
  try {
    const response = await fetch(`${BASE_URL}/listings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Could not update listing: ', error);
    throw error;
  }
};

// publish listing request
export const publishListing = async (listingId, availabilityData) => {
  try {
    const response = await fetch(`${BASE_URL}/listings/publish/${listingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(availabilityData),
    });

    // 检查响应状态，如果不是 OK，抛出错误
    if (!response.ok) {
      throw new Error(`Failed to publish listing with status: ${response.status}`);
    }

    // 返回完整的 response 对象
    return response;
  } catch (error) {
    console.error('Cannot publish the listing:', error);
    throw error;
  }
};


// delete listing request
export const deleteListing = async (listingId) => {
  try {
    const response = await fetch(`${BASE_URL}/listings/${listingId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete the listing.');
    }
    return true;
  } catch (error) {
    console.error('Cannot delete the listing:', error);
    return false;
  }
};
