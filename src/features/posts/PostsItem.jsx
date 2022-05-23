import { Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';

const PostItem = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p className="excerpt">{`${post.body.substring(0, 75)}...`}</p>

      <Link to={`/posts/${post.id}`} className="view-post-link">
        View Post
      </Link>

      <p className="post-credit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>

      <ReactionButtons post={post} />
    </article>
  );
};

export default PostItem;
