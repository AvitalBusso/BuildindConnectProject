import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import buildingReducer from '../slices/buildingSlice'
import paymentReducer from '../slices/paymentsSlice'
import adReducer from '../slices/adSlice'
import messageReducer from '../slices/messageSlice'
import groupMessageReducer from '../slices/groupMessageSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        building: buildingReducer,
        payment: paymentReducer,
        ad: adReducer,
        message: messageReducer,
        groupMessage : groupMessageReducer
    }
});