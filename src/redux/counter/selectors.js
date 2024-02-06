import { createSelector } from "@reduxjs/toolkit";


export const selectRating = state => state.counter.rating;


export const selectRatingCount = createSelector([selectRating], counter => {
  
    return counter.reduce(
      (count, item) => {
        if (item.like) {
          count.like += 1;
        } 
        if (item.dislike) {
          count.dislike += 1;
        }
        return count;
      },
      { like: 0, dislike: 0 }
    );
  });