/**
 * test scenario for threads reducer
 *
 * - threads function
 *  - should return the initial state when given by empty data
 *  - should return the thread data when given payload data
 *  - should return the new thread when called by addThread
 *
 */
import { describe, expect, it } from 'vitest';
import { threadsSlice } from '@/store/slice/threads';

import type { Thread } from '@/types';

describe('threads reducer', () => {
  it('should return the initial state when given by empty data', () => {
    // arrange
    interface Action {
      payload: Thread[];
      type: string;
    }

    const action: Action = {
      payload: [],
      type: 'threads/receiveThreads',
    };

    // action
    const nextState = threadsSlice.actions.receiveThreads(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });

  it('should return the threads data when given payload data', () => {
    // arrange
    interface Action {
      payload: Thread[];
      type: string;
    }

    const action: Action = {
      payload: [
        {
          id: 'thread-08_nUU2fhu1P5nre',
          title: 'Pengalaman Belajar React di Dicoding',
          body: 'Thread body test',
          category: 'react',
          createdAt: '2022-11-13T09:59:31.019Z',
          ownerId: 'user-5PqX6Ldhnk_ifroq',
          totalComments: 0,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
      type: 'threads/receiveThreads',
    };

    // action
    const nextState = threadsSlice.actions.receiveThreads(action.payload);

    // assert
    expect(nextState).toEqual(action);
  });

  it('should return the new thread when called by addThread', () => {
    // arrange
    interface Action {
      payload: Thread;
      type: string;
    }

    const action: Action = {
      payload: {
        id: 'thread-09_nUU2fhu1w5512',
        title: 'Thread title test',
        body: 'Thread body test (2)',
        category: 'test',
        createdAt: '2022-11-13T09:59:31.019Z',
        ownerId: 'user-5PqX6Ldhnk_ifroq',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
      type: 'threads/addThread',
    };

    const newPayload: Thread = {
      id: 'thread-09_nUU2fhu1w5512',
      title: 'Thread title test',
      body: 'Thread body test (2)',
      category: 'test',
      createdAt: '2022-11-13T09:59:31.019Z',
      ownerId: 'user-5PqX6Ldhnk_ifroq',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    };

    // action
    const nextState = threadsSlice.actions.addThread(newPayload);

    // assert
    expect(nextState).toEqual(action);
  });
});
