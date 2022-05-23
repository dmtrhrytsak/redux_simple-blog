import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { selectPostById } from './posts.slice';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <Link to={`/posts/edit/${post.id}`} className="view-post-link">
        Edit Post
      </Link>

      <p className="post-credit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>

      <ReactionButtons post={post} />
    </article>
  );
};

export default SinglePostPage;
