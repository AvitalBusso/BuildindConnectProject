import axios from "axios";

const API_URL = 'http://localhost:8080/api/payments'

export const getPaymentsByUserId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getByUserId/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addNewPayment = async (payment) => {
  try {
    const response = await axios.post(`${API_URL}/addPayment`,payment);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addGeneralPaymentService = async ({payment,buildingId}) => {
  try {    
    const response = await axios.post(`${API_URL}/addGeneralPayment/${buildingId}`,payment);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteById = async (paymentId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${paymentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateP = async (paymentId) => {
  try {
    const response = await axios.put(`${API_URL}/updatePaid/${paymentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};




// import axios from "axios";

// const API_URL = 'http://localhost:8080/api/payments'

// const axiosInstance = axios.create({
//   withCredentials: true,
// });

// export const getPaymentsByUserId = async (id) => {
//   try {
//     const response = await axiosInstance.get(`${API_URL}/getByUserId/${id}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const addNewPayment = async (payment) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/addPayment`,payment);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const addGeneralPaymentService = async ({payment,buildingId}) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/addGeneralPayment/${buildingId}`,payment);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteById = async (paymentId) => {
//   try {
//     const response = await axiosInstance.delete(`${API_URL}/delete/${paymentId}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateP = async (paymentId) => {
//   try {
//     const response = await axiosInstance.put(`${API_URL}/updatePaid/${paymentId}`);
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

