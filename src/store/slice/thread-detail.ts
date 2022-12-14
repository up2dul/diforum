import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import api from '@/utils/api';
import type { Comment, CommentVoteResponse, Thread, ThreadVoteResponse, VoteType } from '@/types';

// #region Thunk function
const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId: string, thunkAPI) => {
    try {
      const thread = await api.getDetailThread(threadId);
      thunkAPI.dispatch(receiveThreadDetail(thread));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);

const asyncAddThreadComment = createAsyncThunk(
  'threadDetail/addComment',
  async (comment: { content: string; threadId: string }, thunkAPI) => {
    const { content, threadId } = comment;
    try {
      const newComment = await api.createComment(content, threadId);
      thunkAPI.dispatch(addThreadComment(newComment));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);

const asyncVoteThread = createAsyncThunk(
  'threadDetail/addVote',
  async (vote: { threadId: string; voteType: string }, thunkAPI) => {
    const { threadId, voteType } = vote;
    try {
      const newVote = await api.addThreadVote(threadId, voteType);
      thunkAPI.dispatch(addThreadVote(newVote));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);

const asyncCommentVote = createAsyncThunk(
  'threadDetail/addCommentVote',
  async (vote: { threadId: string; commentId: string; voteType: VoteType }, thunkAPI) => {
    const { threadId, commentId, voteType } = vote;
    try {
      const newVote = await api.addCommentVote(threadId, commentId, voteType);
      thunkAPI.dispatch(addThreadCommentVote(newVote));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log('there is an error:', error.message);
      }
    }
  },
);
// #endregion Thunk function

interface InitialState {
  detail: Thread;
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

const threadDetailSlice = createSlice({
  name: 'thread-detail',
  initialState,
  reducers: {
    receiveThreadDetail(state, action: PayloadAction<Thread>) {
      state.detail = action.payload;
    },
    clearThreadDetail(state) {
      state.detail = initialState.detail;
    },
    addThreadComment(state, action: PayloadAction<Comment>) {
      state.detail.comments = [action.payload, ...state.detail.comments];
    },
    addThreadVote({ detail }, action: PayloadAction<ThreadVoteResponse>) {
      switch (action.payload.voteType) {
        case 1:
          detail.upVotesBy.push(action.payload.userId);
          detail.downVotesBy = detail.downVotesBy.filter((vote) => vote !== action.payload.userId);
          break;
        case 0:
          detail.upVotesBy = detail.upVotesBy.filter((vote) => vote !== action.payload.userId);
          detail.downVotesBy = detail.downVotesBy.filter((vote) => vote !== action.payload.userId);
          break;
        case -1:
          detail.upVotesBy = detail.upVotesBy.filter((vote) => vote !== action.payload.userId);
          detail.downVotesBy.push(action.payload.userId);
          break;
        default:
          break;
      }
    },
    addThreadCommentVote({ detail }, action: PayloadAction<CommentVoteResponse>) {
      detail.comments.forEach((comment) => {
        if (comment.id === action.payload.commentId)
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
      });
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  addThreadComment,
  addThreadVote,
  addThreadCommentVote,
} = threadDetailSlice.actions;
export { asyncReceiveThreadDetail, asyncAddThreadComment, asyncVoteThread, asyncCommentVote };
export default threadDetailSlice.reducer;
