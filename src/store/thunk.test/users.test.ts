/**
 * test scenario
 *
 * - asyncReceiveUsers thunk
 *  - should dispatch action correctly when data fetching success
 */

import { describe, expect, it, vi } from 'vitest';

import api from '@/utils/api';
import { asyncReceiveUsers, receiveUsers } from '@/store/slice/users';
import type { User } from '@/types';

const fakeUsersResponse: User[] = [
  {
    id: 'user-6oWew2w2Wx5xLUTU',
    name: 'Dicoding',
    email: 'admin@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
  },
];

describe('asyncReceiveUsers thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock getState
    const getState = vi.fn();

    // action
    await asyncReceiveUsers()(dispatch, getState, undefined);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveUsers(fakeUsersResponse));
  });
});
