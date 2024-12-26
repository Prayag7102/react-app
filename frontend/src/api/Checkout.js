import axiosInstance from './axios';

export const createCheckout = async (checkoutData) => {
  try {
    const response = await axiosInstance.post('/checkout', checkoutData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  export const getAllOrders = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axiosInstance.get('/checkout/all', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error.response?.data || error.message;
    }
  };
