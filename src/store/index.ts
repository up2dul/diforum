import { configureStore } from '@reduxjs/toolkit';

import authUser from './slice/auth-user';
import isPreload from './slice/is-preload';
import leaderboard from './slice/leaderboard';
import threadDetail from './slice/thread-detail';
import threads from './slice/threads';
import users from './slice/users';

export const store = configureStore({
  reducer: {
    authUser: authUser,
    isPreload: isPreload,
    threadDetail: threadDetail,
    threads: threads,
    users: users,
    leaderboard: leaderboard,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
