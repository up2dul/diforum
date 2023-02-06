import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { User } from '@/types';

// #region Thunk function
const asyncSetAuthUser = createAsyncThunk(
  'authUser/set',
  async (userAuth: { email: string; password: string }) => {
    const { email, password } = userAuth;
    const token = await api.login({ email, password });

    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();

    return authUser;
  },
);

const asyncUnsetAuthUser = createAsyncThunk('authUser/unset', async () => {
  api.putAccessToken('');
});
// #endregion Thunk function

interface InitialState {
  value: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  value: null,
  isLoading: false,
  error: null,
};

const authUserSlice = createSlice({
  name: 'auth-user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => {
        state.value = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(asyncSetAuthUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(asyncUnsetAuthUser.fulfilled, (state) => {
        state.value = null;
      });
  },
});

export { asyncSetAuthUser, asyncUnsetAuthUser };
export default authUserSlice.reducer;
