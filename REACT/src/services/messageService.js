import axios from 'axios';

const API_URL = 'http://localhost:8080/api/messages';

export const getMessagesForChat = async ({ senderId, receiverId }) => {
    try {
        const response = await axios.get(`${API_URL}/getMessagesForChat/${senderId}`, {
            params: {
                receiverId: receiverId,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const addNewMessage = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/addMessage`, message);
        return response;
    } catch (error) {
        throw error;
    }
};



// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/messages';

// const axiosInstance = axios.create({
//     withCredentials: true,
//   });

// export const getMessagesForChat = async ({ senderId, receiverId }) => {
//     try {
//         const response = await axiosInstance.get(`${API_URL}/getMessagesForChat/${senderId}`, {
//             params: {
//                 receiverId: receiverId,
//             },
//         });
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

// export const addNewMessage = async (message) => {
//     try {
//         const response = await axiosInstance.post(`${API_URL}/addMessage`, message);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// };
