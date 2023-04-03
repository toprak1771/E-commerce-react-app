import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SıgnIn from './pages/auth/SıgnIn';
import Register from './pages/auth/Register';
import Product from './pages/products/Product';
import ProductDetail from './pages/products/ProductDetail';
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/products" element={<Product></Product>}></Route>
        <Route path="/products/:product_id" element={<ProductDetail></ProductDetail>}></Route>
        <Route path="/signin" element={<SıgnIn></SıgnIn>}></Route>
        <Route path="/signUp" element={<Register></Register>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
function Home() {
  return <h2>Home</h2>;
}

export default App;
