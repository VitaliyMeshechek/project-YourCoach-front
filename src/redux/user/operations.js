import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-yourcoach-back.onrender.com/api';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (values, thunkAPI) => {
    try {
      const response = await axios.patch('/cardPrograms', values);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const updateUserPhoto = createAsyncThunk(
  'user/updateUserPhoto',
  async (values, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', values);

      const response = await axios.patch('/cardPrograms', formData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchPrograms = createAsyncThunk(
  'programs/fetchPrograms',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cardPrograms');

      return response.data.user.programs;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addProgram = createAsyncThunk(
  'programs/addProgram',
  async (program, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      const response = await axios.post('/cardPrograms/program', program);
      console.log('addProgram', response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteProgram = createAsyncThunk(
  'programs/deleteProgram',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/cardPrograms/program/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
