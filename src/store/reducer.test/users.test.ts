/**
 * test scenario for users reducer
 *
 * - users function
 *  - should return the initial state when given by empty data
 *  - should return the users data when given payload data
 *  - should return the new user when called by adduser
 *
 */
import { describe, expect, it } from 'vitest';
import { usersSlice } from '@/store/slice/users';

import type { User } from '@/types';

describe('users reducer', () => {
  it('should return the initial state when given by empty data', () => {
    // arrange
    interface Action {
      payload: User[];
      type: string;
    }

    const action: Action = {
      payload: [],
      type: 'users/receiveUsers',
    };

    // action
    const nextState = usersSlice.actions.receiveUsers(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });

  it('should return the users data when given payload data', () => {
    // arrange
    interface Action {
      payload: User[];
      type: string;
    }

    const action: Action = {
      payload: [
        {
          id: 'user-6oWew2w2Wx5xLUTU',
          name: 'Dicoding',
          email: 'admin@dicoding.com',
          avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
        },
      ],
      type: 'users/receiveUsers',
    };

    // action
    const nextState = usersSlice.actions.receiveUsers(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });
});
