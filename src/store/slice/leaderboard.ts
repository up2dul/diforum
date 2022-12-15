import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { Leaderboard } from '@/types';

// #region Thunk function
const asyncReceiveLeaderboard = createAsyncThunk('leaderboard/receive', async (_, thunkAPI) => {
  try {
    const leaderboard = await api.getLeaderboard();
    thunkAPI.dispatch(receiveLeaderboard(leaderboard));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('there is an error:', error.message);
    }
  }
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
  reducers: {
    receiveLeaderboard(state, action: PayloadAction<Leaderboard[]>) {
      state.list = action.payload;
    },
  },
});

export const { receiveLeaderboard } = leaderboardSlice.actions;
export { asyncReceiveLeaderboard };
export default leaderboardSlice.reducer;
