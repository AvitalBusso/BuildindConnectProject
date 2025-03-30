import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addNewMessage, getMessagesForChat } from '../services/messageService';

export const getMessages = createAsyncThunk('user/getMessages', async ({ senderId, receiverId }, { rejectWithValue }) => {
  try {
    const messageData = await getMessagesForChat({ senderId, receiverId });
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


const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messagesList: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getMessages.fulfilled, (state, action) => {
        state.messagesList = action.payload;
        state.loading = false;
      })
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.messagesList = []
        state.error = action.payload;
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(addMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesList.push(action.payload);
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

export default messageSlice.reducer;
