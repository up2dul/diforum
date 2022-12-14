import { configureStore } from '@reduxjs/toolkit';

import authUser from './slice/auth-user';
import isPreload from './slice/is-preload';

export const store = configureStore({
  reducer: {
    authUser: authUser,
    isPreload: isPreload,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
