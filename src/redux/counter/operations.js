import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://project-yourcoach-back.onrender.com/api';


export const addRating = createAsyncThunk(
    'counter/addRating',
    async (id, thunkAPI) => {
      try {
        const response = await axios.post(`/counter/rating/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );