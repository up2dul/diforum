/**
 * test scenario
 *
 * - asyncReceiveUsers thunk
 *  - should dispatch action correctly when data fetching success
 */

import { describe, expect, it, vi, vitest } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import type { User } from '@/types';
import type { Store, AnyAction } from '@reduxjs/toolkit';

import api from '@/utils/api';
import usersReducer, { asyncReceiveUsers } from '@/store/slice/users';

vitest.mock('@/utils/api');

const fakeUsersResponse: User[] = [
  {
    id: 'user-6oWew2w2Wx5xLUTU',
    name: 'Dicoding',
    email: 'admin@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
  },
];

describe('asyncReceiveUsers thunk', () => {
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: usersReducer,
    });
  });

  it('should dispatch action correctly when data fetching success', async () => {
    expect.assertions(2);
    // arrange
    const mockGetAllUsers = vi.fn().mockResolvedValue(fakeUsersResponse);
    api.getAllUsers = mockGetAllUsers;

    // action
    const next = await store.dispatch(asyncReceiveUsers() as unknown as AnyAction);

    // assert
    expect(next.type).toEqual(asyncReceiveUsers.fulfilled.type);
    expect(next.payload).toEqual(fakeUsersResponse);
  });
});
