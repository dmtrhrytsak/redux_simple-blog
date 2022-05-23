import { Link } from 'react-router-dom';

const Header = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
