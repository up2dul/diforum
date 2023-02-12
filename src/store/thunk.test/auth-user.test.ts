/**
 * test scenario
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should return error response when data fetching failed
 */

import { describe, it, vi, vitest } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import type { AnyAction, Store } from '@reduxjs/toolkit';

import api from '@/utils/api';
import authUserReducer, { asyncSetAuthUser } from '@/store/slice/auth-user';

vitest.mock('@/utils/api');

const authuser = {
  email: 'test@gmail.com',
  password: 'test',
};

const fakeOwnProfileResponse = {
  id: 'user-123',
  name: 'user test',
  email: 'test@gmail.com',
  avatar: 'https://ui-avatars.com/api/?name=test&background=random',
};

describe('asyncSetAuthUser thunk', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: authUserReducer,
    });
  });

  it('should dispatch action correctly when data fetching success', async () => {
    expect.assertions(2);

    // arrange
    const mockLogin = vi.fn().mockResolvedValue('token');
    api.login = mockLogin;

    const mockPutAccessToken = vi.fn();
    api.putAccessToken = mockPutAccessToken;

    const mockGetOwnProfile = vi.fn().mockResolvedValue(fakeOwnProfileResponse);
    api.getOwnProfile = mockGetOwnProfile;

    // action
    const next = await store.dispatch(asyncSetAuthUser(authuser) as unknown as AnyAction);

    // assert
    expect(next.type).toEqual(asyncSetAuthUser.fulfilled.type);
    expect(next.payload).toEqual(fakeOwnProfileResponse);
  });

  it('should return error response when data fetching failed', async () => {
    expect.assertions(2);

    // arrange
    const errorMsg = 'email or password is wrong';
    const mockLogin = vi.fn().mockRejectedValue(new Error(errorMsg));
    api.login = mockLogin;

    // action
    const next = await store.dispatch(asyncSetAuthUser(authuser) as unknown as AnyAction);

    // assert
    expect(next.type).toEqual(asyncSetAuthUser.rejected.type);
    expect(next.error.message).toEqual(errorMsg);
  });
});
