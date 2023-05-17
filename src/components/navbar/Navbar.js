import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import { setInLogin } from '../../redux/user/actions';
import { AuthLogout } from '../../api/AuthApi';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Navbar() {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const loginData = useSelector((state) => state.user.login);
  const user = useSelector((state) => state.user.data);
  const _refreshToken = localStorage.getItem('refresh_token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const basketItemsNav = useSelector((state) => state.basket.items);

  const logOut = async (newState) => {
    try {
      const responseData = await AuthLogout({
        refresh_token: _refreshToken,
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      dispatch(setInLogin(false));
      navigate('/');
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
              {basketItemsNav.length > 0 ? (
                <Link to="/basket" className={styles.leftbutton}>
                  <Button size="small" variant="contained">
                    Basket {`(${basketItemsNav.length})`}
                  </Button>
                </Link>
              ) : (
                ''
              )}
              <Link to="/profile" className={styles.leftbutton}>
                <Button size="small" variant="contained">
                  Profile
                </Button>
              </Link>
              <Link>
                <Button size="small" variant="contained" onClick={logOut}>
                  Logout
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          Çıkış başarılı.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Navbar;
