import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { addNewAd, deleteById, getByBuildingId } from "../services/adService";

export const getAdsByBuildingId = createAsyncThunk('ad/getByBuildingId', async (id, { rejectWithValue }) => {
  try {
    const adsList = await getByBuildingId(id);
    return adsList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});
export const addAd = createAsyncThunk('ad/addNewAd', async (ad, { rejectWithValue }) => {
  try {
    const adsList = await addNewAd(ad);
    return adsList.data;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

export const deleteAd = createAsyncThunk('ad/deleteAd', async (adId, { rejectWithValue }) => {
  try {
    await deleteById(adId);
    return adId;
  } catch (error) {
    return rejectWithValue({
      message: error.message,
      status: error.response ? error.response.status : 500,
    });
  }
});

const adSlice = createSlice({
  name: 'ad',
  initialState: {
    adsList: [],
    error: '',
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAdsByBuildingId.fulfilled, (state, action) => {
        state.adsList = action.payload;
      })
      .addCase(getAdsByBuildingId.rejected, (state, action) => {
        state.adsList = [];
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(addAd.fulfilled, (state, action) => {
        state.adsList.push(action.payload);
      })
      .addCase(addAd.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })

      .addCase(deleteAd.fulfilled, (state, action) => {
        state.adsList = state.adsList.filter(ad => ad.id !== action.payload)
      })
      .addCase(deleteAd.rejected, (state, action) => {
        state.error = {
          message: action.payload.message,
          status: action.payload.status,
        };
      })
  }
})

export default adSlice.reducer