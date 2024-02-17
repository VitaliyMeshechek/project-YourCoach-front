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
      const response = await axios.patch('/programs', values);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserPhoto = createAsyncThunk(
  'user/updateUserPhoto',
  async (values, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', values);

      const response = await axios.patch('/programs', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentPrograms = createAsyncThunk(
  'programs/getCurrentPrograms',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/programs');

      return response.data.user.programs;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserProgram = createAsyncThunk(
  'programs/addUserProgram',
  async (div, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      const response = await axios.post('/programs', div);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserProgram = createAsyncThunk(
  'programs/deleteUserProgram',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/programs/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
