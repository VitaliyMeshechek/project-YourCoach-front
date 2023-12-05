import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://project-yourcoach-back.onrender.com/api';

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (values, thunkAPI) => {
    try {
      const response = await axios.patch('/cardProgram', values);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
export const updateUserPhoto = createAsyncThunk(
  'users/updateUserPhoto',
  async (values, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', values);

      const response = await axios.patch('/cardProgram', formData);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchPrograms = createAsyncThunk(
  'program/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cardProgram');

      return response.data.user.programs;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addProgram = createAsyncThunk(
  'programs/addProgram',
  async (program, thunkAPI) => {
    try {
      const response = await axios.post('/cardProgram/program', program);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteProgram = createAsyncThunk(
  'program/deleteProgram',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/cardProgram/program/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
