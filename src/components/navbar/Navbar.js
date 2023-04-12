import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
function Navbar() {
  const loginData = useSelector((state) => state.user.login);
  const user = useSelector((state) => state.user.data);
  console.log("loginDataa:",loginData);
  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.home}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>

          <ul className={styles.menu}>
            <li>
              <Link to="/products?page=1">Product</Link>
            </li>
          </ul>
        </div>

        <div className={styles.right}>
          {loginData === false ? (
            <>
              <Link to="/signin" className={styles.leftbutton}>
                <Button size="small" variant="contained" color="secondary">
                  Sign In
                </Button>
              </Link>
              <Link to="signUp">
                <Button size="small" variant="contained" color="secondary">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className={styles.leftbutton}>
                <Button size="small" variant="contained">
                  Profile
                </Button>
              </Link>
              <Link>
                <Button size="small" variant="contained">
                  Logout
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
