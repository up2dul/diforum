import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { Thread } from '@/types';

// #region Thunk function
const asyncReceiveThreads = createAsyncThunk('threads/receive', async (_, thunkAPI) => {
  try {
    const threads = await api.getAllThreads();
    thunkAPI.dispatch(receiveThreads(threads));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('there is an error:', error.message);
    }
  }
});

const asyncAddThread = createAsyncThunk('threads/add', async (thread: Thread, thunkAPI) => {
  const { title, body, category } = thread;
  try {
    const newThread = await api.createThread({ title, body, category });
    thunkAPI.dispatch(addThread(newThread));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('there is an error:', error.message);
    }
  }
});
// #endregion Thunk function

interface InitialState {
  list: Thread[];
}

const initialState: InitialState = {
  list: [],
};

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    receiveThreads(state, action: PayloadAction<Thread[]>) {
      state.list = action.payload;
    },
    addThread(state, action: PayloadAction<Thread>) {
      state.list = [action.payload, ...state.list];
    },
  },
});

export const { receiveThreads, addThread } = threadsSlice.actions;
export { asyncReceiveThreads, asyncAddThread };
export default threadsSlice.reducer;
