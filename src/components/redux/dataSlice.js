import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDashboardAPI } from "../api/api";

export const fetchDashboardData = createAsyncThunk(
    "dashboard/fetchData",
    async (_, thunkAPI) => {
        try {
            const data = await fetchDashboardAPI();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to load dashboard data");
        }
    }
);

const dataSlice = createSlice({
    name: "dashboard",
    initialState: {
        data: null,
        lastFetched: null,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.data = action.payload;
                state.lastFetched = Date.now(); // ⏱️ store current timestamp
                state.loading = false;
            })
            .addCase(fetchDashboardData.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export default dataSlice.reducer;
