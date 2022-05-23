import { useSelector } from 'react-redux';

import PostItem from './PostsItem';

const PostsList = () => {
  const { posts, status, error } = useSelector((state) => state.posts);

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
    <section>
      <h2>Posts</h2>

      {orderedPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </section>
  );
};

export default PostsList;
