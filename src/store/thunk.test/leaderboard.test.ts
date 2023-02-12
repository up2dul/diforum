/**
 * test scenario
 *
 * - asyncReceiveLeaderboard thunk
 *  - should dispatch action correctly when data fetching success
 */

import { describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import type { AnyAction, Store } from '@reduxjs/toolkit';

import api from '@/utils/api';
import leaderboardReducer, { asyncReceiveLeaderboard } from '@/store/slice/leaderboard';
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
  let store: Store;

  beforeEach(() => {
    store = configureStore({
      reducer: leaderboardReducer,
    });
  });

  it('should dispatch action correctly when data fetching success', async () => {
    expect.assertions(2);
    // arrange
    const mockGetLeaderboard = vi.fn().mockResolvedValue(fakeLeaderboardResponse);
    api.getLeaderboard = mockGetLeaderboard;

    // action
    const next = await store.dispatch(asyncReceiveLeaderboard() as unknown as AnyAction);

    // assert
    expect(next.type).toEqual(asyncReceiveLeaderboard.fulfilled.type);
    expect(next.payload).toEqual(fakeLeaderboardResponse);
  });
});
