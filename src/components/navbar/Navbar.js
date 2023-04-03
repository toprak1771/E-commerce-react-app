import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Button from '@mui/material/Button';
function Navbar() {
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
              <Link to="/products">Product</Link>
            </li>
          </ul>
        </div>
        <div className={styles.right}>
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
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
