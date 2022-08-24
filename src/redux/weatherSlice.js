import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWeatherThunk = createAsyncThunk("weather", async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e8b2c4e5a41d2b3b81897c77b9e4d88`)
    return res.json();
})
export const fetchIstWeatherThunk = createAsyncThunk("weather", async (city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=istanbul&appid=0e8b2c4e5a41d2b3b81897c77b9e4d88`)
    return res.json();
})

const weatherSlice = createSlice({
    name : "weather",
    initialState : {
        items : {},
        status : "idle",
        istData : {},
        istStatus : "idle"
    },
    reducers : {

    },
    extraReducers : {
        [fetchWeatherThunk.pending] : (state, action) => {
            state.status = "loading"
        },
        [fetchWeatherThunk.fulfilled] : (state, action) => {
            state.status  = "success"
            state.items = {...state.items, ...action.payload}
        },
        [fetchWeatherThunk.rejected] : (state, action) => {
            state.status = "failed"
            state.error = (action.error.message)
        },
        [fetchIstWeatherThunk.pending] : (state, action) => {
            state.istStatus = "loading"
        },
        [fetchIstWeatherThunk.fulfilled] : (state, action) => {
            state.istStatus  = "success"
            state.istData = {...state.Data, ...action.payload}
        },
        [fetchIstWeatherThunk.rejected] : (state, action) => {
            state.istStatus = "failed"
            state.error = (action.error.message)
        }

    }
})

export default weatherSlice.reducer;
