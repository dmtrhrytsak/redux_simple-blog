import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.data),
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);

    const fetchedPosts = response.data;

    let min = 1;

    const processedPosts = fetchedPosts.map((post) => {
      post.date = sub(new Date(), { minutes: min++ }).toISOString();
      post.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };

      return post;
    });

    return processedPosts;
  } catch (error) {
    return error.message;
  }
});

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (initialPost) => {
    try {
      const response = await axios.post(POSTS_URL, initialPost);

      const post = response.data;

      post.userId = Number(post.userId);
      post.date = new Date().toISOString();
      post.reactions = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
        rocket: 0,
        coffee: 0,
      };

      return post;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (initialPost, { rejectWithValue }) => {
    const { id } = initialPost;

    try {
      const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);

      const post = response.data;

      if (!post?.id) {
        throw new Error("Update couldn't complete");
      }

      post.date = new Date().toISOString();

      return post;
    } catch (error) {
      initialPost.date = new Date().toISOString();

      return initialPost;
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${POSTS_URL}/${postId}`);

      if (!response.status === 200) {
        return rejectWithValue(`${response?.status}: ${response?.statusText}`);
      }

      return { postId };
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
  count: 0,
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;

      const post = state.entities[postId];

      if (!post) {
        return;
      }

      post.reactions[reaction] += 1;
    },
    increaseCount(state) {
      state.count = state.count + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';

        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = 'succeeded';

        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded';

        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';

        postsAdapter.removeOne(state, action.payload.postId);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addReaction, increaseCount } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;

export const selectCount = (state) => state.posts.count;

export default postsSlice.reducer;
