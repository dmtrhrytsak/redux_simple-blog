import { useSelector } from 'react-redux';

import {
  selectPostsStatus,
  selectPostsError,
  selectPostIds,
} from './posts.slice';

import PostItem from './PostsItem';

const PostsList = () => {
  const orderedPostIds = useSelector(selectPostIds);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>

      {orderedPostIds.map((postId) => (
        <PostItem key={postId} postId={postId} />
      ))}
    </section>
  );
};

export default PostsList;
