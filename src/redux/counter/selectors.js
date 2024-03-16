import { createSelector } from "@reduxjs/toolkit";


export const selectRating = state => state.counter.rating;


export const selectRatingCount = createSelector([selectRating], counter => {
  console.log("Calculating visible tasks");
    return counter.reduce(
      (count, item) => {
        count += item
        // if (item.like) {
        //   count.like += 1 
        // } 
        // else {
        //     count.dislike += 1
        //   }

          return count;
      },
      { like: 0, dislike: 0, feedback: 0}
    );
  });