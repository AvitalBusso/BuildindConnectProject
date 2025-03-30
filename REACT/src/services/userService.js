import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUpUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/addUser`, user);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${API_URL}/update/${user.id}`, user);
    return response;
  } catch (error) {
    throw error;
  }
};



// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/users';

// const axiosInstance = axios.create({
//   withCredentials: true,
// });

// export const loginUser = async (user) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/login`, user);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const signUpUser = async (user) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/addUser`, user);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const signOutUser = async () => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/signout`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateUser = async (user) => {
//   try {
//     const response = await axiosInstance.put(`${API_URL}/update/${user.id}`, user);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };