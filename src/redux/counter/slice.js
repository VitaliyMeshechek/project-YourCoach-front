import { addRating } from './operations';

const { createSlice } = require('@reduxjs/toolkit');


const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
    rating: [],
    isLoading: false,
    error: null,
},
  reducers: {
    [addRating.pending]: handlePending,
    [addRating.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.rating.push(action.payload);
    },
    [addRating.rejected]: handleRejected,
  },
});

export const counterReducer = counterSlice.reducer;