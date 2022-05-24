import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { increaseCount, selectCount } from '../features/posts/posts.slice';

const Header = () => {
  const count = useSelector(selectCount);

  const dispatch = useDispatch();

  return (
    <header>
      <p>Redux Blog</p>

      <nav className="nav">
        <ul className="nav__list">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/posts">Post</Link>
          </li>

          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>

        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </nav>
    </header>
  );
};

export default Header;
