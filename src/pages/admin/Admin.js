import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import styles from './styles.module.css';
import { Link, Outlet } from 'react-router-dom';

function Admin() {
  return (
    <div>
      <nav className={styles.nav}>
        <ul className={styles.admin}>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin/products">Products</Link>
          </li>
        </ul>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}



export default Admin;
