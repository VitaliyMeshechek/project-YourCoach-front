import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAuthHeader } from 'redux/auth/operations';

axios.defaults.baseURL = 'https://project-yourcoach-back.onrender.com/api';

export const fetchAll = createAsyncThunk(
  'notices/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/notices`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNotices = createAsyncThunk(
  'notices/fetchNotices',
  async ({ categoryName, query }, thunkAPI) => {
    try {
      const response = await axios.get(`/notices/${categoryName}`, {
        params: { query: query ? query : null },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavorites = createAsyncThunk(
  'notices/fetchFavorites',
  async (query, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      const response = await axios.get(`/notices/rating`, {
        params: { query: query ? query : null },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToFavorite = createAsyncThunk(
  'notices/addToFavorite',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      const response = await axios.post(`/notices/rating/${id}`);
      const result = response.data.rating[0];
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFromFavorite = createAsyncThunk(
  'notices/deleteFromFavorite',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      const response = await axios.delete(`/notices/rating/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchLike = createAsyncThunk(
  'notices/fetchLike',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`/notices/like`, {
        params: { query: query ? query : null },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchDislike = createAsyncThunk(
  'notices/fetchDislike',
  async (query, thunkAPI) => {
    try {
      const response = await axios.get(`/notices/dislike`, {
        params: { query: query ? query : null },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToLike = createAsyncThunk(
  'notices/addToLike',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`/notices/like/${id}`);
      const result = response.data.rating[0];
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToDislike = createAsyncThunk(
  'notices/addToDislike',
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`/notices/dislike/${id}`);
      const result = response.data.rating[0];
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFromLike = createAsyncThunk(
  'notices/deleteFromLike',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/notices/like/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFromDislike = createAsyncThunk(
  'notices/deleteFromDislike',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/notices/dislike/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsersNotices = createAsyncThunk(
  'notices/fetchUsersNotices',
  async (query, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      const response = await axios.get(`/notices/own`, {
        params: { query: query ? query : null },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteUserNotice = createAsyncThunk(
  'notices/deleteUserNotice',
  async (id, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      const response = await axios.delete(`/notices/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNotice = createAsyncThunk(
  'notices/addNotice',
  async ({ category, newFormData }, thunkAPI) => {
    const { token } = thunkAPI.getState().auth;
    try {
      setAuthHeader(token);
      await axios.post(`/notices/${category}`, newFormData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'notices/fetchUserById',
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/users/${id}`);

      return res.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
