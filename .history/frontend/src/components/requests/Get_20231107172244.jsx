import { message } from 'antd';

const baseURL = 'http://localhost:5005';

export const postRequest = async (path, data, onSuccess, onError) => {
  try {
    const response = await fetch(`${baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonData = await response.json();

    if (response.ok) {
      onSuccess(jsonData);
    } else {
      onError(jsonData.error || 'Request failed');
    }
  } catch (error) {
    onError('Request failed. Please try again later.');
  }
};
