import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { User, UserRegister } from '@/types';

// #region Thunk function
const asyncReceiveUsers = createAsyncThunk('users/receive', async () => {
  try {
    const users = await api.getAllUsers();
    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('there is an error:', error.message);
    }
  }
});

const asyncRegisterUser = createAsyncThunk('users/register', async (user: UserRegister) => {
  try {
    const { name, email, password } = user;
    await api.register({ name, email, password });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('there is an error:', error.message);
    }
  }
});
// #endregion Thunk function

interface InitialState {
  list: User[];
}

const initialState: InitialState = {
  list: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncReceiveUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export { asyncReceiveUsers, asyncRegisterUser };
export default usersSlice.reducer;
