/**
 * test scenario for leaderboard reducer
 *
 * - leaderboard function
 *  - should return the initial state when given by empty data
 *  - should return the leaderboard data when given payload data
 *
 */
import { describe, expect, it } from 'vitest';
import { leaderboardSlice } from '@/store/slice/leaderboard';

import type { Leaderboard } from '@/types';

describe('leaderboard reducer', () => {
  it('should return the initial state when given by empty data', () => {
    // arrange
    interface Action {
      payload: Leaderboard[];
      type: string;
    }

    const action: Action = {
      payload: [],
      type: 'leaderboard/receiveLeaderboard',
    };

    // action
    const nextState = leaderboardSlice.actions.receiveLeaderboard(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });

  it('should return the leaderboard data when given payload data', () => {
    // arrange
    interface Action {
      payload: Leaderboard[];
      type: string;
    }

    const action: Action = {
      payload: [
        {
          user: {
            id: 'user-8uUfQ1RoPFIYtACU',
            name: 'UdinXX',
            email: 'udinxx@gmail.com',
            avatar: 'https://ui-avatars.com/api/?name=UdinXX&background=random',
          },
          score: 925,
        },
      ],
      type: 'leaderboard/receiveLeaderboard',
    };

    // action
    const nextState = leaderboardSlice.actions.receiveLeaderboard(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });
});
