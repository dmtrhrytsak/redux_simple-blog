import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import { sub } from 'date-fns';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    const response = await axios.get(POSTS_URL);

    const fetchedPosts = response.data;

    let min = 1;

    const processedPosts = fetchedPosts.map((post) => {
      post.id = nanoid();
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

      post.id = nanoid();
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

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;

      const post = state.posts.find((post) => post.id === postId);

      if (!post) {
        return;
      }

      post.reactions[reaction] += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      });
  },
});

export const { addReaction } = postsSlice.actions;

export const selectAllPosts = (state) => state.posts.posts;

export default postsSlice.reducer;
