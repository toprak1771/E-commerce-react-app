import React from 'react';
import { Navigate,Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function ProtectedRoute({type}) {
  const login = useSelector((state) => state.user.login);
  const user = useSelector((state) => state.user.data);
  console.log('user:', user);

  if(type==="profile"){
    return (
      <>
        {login === true ? <Outlet/> : <Navigate replace to={"/"}/>}
      </>
    );
  }
  if(type==="admin"){
    return (
      <>
        {(user?.user?.role && user?.user?.role === 'admin') || (user.role === 'admin') ? <Outlet/> : <Navigate replace to={"/"}/>}
      </>
    );
  }
}

export default ProtectedRoute;
