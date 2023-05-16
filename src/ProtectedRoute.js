import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function ProtectedRoute({ component: Component, ...rest }) {
  const login = useSelector((state) => state.user.login);

  return (
    <>
      {login === true ? <Outlet/> : <Navigate replace to={"/"}/>}
    </>
  );
}

export default ProtectedRoute;
