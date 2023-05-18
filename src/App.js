import './App.css';
import Navbar from './components/navbar/Navbar';
import { React, useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SıgnIn from './pages/auth/SıgnIn';
import Register from './pages/auth/Register';
import Product from './pages/products/Product';
import ProductDetail from './pages/products/ProductDetail';
import { AuthMe } from './api/AuthApi';
import { setInLogin, setUserData } from './redux/user/actions';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './ProtectedRoute';
import Basket from './pages/basket/Basket';
import Error404 from './pages/Error404/Error404';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true);

  const basketData = useSelector((state) => state.basket.items);
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basketData));
  }, [basketData]);

  useEffect(() => {
    (async () => {
      try {
        const me = await AuthMe(token);
        dispatch(setInLogin(true));
        setLoading(false);
      } catch (e) {}
    })();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/products" element={<Product></Product>}></Route>
        <Route
          path="/products/:product_id"
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path="/signin" element={<SıgnIn></SıgnIn>}></Route>
        <Route path="/signUp" element={<Register></Register>}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Route>
        <Route path='/basket' element={<Basket></Basket>}></Route>
        <Route path='*' element={<Error404></Error404>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
function Home() {
  return <h2>Home</h2>;
}

export default App;
