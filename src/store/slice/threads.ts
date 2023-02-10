import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { NewThread, Thread } from '@/types';

// #region Thunk function
const asyncReceiveThreads = createAsyncThunk('threads/receive', async () => {
  const threads = await api.getAllThreads();
  return threads;
});

const asyncAddThread = createAsyncThunk('threads/add', async (thread: NewThread) => {
  const { title, body, category } = thread;
  try {
    const newThread = await api.createThread({ title, body, category });
    return newThread;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('there is an error:', error.message);
    }
  }
});
// #endregion Thunk function

interface InitialState {
  list: Thread[];
  error: string | null;
}

const initialState: InitialState = {
  list: [],
  error: null,
};

export const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreads.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(asyncReceiveThreads.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(asyncAddThread.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
      });
  },
});

export { asyncReceiveThreads, asyncAddThread };
export default threadsSlice.reducer;
