import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { User } from '@/types';

// #region Thunk function
const asyncSetAuthUser = createAsyncThunk(
  'authUser/set',
  async (userAuth: { email: string; password: string }, thunkAPI) => {
    const { email, password } = userAuth;
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();

    thunkAPI.dispatch(setAuthUser(authUser));
  },
);

const asyncUnsetAuthUser = createAsyncThunk('authUser/unset', async (_, thunkAPI) => {
  thunkAPI.dispatch(unsetAuthUser());
  api.putAccessToken('');
});
// #endregion Thunk function

interface InitialState {
  value: User | null;
}

const initialState: InitialState = {
  value: null,
};

const authUserSlice = createSlice({
  name: 'auth-user',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<User>) {
      state.value = action.payload;
    },
    unsetAuthUser(state) {
      state.value = null;
    },
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;
export { asyncSetAuthUser, asyncUnsetAuthUser };
export default authUserSlice.reducer;
