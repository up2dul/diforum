import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import api from '@/utils/api';
import { setAuthUser, unsetAuthUser } from './auth-user';

// #region Thunk function
const asyncPreloadProcess = createAsyncThunk('isPreload/set', async (_, thunkAPI) => {
  try {
    // preload process
    const authUser = await api.getOwnProfile();
    thunkAPI.dispatch(setAuthUser(authUser));
  } catch (error) {
    // fallback process
    thunkAPI.dispatch(unsetAuthUser());
  } finally {
    thunkAPI.dispatch(setIsPreload(false));
  }
});
// #endregion Thunk function

interface InitialState {
  value: boolean;
}

const initialState: InitialState = {
  value: true,
};

const isPreloadSlice = createSlice({
  name: 'is-preload',
  initialState,
  reducers: {
    setIsPreload(state, action: PayloadAction<boolean>) {
      state.value = action.payload;
    },
  },
});

export const { setIsPreload } = isPreloadSlice.actions;
export { asyncPreloadProcess };
export default isPreloadSlice.reducer;
