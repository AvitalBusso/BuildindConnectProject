import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ads';

export const getByBuildingId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getByBuildingId/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewAd = async (ad) => {
  try {
    const response = await axios.post(`${API_URL}/addAd`,ad);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (adId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${adId}`);
    return response;
  } catch (error) {
    throw error;
  }
};





// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/ads';

// const axiosInstance = axios.create({
//   withCredentials: true,
// });


// export const getByBuildingId = async (id) => {
//   try {
//     const response = await axiosInstance.get(`${API_URL}/getByBuildingId/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const addNewAd = async (ad) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/addAd`,ad);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteById = async (adId) => {
//   try {
//     const response = await axiosInstance.delete(`${API_URL}/delete/${adId}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };ד