import axios from 'axios';

const API_URL = 'http://localhost:8080/api/buildings';

export const loginBuilding = async (building) => {
  try {
    const response = await axios.post(`${API_URL}/login`, building);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUpBuilding = async (building) => {
  try {
    const response = await axios.post(`${API_URL}/addBuilding`, building);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getByBuildingId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getById/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTenants = async (id) => {
  try {    
    const response = await axios.get(`${API_URL}/getTenantList/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};


// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/buildings';

// const axiosInstance = axios.create({
//   withCredentials: true,
// });

// export const loginBuilding = async (building) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/login`, building);
//     console.log(response);
    
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const signUpBuilding = async (building) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/addBuilding`, building);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getByBuildingId = async (id) => {
//   try {
//     const response = await axiosInstance.get(`${API_URL}/getById/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getTenants = async (id) => {
//   try {    
//     const response = await axiosInstance.get(`${API_URL}/getTenantList/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };