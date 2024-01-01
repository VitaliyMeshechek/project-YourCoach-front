import { createSlice } from '@reduxjs/toolkit';
import {
  addToLike,
  addToDislike,
  deleteFromLike,
  deleteFromDislike,
  fetchAll,
  fetchLike,
  fetchDislike,
  fetchNotices,
  addNotice,
  fetchUsersNotices,
  deleteUserNotice,
  fetchUserById,
  fetchFavorites,
  addToFavorite,
  deleteFromFavorite,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const noticesPageSlice = createSlice({
  name: 'notices',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    // like: [],
    // dislike: [],
    rating: [],
    own: [],
    user: {},
  },

  extraReducers: {
    [fetchAll.pending]: handlePending,
    [fetchAll.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchAll.rejected]: handleRejected,

    [addNotice.pending]: handlePending,
    [addNotice.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
    },
    [addNotice.rejected]: handleRejected,

    [fetchNotices.pending]: handlePending,
    [fetchNotices.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchNotices.rejected]: handleRejected,
    [fetchFavorites.pending]: handlePending,
    [fetchFavorites.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.rating = action.payload;
    },
    [fetchFavorites.rejected]: handleRejected,

    [addToFavorite.pending]: handlePending,
    [addToFavorite.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.rating.push(action.payload);
    },
    [addToFavorite.rejected]: handleRejected,

    [deleteFromFavorite.pending]: handlePending,
    [deleteFromFavorite.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.rating.findIndex(
        contact => contact.id === action.payload.id
      );
      state.rating.splice(index, 1);
    },
    [deleteFromFavorite.rejected]: handleRejected,

    // [fetchLike.pending]: handlePending,
    // [fetchLike.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.like = action.payload;
    // },
    // [fetchLike.rejected]: handleRejected,

    // [fetchDislike.pending]: handlePending,
    // [fetchDislike.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.dislike = action.payload;
    // },
    // [fetchDislike.rejected]: handleRejected,

    // [addToLike.pending]: handlePending,
    // [addToLike.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.like.push(action.payload);
    // },
    // [addToLike.rejected]: handleRejected,

    // [addToDislike.pending]: handlePending,
    // [addToDislike.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   state.dislike.push(action.payload);
    // },
    // [addToDislike.rejected]: handleRejected,

    // [deleteFromLike.pending]: handlePending,
    // [deleteFromLike.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const index = state.like.findIndex(
    //     contact => contact.id === action.payload.id
    //   );
    //   state.like.splice(index, 1);
    // },
    // [deleteFromLike.rejected]: handleRejected,

    // [deleteFromDislike.pending]: handlePending,
    // [deleteFromDislike.fulfilled](state, action) {
    //   state.isLoading = false;
    //   state.error = null;
    //   const index = state.dislike.findIndex(
    //     contact => contact.id === action.payload.id
    //   );
    //   state.dislike.splice(index, 1);
    // },
    // [deleteFromDislike.rejected]: handleRejected,

    [fetchUsersNotices.pending]: handlePending,
    [fetchUsersNotices.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.own = action.payload;
    },
    [fetchUsersNotices.rejected]: handleRejected,

    [deleteUserNotice.pending]: handlePending,
    [deleteUserNotice.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.own.findIndex(
        contact => contact.id === action.payload.id
      );
      state.own.splice(index, 1);
    },
    [deleteUserNotice.rejected]: handleRejected,

    [fetchUserById.pending]: handlePending,
    [fetchUserById.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.user = action.payload;
    },
    [fetchUserById.rejected]: handleRejected,
  },
});

const queryInitialState = '';

const querySlice = createSlice({
  name: 'query',
  initialState: queryInitialState,
  reducers: {
    setQuery(state, action) {
      return action.payload;
    },
  },
});

export const { setQuery } = querySlice.actions;
export const queryReducer = querySlice.reducer;
export const noticesPageReducer = noticesPageSlice.reducer;
