import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { ThreadDetail, VoteType } from '@/types';

// #region Thunk function
const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId: string) => {
    try {
      const thread = await api.getDetailThread(threadId);
      return thread;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);

const asyncAddThreadComment = createAsyncThunk(
  'threadDetail/addComment',
  async (comment: { content: string; threadId: string }) => {
    const { content, threadId } = comment;
    try {
      const newComment = await api.createComment(content, threadId);
      return newComment;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);

const asyncVoteThread = createAsyncThunk(
  'threadDetail/addVote',
  async (vote: { threadId: string; voteType: VoteType }) => {
    const { threadId, voteType } = vote;
    try {
      const newVote = await api.addThreadVote(threadId, voteType);
      return newVote;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);

const asyncVoteComment = createAsyncThunk(
  'threadDetail/addCommentVote',
  async (vote: { threadId: string; commentId: string; voteType: VoteType }) => {
    const { threadId, commentId, voteType } = vote;
    try {
      const newVote = await api.addCommentVote(threadId, commentId, voteType);
      return newVote;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);
// #endregion Thunk function

interface InitialState {
  detail: ThreadDetail;
}

const initialState: InitialState = {
  detail: {
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
};

export const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    clearThreadDetail(state) {
      state.detail = initialState.detail;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => {
        state.detail = action.payload;
      })
      .addCase(asyncAddThreadComment.fulfilled, (state, action) => {
        state.detail.comments = [action.payload, ...state.detail.comments];
      })
      .addCase(asyncVoteThread.fulfilled, ({ detail }, action) => {
        switch (action.payload.voteType) {
          case 1:
            detail.upVotesBy.push(action.payload.userId);
            detail.downVotesBy = detail.downVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            );
            break;
          case 0:
            detail.upVotesBy = detail.upVotesBy.filter((vote) => vote !== action.payload.userId);
            detail.downVotesBy = detail.downVotesBy.filter(
              (vote) => vote !== action.payload.userId,
            );
            break;
          case -1:
            detail.upVotesBy = detail.upVotesBy.filter((vote) => vote !== action.payload.userId);
            detail.downVotesBy.push(action.payload.userId);
            break;
          default:
            break;
        }
      })
      .addCase(asyncVoteComment.fulfilled, ({ detail }, action) => {
        detail.comments.forEach((comment) => {
          if (comment.id === action.payload.commentId)
            switch (action.payload.voteType) {
              case 1:
                comment.upVotesBy.push(action.payload.userId);
                comment.downVotesBy = comment.downVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                );
                break;
              case 0:
                comment.upVotesBy = comment.upVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                );
                comment.downVotesBy = comment.downVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                );
                break;
              case -1:
                comment.upVotesBy = comment.upVotesBy.filter(
                  (vote) => vote !== action.payload.userId,
                );
                comment.downVotesBy.push(action.payload.userId);
                break;
              default:
                break;
            }
        });
      });
  },
});

export const { clearThreadDetail } = threadDetailSlice.actions;
export { asyncReceiveThreadDetail, asyncAddThreadComment, asyncVoteThread, asyncVoteComment };
export default threadDetailSlice.reducer;
