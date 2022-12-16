/**
 * test scenario for threadDetail reducer
 *
 * - threadDetail function
 *  - should return the initial state when given by empty data
 *  - should return the thread detail data when given payload data
 *  - should return the initial state when clearThreadDetail called
 *
 */
import { describe, expect, it } from 'vitest';
import { threadDetailSlice } from '@/store/slice/thread-detail';

import type { ThreadDetail } from '@/types';

describe('threadDetail reducer', () => {
  it('should return the initial state when given by empty data', () => {
    // arrange
    interface Action {
      payload: ThreadDetail;
      type: string;
    }

    const action: Action = {
      payload: {
        id: '',
        title: '',
        body: '',
        createdAt: '',
        category: '',
        owner: {
          id: '',
          name: '',
          avatar: '',
        },
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      },
      type: 'threadDetail/receiveThreadDetail',
    };

    // action
    const nextState = threadDetailSlice.actions.receiveThreadDetail(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });

  it('should return the thread detail data when given payload data', () => {
    // arrange
    interface Action {
      payload: ThreadDetail;
      type: string;
    }

    const action: Action = {
      payload: {
        id: '01',
        title: 'test title',
        body: 'test body',
        createdAt: '2022-12-07T03:25:56.599Z',
        category: 'test',
        owner: {
          id: 'user-6oWew2w2Wx5xLUTU',
          name: 'Dicoding',
          avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
        },
        comments: [],
        upVotesBy: [],
        downVotesBy: [],
      },
      type: 'threadDetail/receiveThreadDetail',
    };

    // action
    const nextState = threadDetailSlice.actions.receiveThreadDetail(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });

  it('should return the initial state when clearThreadDetail called', () => {
    // arrange
    interface Action {
      payload: undefined;
      type: string;
    }

    const action: Action = {
      payload: undefined,
      type: 'threadDetail/clearThreadDetail',
    };

    // action
    const nextState = threadDetailSlice.actions.clearThreadDetail();

    // assert
    expect(nextState).toEqual(action);
  });
});
