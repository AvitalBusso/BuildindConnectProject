import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { getByBuildingId, getTenants, loginBuilding, signUpBuilding } from "../services/buildingService";

export const login = createAsyncThunk('building/login', async (building, { rejectWithValue }) => {
  try {
    const buildingData = await loginBuilding(building);
    return buildingData.data;
  } catch (error) {    
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
});

export const signUp = createAsyncThunk('building/signUp', async (building, { rejectWithValue }) => {
  try {
    const buildingData = await signUpBuilding(building);
    return buildingData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const getBuildingById = createAsyncThunk('building/getById', async (id, { rejectWithValue }) => {  
  try {
    const buildingData = await getByBuildingId(id);
    return buildingData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
});

export const getTenantsList = createAsyncThunk('building/getTenantsList', async (id, { rejectWithValue }) => {
  try {
    const buildingData = await getTenants(id);
    return buildingData.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500, 
    });
  }
});

const buildingSlice = createSlice({
  name: 'building',
  initialState: {
    currentBuilding: {},
    tenants:[],
    error: '',
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.fulfilled, (state, action) => {
        state.currentBuilding = action.payload;
      })
     
      .addCase(login.rejected, (state, action) => {
        state.currentBuilding = {};
        state.tenants = []
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(signUp.fulfilled, (state, action) => {
        state.currentBuilding = action.payload;
      })

      .addCase(signUp.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(getBuildingById.fulfilled, (state, action) => {
        state.currentBuilding = action.payload;
      })
      .addCase(getBuildingById.rejected, (state, action) => {
        state.currentBuilding = {};
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(getTenantsList.fulfilled, (state, action) => {
        state.tenants = action.payload;
      })
      .addCase(getTenantsList.rejected, (state, action) => {
        state.tenants = [];
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })
  }
})

export default buildingSlice.reducer;