import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectUserById } from '../users/users.slice';
import { selectPostsByUser } from '../posts/posts.slice';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));
  const postsForUser = useSelector((state) =>
    selectPostsByUser(state, Number(userId))
  );

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>
        {postsForUser.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default UserPage;
