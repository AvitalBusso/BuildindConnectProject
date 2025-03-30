import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addGeneralPaymentService, addNewPayment, deleteById, getPaymentsByUserId, updateP } from "../services/paymentsService";

export const getPaymentsByUser = createAsyncThunk('payments/getByuser', async (id, { rejectWithValue }) => {
  try {
    const payments = await getPaymentsByUserId(id);
    return payments.data
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
})

export const addPayment = createAsyncThunk('payments/addPayment', async (payment, { rejectWithValue }) => {
  try {
    const response = await addNewPayment(payment);
    return response.data
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
})

export const addGeneralPayment = createAsyncThunk('payments/addGeneralPayment', async ({payment,buildingId}, { rejectWithValue }) => {
  try {
    const response = await addGeneralPaymentService({payment,buildingId});
    return response.data
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
})

export const deletePayment = createAsyncThunk('payments/deletePayment', async (paymentId, { rejectWithValue }) => {
  try {
    await deleteById(paymentId);
    return paymentId
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
})

export const updatePaid = createAsyncThunk('payments/updatePayment', async (paymentId, { rejectWithValue }) => {
  try {
    const response = await updateP(paymentId);
    return response.data
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
})

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    AllMyPayments: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder

      .addCase(addPayment.fulfilled, (state, action) => {
        state.AllMyPayments.push(action.payload);
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(getPaymentsByUser.fulfilled, (state, action) => {
        state.AllMyPayments = action.payload;
      })
      .addCase(getPaymentsByUser.rejected, (state, action) => {
        state.AllMyPayments = []
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(addGeneralPayment.fulfilled, (state, action) => {
        action.payload.forEach(item => {
          state.AllMyPayments.push(item);
        });
      })
      .addCase(addGeneralPayment.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(deletePayment.fulfilled, (state, action) => {        
        state.AllMyPayments = state.AllMyPayments.filter(payment => payment.id !== action.payload)
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(updatePaid.fulfilled, (state, action) => {
        const index =state.AllMyPayments.findIndex(payment=>payment.id == action.payload.id);
        state.AllMyPayments[index] = action.payload
      })
      .addCase(updatePaid.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })
  }
})

export default paymentSlice.reducer;