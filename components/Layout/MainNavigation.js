import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../store/Contextfile';

const MainNavigation = () => {
  const contexts = useContext(AuthContext)
  const islogin = contexts.isLogin;
  const logout = () => {
    contexts.logout();
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!islogin && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {islogin && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {islogin && <li>
            <button onClick={logout}>Logout</button>
          </li>}

        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
