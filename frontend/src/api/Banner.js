
import axiosInstance from "./axios";

const token = localStorage.getItem('adminToken');
export const uploadBanner = async (formData) => {
  try {
    const response = await axiosInstance.post('/banner/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getBanners = async () => {
  try {
    const response = await axiosInstance.get('/banner', {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const editBanner = async (bannerId, imageIndex, newImageFile) => {
    try {
      const formData = new FormData();
      formData.append('imageUrl', newImageFile); 
      formData.append('imageIndex', imageIndex); 
  
      const response = await axiosInstance.put(`/banner/${bannerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
        },
      });
      return response;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };
