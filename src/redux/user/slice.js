import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { deleteUserProgram, fetchPrograms, addUserProgram } from './operations';
import { updateUser, updateUserPhoto } from './operations';

export const userDataSlice = createSlice({
  name: 'user',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder

      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(updateUserPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      .addMatcher(
        isAnyOf(updateUser.pending, updateUserPhoto.pending),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(updateUser.rejected, updateUserPhoto.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const programsSlice = createSlice({
  name: 'programs',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder

      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.program = action.payload;
      })
      .addCase(addUserProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(deleteUserProgram.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log(action.payload.id);
        console.log('state.program', state.program);
        state.program = state.program.filter(
          program => program._id !== action.payload.id
        );
        console.log(state.items);
      })
      .addMatcher(
        isAnyOf(
          fetchPrograms.pending,
          addUserProgram.pending,
          deleteUserProgram.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchPrograms.rejected,
          addUserProgram.rejected,
          deleteUserProgram.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const programReducer = programsSlice.reducer;

export const userDataReducer = userDataSlice.reducer;
