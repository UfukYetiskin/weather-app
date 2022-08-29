import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchWeatherThunk = createAsyncThunk("weather/fetchWeatherThunk", async (city) => {
    console.log(city)
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=5&appid=0e8b2c4e5a41d2b3b81897c77b9e4d88`)   
    return res.json();
})
export const fetchItemWeatherThunk = createAsyncThunk("weather/fetchItemWeatherThunk", async (city) => {
    console.log(city)
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0e8b2c4e5a41d2b3b81897c77b9e4d88`)
    return res.json();
})

const weatherSlice = createSlice({
    name : "weather",
    initialState : {
        items : [],
        status : "idle",
        item : {},
        stat : "idle",
    },
    reducers : {

    },
    extraReducers : {
        [fetchWeatherThunk.pending] : (state, action) => {
            state.status = "loading"
        },
        [fetchWeatherThunk.fulfilled] : (state, action) => {
            state.status  = "success"
            console.log("actıın.payload",action.payload)
            state.items = action.payload.list
            console.log(state.items)
            
        },
        [fetchWeatherThunk.rejected] : (state, action) => {
            state.status = "failed"
            state.error = (action.error.message)
        },
        [fetchItemWeatherThunk.pending] : (state, action) => {
            state.stat = "loading"
        },
        [fetchItemWeatherThunk.fulfilled] : (state, action) => {
            state.stat  = "success"
            state.item= action.payload
            console.log("ıtem",state.item)
        },
        [fetchItemWeatherThunk.rejected] : (state, action) => {
            state.stat = "failed"
            state.error = (action.error.message)
        }

    }
})

export default weatherSlice.reducer;
