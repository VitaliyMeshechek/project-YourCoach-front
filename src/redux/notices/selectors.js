export const selectNotices = state => state.notices.items;
export const selectIsLoading = state => state.notices.isLoading;
export const selectError = state => state.notices.error;
export const selectQuery = state => state.query;
export const selectFavorite = state => state.notices.favorite;
// export const selectLike = state => state.notices.like;
// export const selectDislike = state => state.notices.dislike;
export const selectOwn = state => state.notices.own;
export const selectUserById = state => state.notices.user;
