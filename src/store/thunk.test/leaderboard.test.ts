/**
 * test scenario
 *
 * - asyncReceiveLeaderboard thunk
 *  - should dispatch action correctly when data fetching success
 */

import { describe, expect, it, vi } from 'vitest';

import api from '@/utils/api';
import { asyncReceiveLeaderboard, receiveLeaderboard } from '@/store/slice/leaderboard';
import type { Leaderboard } from '@/types';

const fakeLeaderboardResponse: Leaderboard[] = [
  {
    user: {
      id: 'user-8uUfQ1RoPFIYtACU',
      name: 'Testuser',
      email: 'testuser@gmail.com',
      avatar: 'https://ui-avatars.com/api/?name=test&background=random',
    },
    score: 100,
  },
];

describe('asyncReceiveLeaderboard thunk', () => {
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getLeaderboard = () => Promise.resolve(fakeLeaderboardResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock getState
    const getState = vi.fn();

    // action
    await asyncReceiveLeaderboard()(dispatch, getState, undefined);

    // assert
    expect(dispatch).toHaveBeenCalledWith(receiveLeaderboard(fakeLeaderboardResponse));
  });
});
