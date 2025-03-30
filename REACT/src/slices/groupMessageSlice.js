import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addNewMessage, getMessagesForChat } from '../services/groupMessageService';

export const getMessages = createAsyncThunk('user/getMessages', async (buildingId, { rejectWithValue }) => {
    try {    
      const messageData = await getMessagesForChat(buildingId);
      return messageData.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response ? error.response.status : 500,
      });
    }
  });

  export const addMessage = createAsyncThunk('user/addMessage', async (message, { rejectWithValue }) => {
    try {
      const messageData = await addNewMessage(message);
      return messageData.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response ? error.response.status : 500, 
      });
    }
  });

const groupMessageSlice = createSlice({
    name: 'groupMessage',
    initialState: {
        groupMessagesList: [{}],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder

        .addCase(getMessages.fulfilled, (state, action) => {
            state.groupMessagesList = action.payload;
            state.loading = false;
          })
          .addCase(getMessages.pending, (state) => {
            state.loading = true;
          })
          .addCase(getMessages.rejected, (state, action) => {
            state.groupMessagesList = []
            state.loading = false
            state.error = {
              message: action.payload.message,
              status: action.payload.status,
            };
          })

          .addCase(addMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.groupMessagesList.push(action.payload);
          })
          .addCase(addMessage.pending, (state) => {
            state.loading = true;
          })
          .addCase(addMessage.rejected, (state, action) => {
            state.loading = false
            state.error = {
              message: action.payload.message,
              status: action.payload.status,
            };
          })
    }
});

export default groupMessageSlice.reducer;
