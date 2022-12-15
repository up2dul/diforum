import type { ThreadDetail, VoteType } from '@/types';

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  interface FetchOptions {
    method: 'GET' | 'POST';
    headers: {
      'Content-Type': 'application/json';
    };
    body: string;
  }

  async function _fetchWithAuth(url: string, options: Partial<FetchOptions> = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // #region Token
  function putAccessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  // #endregion Token

  // #region Users
  interface Register {
    name: string;
    email: string;
    password: string;
  }

  async function register({ name, email, password }: Partial<Register>) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function login({ email, password }: Partial<Register>) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }
  // #endregion Users

  // #region Threads
  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function getDetailThread(id: string) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  async function createThread({ title, body, category }: Partial<ThreadDetail>) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  }
  // #endregion Threads

  // #region Comments
  async function createComment(content: string, threadId: string) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content,
      }),
    });

    const responseJson = await response.json();

    const {
      status,
      message,
      data: { comment },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return comment;
  }
  // #endregion Comments

  // #region Vote
  async function addThreadVote(threadId: string, voteType: string) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/${voteType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();

    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }

  async function addCommentVote(threadId: string, commentId: string, voteType: VoteType) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const responseJson = await response.json();

    const {
      status,
      message,
      data: { vote },
    } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return vote;
  }
  // #endregion Vote

  // #region Leaderboard
  async function getLeaderboard() {
    const response = await _fetchWithAuth(`${BASE_URL}/leaderboards`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { leaderboards },
    } = responseJson;

    return leaderboards;
  }
  // #endregion Leaderboard

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getDetailThread,
    createThread,
    createComment,
    addThreadVote,
    addCommentVote,
    getLeaderboard,
  };
})();

export default api;
