import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/auth-context';

const Navigation = (props) => {
  const contextObj = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {contextObj.isLoggedIn && (
          <li>
            <a href='/'>Users</a>
          </li>
        )}
        {contextObj.isLoggedIn && (
          <li>
            <a href='/'>Admin</a>
          </li>
        )}
        {contextObj.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
