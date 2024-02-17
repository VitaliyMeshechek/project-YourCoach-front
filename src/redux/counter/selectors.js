import { createSelector } from "@reduxjs/toolkit";


export const selectRating = state => state.counter.rating;


export const selectRatingCount = createSelector([selectRating], counter => {
  console.log("Calculating visible tasks");
    return counter.reduce(
      (count, item) => {
        if (item.like) {
          count.like += 1 
        } if (item.dislike) {
            count.dislike += 1
          } 
          if (item.total) {
            count.total = count.like + count.dislike
          } if (item.feedback) {
            count.feedback = Math.round((count.like / count.total) * 100)
          }

        return count;
      },
      { like: 0, dislike: 0, feedback: 0}
    );
  });