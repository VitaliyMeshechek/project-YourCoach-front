import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { deletePet, fetchPets, addPet } from './operations';
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
  name: 'pets',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder

      .addCase(fetchPets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // console.log(action.payload);
        state.pet = action.payload;
        // console.log( state.pet);
      })
      .addCase(addPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        console.log(action.payload.id);
        console.log(state.pet);
        state.pet = state.pet.filter(pet => pet._id !== action.payload.id);
        console.log(state.items);
      })
      .addMatcher(
        isAnyOf(fetchPets.pending, addPet.pending, deletePet.pending),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchPets.rejected, addPet.rejected, deletePet.rejected),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const programReducer = programsSlice.reducer;

export const userDataReducer = userDataSlice.reducer;
