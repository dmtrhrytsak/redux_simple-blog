import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPosts } from './posts.slice';
import PostItem from './PostsItem';

const PostsList = () => {
  const { posts, status, error } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return (
    <div>
      {orderedPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
