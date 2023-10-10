import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000/";

export const testApiCall = async () => {
  try {
    const response = await axios.post(`${BASE_URL}test`, {});
    return response.data;
  } catch (error) {
    console.error('Error making API call', error);
    throw error;
  }
};