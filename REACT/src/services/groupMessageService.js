import axios from 'axios';

const API_URL = 'http://localhost:8080/api/groupMessage';

export const getMessagesForChat = async (buildingId) => {
    try {
        const response = await axios.get(`${API_URL}/getMessagesForChat/${buildingId}`)
        return response;
    } catch (error) {
        throw error;
    }
};

export const addNewMessage = async (message) => {
    try {        
        const response = await axios.post(`${API_URL}/addGroupMessage`, message);
        return response;
    } catch (error) {
        throw error;
    }
};


// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/groupMessage';

// const axiosInstance = axios.create({
//     withCredentials: true,
//   });

// export const getMessagesForChat = async (buildingId) => {
//     try {
//         const response = await axiosInstance.get(`${API_URL}/getMessagesForChat/${buildingId}`)
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

// export const addNewMessage = async (message) => {
//     try {
//         const response = await axiosInstance.post(`${API_URL}/addGroupMessage`, message);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };
