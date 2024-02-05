const { createSlice } = require('@reduxjs/toolkit');

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
    like: 0,
    dislike: 0
},
  reducers: {
    good: state => {
        state.like += 1
    },
    bad: state => {
        state.dislike += 1
    },
    countAmount: (state, action) => {
        state.like += action.payload
        state.dislike += action.payload
    }
  },
});

export const { good, bad, countAmount } = counterSlice.actions

export const counterReducer = counterSlice.reducer;