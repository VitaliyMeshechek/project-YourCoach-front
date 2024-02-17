import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://project-yourcoach-back.onrender.com/api';


export const fetchRating = createAsyncThunk(
  'counter/fetchRating',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/counters`);
      console.log('fetchRating', response.data)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addRating = createAsyncThunk(
    'counter/addRating',
    async (id, thunkAPI) => {
      try {
        const response = await axios.post(`/counters/rating/${id}`);
        console.log('addRating', response.data)
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );