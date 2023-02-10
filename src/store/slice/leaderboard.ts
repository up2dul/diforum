import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { Leaderboard } from '@/types';

// #region Thunk function
const asyncReceiveLeaderboard = createAsyncThunk('leaderboard/receive', async () => {
  const leaderboard = await api.getLeaderboard();
  return leaderboard;
});
// #endregion Thunk function

interface InitialState {
  list: Leaderboard[];
}

const initialState: InitialState = {
  list: [],
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveLeaderboard.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export { asyncReceiveLeaderboard };
export default leaderboardSlice.reducer;
